import React, { useState } from 'react';

function MyComponent() {
  const [dragging, setDragging] = useState(false);
  const [showDropBox, setShowDropBox] = useState(false);

  const handleDragStart = (event) => {
    setDragging(true);
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    event.target.appendChild(document.getElementById(data));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    setShowDropBox(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        id="draggable1"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        Box 1
      </div>
      <div
        id="draggable2"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        Box 2
      </div>
      <div
        id="draggable3"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        Box 3
      </div>
      {showDropBox ? (
        <div
          id="droppable1"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            backgroundColor: dragging ? 'lightgray' : 'white',
            flexGrow: '1',
            height: '50px',
            margin: '10px',
            textAlign: 'center',
            lineHeight: '50px',
          }}
        >
          Drop here for box 1!
        </div>
      ) : (
        <button onClick={handleButtonClick}>Generate Drop Box</button>
      )}
    </div>
  );
}

function ListTest2() {
  return <MyComponent />;
}

export default ListTest2;