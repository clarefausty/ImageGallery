import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';



function StoreList({ name, id, index }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    
  };

  return (
    <Draggable draggableId={`store-${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="store-container">
            {isLoading && (
              <div className="image-preloader">
                <p>Loading...</p>
              </div>
            )}
            <img
              src={name}
              alt=""
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default StoreList