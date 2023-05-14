import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ServiceCommandUnit from "./ServiceCommandUnit";
import { static_items } from "./data";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 200
});

const ListTest3 = () => {
  const [ItineraryDay, setItineraryDay] = useState(static_items);
  
  // debugger;
  const onDragEnd = (result) => {
    // dropped outside the list
    console.log(result);
    console.log("innner drag");
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      setItineraryDay(reorder(ItineraryDay, sourceIndex, destIndex));
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
        acc[item.id] = item.destination;
        console.log(acc)
        return acc;
      }, {});
      console.log({itemSubItemMap})
      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;
      console.log(sourceParentId)
      const sourceSubItems = itemSubItemMap[sourceParentId];
      console.log(sourceSubItems)
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...ItineraryDay];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.destination = reorderedSubItems;
          }
          return item;
        });
        setItineraryDay(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.destination = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.destination = newDestSubItems;
          }
          return item;
        });
        setItineraryDay(newItems);
      }
    }
  };

  console.log(ItineraryDay)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="droppableItem">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {ItineraryDay.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      {item.content}
                      <span
                        {...provided.dragHandleProps}
                        style={{
                          display: "inline-block",
                          margin: "0 10px",
                          border: "1px solid #000"
                        }}
                      >
                        Drag
                      </span>
                      <ServiceCommandUnit
                        destinations={item.destination}
                        type={item.id}
                      />
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

       
    </DragDropContext>
  );
};




export default ListTest3;
