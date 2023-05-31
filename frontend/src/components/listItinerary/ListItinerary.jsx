import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { useCollapse } from 'react-collapsed';



import './listItinerary.css'
import ListItineraryDestination from '../listItineraryDestination/ListItineraryDestination.jsx';



const ListItinerary = ({ ItineraryDay, setItineraryDay, responseDirection, updateOptions,setResponseDirection,setOptions }) => {

  console.log(ItineraryDay)

  const updateArray = (index, value) => {
    let Itinerary = [...ItineraryDay];
    value = value.map((item) => ({ ...item, id: uuidv4() }))

    Itinerary = Itinerary.map((item) => {
      if (item.id === index) {

        item.destinations = value;
      }
      return item;
    });
    setResponseDirection(null)
    setOptions(null)
    setItineraryDay(Itinerary);
  };

  const deleteItem = (deleteId, type) => {

    console.log(deleteId)
    console.log(type)

    let newItinerary;

    newItinerary = ItineraryDay.map((item) => {
      console.log(item)
      if (item.id === type) {
        const newDestination = [...item.destinations];
        newDestination.splice(deleteId, 1);
        console.log(newDestination)
        item.destinations = newDestination
      }
      return item;
    });

    setResponseDirection(null)
    setOptions(null)
    setItineraryDay(newItinerary)
  }

  const Collapsible = ({children , item}) => {
    const [isExpanded, setExpanded] = useState( item.expandedState);
    const { getCollapseProps, getToggleProps} = useCollapse(
      { 
        isExpanded : item.expandedState 
      },
    );

    function handleOnClick() {
      item.expandedState = !isExpanded;
      setExpanded(!isExpanded); 
     }
  
    return (
      <div className="list-test">
        <div {...getToggleProps({onClick: handleOnClick})}>
        <div className='ItineraryTopContainer'>
          <div className='ItineraryTopButton'>
        {isExpanded ? <FaCaretDown /> : <FaCaretRight /> }
        </div>
        <div className='ItineraryTop'>
       
        <h2 className='ItineraryDate'>{new Date(item.date).toDateString()}</h2>
       
       <div className='ItineraryWeather'>
       <p className='ItineraryTemp'>{ (item.temperature - 273).toFixed(1)} °C</p>
        <img className="ItineraryIcon" src={`http://openweathermap.org/img/w/${item.icon}.png`} alt='icon' />
        </div> 
        </div>
        </div>
        </div>
        <div {...getCollapseProps()}>
       {children}
        </div>
      </div>
    );
  };

  return (

    <div className='listContainer'>
      <Droppable droppableId="droppable" type="droppableItem">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='itineraryContainer'

          >
            {ItineraryDay.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className='tripContainer'
                    >
                      <Collapsible item={item}>
                          <ListItineraryDestination
                            destinations={item.destinations}
                            type={item.id}
                            addPlace={updateArray}
                            showDirection={updateOptions}
                            responseDirection={responseDirection}
                            setResponseDirection={setResponseDirection}
                            deleteItem={deleteItem}
                          />
                     
                      </Collapsible>
                    </div>
                    

                  </>

                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default ListItinerary