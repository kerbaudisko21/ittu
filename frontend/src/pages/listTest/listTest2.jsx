import React, { useState } from "react";

const ListTest2 = () => {
  const [list, setList] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" }
  ]);

  const onDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, index) => {
    const sourceIndex = event.dataTransfer.getData("index");
    const newList = [...list];
    const [removed] = newList.splice(sourceIndex, 1);
    newList.splice(index, 0, removed);
    setList(newList);
  };

  return (
    <ul>
      {list.map((item, index) => (
        <li
          key={item.id}
          draggable="true"
          onDragStart={(event) => onDragStart(event, index)}
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, index)}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default ListTest2;