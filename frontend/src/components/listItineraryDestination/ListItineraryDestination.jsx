import React, { useState } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import { FaBars, FaTrash, FaStar} from 'react-icons/fa';


import './listItineraryDestination.css'

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px 10px 0`,

  display: "inline-flex",
  width: "90%",
  padding: "5%",

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
  padding: 15,
  margin: "10px 0"
});

const ListItineraryDestination = ({ type, destinations, addPlace, showDirection,response, deleteItem}) => {
    console.log("type " + type)
    console.log({destinations})
    console.log(response)
   
    const [autocomplete, setAutocomplete] = useState(null);
  
    const onLoad = (autoC) => setAutocomplete(autoC);
  
    const onPlaceChanged = () => {
      const NewDestination = autocomplete.getPlace();
      console.log(NewDestination)
      destinations = [...destinations, NewDestination];
      console.log(destinations)
      addPlace(type, destinations)
    };
    
    let [direction, setDirection] = useState([]);
  
    const getDirection = () => {
      destinations.map((item,index) => {
        direction[index] ={
          lat : item.geometry.location.lat(),
          lng : item.geometry.location.lng()
        }
        console.log(direction)
        return direction;
      }
      
      );
      setDirection(direction)
      showDirection(type,direction)
    }
  
    const onDelete =(index) =>{
      const deleteId = index;
      console.log(deleteId);
      console.log(type);
      deleteItem(deleteId,type)
    }
   
  return (
    <div> <button onClick={getDirection}>Get Direction</button>
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
                  className='destinationContainer'
                >
                      <span
                      {...provided.dragHandleProps}
                      className='dndIcon'
                    >
                      <FaBars />
                    </span>
                    <div className='destinationContainerInside'>
                    <div className='destinationName'>{item.name}</div>
                    
                    
                    <div className='destinationDescContainer'>
                      <div className='destinationImageContainer'>
                    <img src={item.photos[0].getUrl()} alt="Logo" class="destinationImage" />
                    </div>
                    <div className='destinationDesc'>
                    <p>{item.vicinity}</p>

                    <div className='destinationRating'>
                    <p>{item?.rating} <FaStar/></p>
                    <p>({item?.user_ratings_total})</p>
                  <button onClick={() => onDelete(index)}>
                    <FaTrash />
                  </button>
                  </div>

                    </div>

                   

                    </div>
                    

                  </div>
                </div>
      
      {(() => {
      if (index !== destinations.length -1 && response !== null ) {
        if( index < response.routes[0].legs.length ){
          if(type === response.id){return (
          <div>
            {response.routes[0].legs[index].distance.text}
           ||
           {response.routes[0].legs[index].duration.text}
           </div>
        )}}
      } 
      else {
        return (
          <div></div>
        )
      }


    })()}


                {provided.placeholder}


                
              </>
              
            )
            }
          
          </Draggable>
         
          
        )
        )}
           
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
  </div>
  )
}

export default ListItineraryDestination