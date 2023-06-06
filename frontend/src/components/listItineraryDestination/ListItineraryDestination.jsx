import React, { useEffect, useState } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import { FaBars, FaTrash, FaStar, FaDirections, FaSearchLocation } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { AiFillStar } from 'react-icons/ai';


import './listItineraryDestination.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';



const getItemStyle = (isDragging, draggableStyle) => ({
  margin: `0 10px 15px 0`,
  display: "inline-flex",
  padding: "10px",


  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#fafafa" : "white",
  padding: "5px",
  margin: "10px 0",
  borderRadius: '10px'
});

const ListItineraryDestination = ({ type, destinations, addPlace, showDirection, responseDirection, deleteItem,setResponseDirection }) => {
  console.log("type " + type)
  console.log({ destinations })
  console.log(responseDirection)

  const [autocomplete, setAutocomplete] = useState(null);
  const [draggable, setDraggable] = useState(true);
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const NewDestination = autocomplete.getPlace();
    console.log(NewDestination)

    NewDestination['id'] =  uuidv4()
    NewDestination['placePhotoUrl'] = NewDestination.photos[0].getUrl()
    NewDestination['latDirection'] = NewDestination.geometry.location.lat()
    NewDestination['lngDirection'] = NewDestination.geometry.location.lng()

    destinations = [...destinations, NewDestination];
    console.log(destinations)
    addPlace(type, destinations)
  };

  let [direction, setDirection] = useState([]);
  const router = useLocation();
  const[props, setProps] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

 useEffect(() => {
     if (router.pathname == '/List') {
       setProps(0);
       setDraggable(false);
     } else if (router.pathname == `/list/${params.userid}/${params.id}`) {
         setProps(1);
         setDraggable(false);
     } else {
         setProps(2)
     }
   },[])
  
  const getDirection = () => {
    destinations.map((item, index) => {
      direction[index] = {
        lat: item.latDirection,
        lng: item.lngDirection
      }
      console.log(direction)
      return direction;
    }

    );
    setDirection(direction)
    console.log(direction)
    showDirection(type, direction)
  }

  const onDelete = (index) => {
    const deleteId = index;
    console.log(deleteId);
    console.log(type);
    deleteItem(deleteId, type)
    let res =  null;
    setResponseDirection(res)
  }


  return (
    <div>
      <div className='destinationUpperContainer'>
        {props == 2 ? <></> 
        :
            <div className='destinationSearchAddContainer'>
            <FaSearchLocation />
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
              options={{
                componentRestrictions: { country: 'id' },
              }}
            >
              <input type="text" onfocus="this.value=''"  placeholder="Add New Location" className='destinationSearchAdd' />
  
            </Autocomplete>
          </div>
        }
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
                      <Draggable isDragDisabled = {draggable} key={item.id} draggableId={item.id} index={index}>
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
                                <h3 className='destinationName'>{item.name}</h3>
                                <div className='destinationDescContainer'>
                                  <div className='destinationImageContainer'>
                                  {(()=>{
                                      if(item?.placePhotoUrl){
                                        return(
                                          <img src={item.placePhotoUrl} alt="Logo" class="destinationImage" />
                                        )
                                      }
                                        else{
                                          return(
                                            <img src={item.photos[0].getUrl()} alt="Logo" class="destinationImage" />
                                          )
                                        }
                                      
                                    })()}
                                  
                                    {(()=>{
                                      if(item?.rating){
                                        return(
                                          <div className='destinationRating'>
                                          <p className='destinationRng'>{item?.rating} </p>
                                          <AiFillStar className='starlogodest' />
                                          <p> ({item?.user_ratings_total})</p>
                                        </div>
                                        )
                                      }
                                    })()}
                                  </div>

                                  <div className='destinationDesc'>
                                    <p>{item.vicinity}</p>
                                    {props == 2 ? <></> 
                                    : 
                                      <button className='destinationDeleteButton' onClick={() => onDelete(index)}>
                                        <FaTrash />
                                      </button>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                            {(() => {
                              if (index !== destinations.length - 1 && responseDirection !== null) {
                                if (index < responseDirection.routes[0].legs.length) {
                                  if (type === responseDirection.id) {
                                    return (
                                      <div className='destinationRoutes'>
                                        {responseDirection.routes[0].legs[index].distance.text}
                                        ||
                                        {responseDirection.routes[0].legs[index].duration.text}
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