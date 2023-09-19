import React, { useState } from 'react';
import ImageSetup from './Component/ImageSetup/ImageSetup';
import data from './Component/data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [images, setImages] = useState(data);

  // Function to handle the drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <div className='main'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='gallery'>
          {(provided) => (
            <div
              className='gallery'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((segment, index) => (
                <Draggable
                  key={segment.id}
                  draggableId={`image-${segment.id}`}
                  index={index}
                >
                  {(provided) => (
                    
                    <ImageSetup imgURL={segment.imgURL}
                    ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />      
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

export default App;
