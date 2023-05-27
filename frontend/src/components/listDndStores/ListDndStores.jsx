import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaBars } from 'react-icons/fa';


const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px 10px 0`,

  display: "inline-flex",
  width: "90%",
  padding: "10px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  display: "inline-flex",
  padding: "10px",
  margin: "0 10px 10px 0",
  border: "1px solid grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  margin: "10px 0"
});

export const ListDndStore = ({ stores }) => {

  console.log({stores})

  return (
    
    <Droppable droppableId="Stores" type={`droppableSubItem`} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {stores.map((item, index) => (
            <Draggable key={item.place_id} draggableId={item.place_id} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <span
                      {...provided.dragHandleProps}
                      style={{
                        margin: "0 10px",
                      }}
                    >
                      <FaBars />
                    </span>
                    {item.name}
                    
                  </div>
                  {provided.placeholder}
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListDndStore;
