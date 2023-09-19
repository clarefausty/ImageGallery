

// import React, { useState } from 'react';
// import data from './Component/data';
// import './App.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// function App() {
//   const [images, setImages] = useState(data);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const newImages = [...images];
//     const [reorderedImage] = newImages.splice(result.source.index, 1);
//     newImages.splice(result.destination.index, 0, reorderedImage);

//     setImages(newImages);
//   };

//   return (
//     <div className='main'>
//       <div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId='gallery' type='group'>
//           {(provided) => (
//             <div
//               className='gallery'
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {images.map((segment, index) => (
//                 <Draggable
//                   key={segment.id}
//                   draggableId={segment.id.toString()}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <img src={segment.imgURL} alt='Nice Perfumes' />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import data from './Component/data';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [stores, setStores] = useState(data);
  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  
  return (
    <div className='main'>
      <div>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId='gallery' type='group'>
          {(provided) => (
            <div
              className='gallery'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stores.map((segment, index) => (
                <Draggable
                  key={segment.id}
                  draggableId={segment.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div className='img-div'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={segment.imgURL} alt='Nice Perfumes' />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    </div>
  );
}

export default App;
