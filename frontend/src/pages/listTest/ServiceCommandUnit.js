import React, { useState } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px 10px 0`,

  display: "inline-flex",
  width: "120px",
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

export const ServiceCommandUnit = ({ type, destinations,addPlace }) => {
  console.log("type " + type)
  console.log({destinations})

  

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
   
   
    const NewDestination = autocomplete.getPlace();
    console.log(NewDestination)
    destinations = [...destinations, NewDestination];
    console.log(destinations)
    addPlace(type, destinations)
  };
 
  
  return (
    
    <Droppable droppableId={type} type={`droppableSubItem`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {destinations.map((item, index) => (
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
                    {item.name} 
                  
                    <span
                      {...provided.dragHandleProps}
                      style={{
                        display: "block",
                        margin: "0 10px",
                        border: "1px solid #000"
                      }}
                    >
                      Drag
                    </span>
                  </div>
                  
                  {provided.placeholder}
                </>
              )}
              
            </Draggable>
            
          ))}
          {provided.placeholder}
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
            options={{
            componentRestrictions: { country: 'id' },
            }}
>
<input type="text" />

</Autocomplete>
        </div>
      )}
    </Droppable>
   
  );
};

export default ServiceCommandUnit;
