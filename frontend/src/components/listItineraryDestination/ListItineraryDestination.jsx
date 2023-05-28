import React, { useState } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import { FaBars, FaTrash, FaStar, FaDirections, FaSearchLocation } from 'react-icons/fa';



import './listItineraryDestination.css'



const getItemStyle = (isDragging, draggableStyle) => ({
  margin: `0 10px 15px 0`,
  display: "inline-flex",
  padding: "10px",


  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "aliceblue" : "white",
  padding: "5px",
  margin: "10px 0",
  borderRadius: '10px'
});

const ListItineraryDestination = ({ type, destinations, addPlace, showDirection, response, deleteItem }) => {
  console.log("type " + type)
  console.log({ destinations })
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
    destinations.map((item, index) => {
      direction[index] = {
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng()
      }
      console.log(direction)
      return direction;
    }

    );
    setDirection(direction)
    showDirection(type, direction)
  }

  const onDelete = (index) => {
    const deleteId = index;
    console.log(deleteId);
    console.log(type);
    deleteItem(deleteId, type)
  }



  return (
    <div>
      <div className='destinationUpperContainer'>
        <div className='destinationSearchAddContainer'>
          <FaSearchLocation />
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
            options={{
              componentRestrictions: { country: 'id' },
            }}
          >

            <input type="text" placeholder="Add New Location" className='destinationSearchAdd' />

          </Autocomplete>
        </div>
        <div className='destinationDirectionContainer'>

          <button onClick={getDirection} className='destinationDirectionButton' > <FaDirections /> Get Direction</button>
        </div>
      </div>
      <Droppable droppableId={type} type={`droppableSubItem`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >

            {(() => {
              if (destinations.length !== 0) {
                return (<div>
                  {
                    destinations.map((item, index) => (
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
                                className='destinationDndIcon'
                              >
                                <FaBars />
                              </span>
                              <div className='destinationContainerInside'>
                                <div className='destinationName'>{item.name}</div>


                                <div className='destinationDescContainer'>

                                  <div className='destinationImageContainer'>
                                    <img src={item.photos[0].getUrl()} alt="Logo" class="destinationImage" />
                                    <div className='destinationRating'>
                                      <p>{item?.rating} <FaStar /></p>
                                      <p> ({item?.user_ratings_total})</p>
                                    </div>
                                  </div>

                                  <div className='destinationDesc'>
                                    <p>{item.vicinity}</p>


                                    <button className='destinationDeleteButton' onClick={() => onDelete(index)}>
                                      <FaTrash />
                                    </button>


                                  </div>



                                </div>


                              </div>
                            </div>

                            {(() => {
                              if (index !== destinations.length - 1 && response !== null) {
                                if (index < response.routes[0].legs.length) {
                                  if (type === response.id) {
                                    return (
                                      <div className='destinationRoutes'>
                                        {response.routes[0].legs[index].distance.text}
                                        ||
                                        {response.routes[0].legs[index].duration.text}
                                      </div>
                                    )
                                  }
                                }
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
                    )
                  }
                  </div>
                )
              }
              else {
                return (
                  <div className='destinationDropHere'>Drop Here</div>
                )
              }


            })()}









            {provided.placeholder}


          </div>
        )}
      </Droppable>

    </div>
  )
}

export default ListItineraryDestination