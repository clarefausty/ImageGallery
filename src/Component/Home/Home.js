
// import React, { useState } from "react";
// import { DragDropContext,  Droppable } from "react-beautiful-dnd";
// import "./Home.css"
// import StoreList from "../StoreList";
// import { dummyData } from "../dummyData";
// import { database } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";

// function Home() {
//   const history = useNavigate()
//   const handleClick = () =>{
//     signOut(database).then(val=>{
//         console.log(val,"val")
//         history('/')
//     })
// }



//   const [stores, setStores] = useState(dummyData);
//   const [searchQuery, setSearchQuery] = useState("");

  // const handleDragAndDrop = (results) => {
  //   const { source, destination, type } = results;

  //   if (!destination) return;

  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   )
  //     return;

  //   if (type === "group") {
  //     const reorderedStores = [...stores];

  //     const storeSourceIndex = source.index;
  //     const storeDestinatonIndex = destination.index;

  //     const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
  //     reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

  //     return setStores(reorderedStores);
  //   }
  //   const itemSourceIndex = source.index;
  //   const itemDestinationIndex = destination.index;

  //   const storeSourceIndex = stores.findIndex(
  //     (store) => store.id === source.droppableId
  //   );
  //   const storeDestinationIndex = stores.findIndex(
  //     (store) => store.id === destination.droppableId
  //   );

  //   const newSourceItems = [...stores[storeSourceIndex].items];
  //   const newDestinationItems =
  //     source.droppableId !== destination.droppableId
  //       ? [...stores[storeDestinationIndex].items]
  //       : newSourceItems;

  //   const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
  //   newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

  //   const newStores = [...stores];

  //   newStores[storeSourceIndex] = {
  //     ...stores[storeSourceIndex],
  //     items: newSourceItems,
  //   };
  //   newStores[storeDestinationIndex] = {
  //     ...stores[storeDestinationIndex],
  //     items: newDestinationItems,
  //   };

  //   setStores(newStores);
  // };

//   const handleSearch = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//   };

//   // Filter the stores based on the search query
//   const filteredStores = stores.filter((store) =>
//     store.fragrance.toLowerCase().includes(searchQuery.toLowerCase())
//   );


//   return (
//     <div className="layout__wrapper">
//       <div className="header">
//         <h1>PERFUME GALLERY</h1>
//         <div className="search">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>
//       <button onClick={handleClick}>SignOut</button>
//       </div>
      
//         <DragDropContext onDragEnd={handleDragAndDrop}>
//           <Droppable droppableId="ROOT" type="group">
//             {(provided) => (
//               <div
//                 className="gallery"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 {filteredStores.map((store, index) => (
//                       <div className="card-surrounds">
//                         <StoreList {...store} />
//                       </div>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
    
//   );
// }

// export default Home;




import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Home.css";
import StoreList from "../StoreList";
import { dummyData } from "../dummyData";
import { database } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Home() {
  const history = useNavigate();
  const handleClick = () => {
    signOut(database).then((val) => {
      console.log(val, "val");
      history("/");
    });
  };

  const [stores, setStores] = useState(dummyData);
  const [searchQuery, setSearchQuery] = useState("");

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


  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  // Filter the stores based on the search query
  const filteredStores = stores.filter((store) =>
    store.fragrance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="layout__wrapper">
      <div className="header">
        <h1>PERFUME GALLERY</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button onClick={handleClick}>SignOut</button>
      </div>

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              className="gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredStores.map((store, index) => (
                <Draggable
                  key={store.id}
                  draggableId={`store-${store.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="card-surrounds">
                        <StoreList {...store} />
                      </div>
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
  );
}

export default Home;

