import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FaCaretDown, FaCaretRight} from 'react-icons/fa';
import { useCollapse } from 'react-collapsed';



import './listItinerary.css'
import ListItineraryDestination from '../listItineraryDestination/ListItineraryDestination.jsx';



const ListItinerary = ({ItineraryDay,setItineraryDay,response,updateOptions}) => {

    const updateArray = (index, value) => {
        let Itinerary = [...ItineraryDay];
        value = value.map((item) => ({ ...item, id: uuidv4()}))
    
        Itinerary = Itinerary.map((item) => {
          if (item.id === index) {
      
            item.destinations = value;
          }
          return item;
        });
        setItineraryDay(Itinerary);
      };

      const deleteItem = (deleteId,type) => {
      
        console.log(deleteId)
        console.log(type)
  
        let newItinerary ;
  
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
        
       setItineraryDay(newItinerary) 
      }

      const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="collapsible">
        <div {...getToggleProps()}>
        {isExpanded ? <FaCaretDown /> : <FaCaretRight/>}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
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
                      <h2 className='ItineraryDate'>{item.date.toDateString()}</h2>
                      <p>Weather: {item.weather}</p>
                      <p>Temperature: {item.temperature}</p>
                      <ListItineraryDestination
                        destinations={item.destinations}
                        type={item.id}
                        addPlace={updateArray}
                        showDirection={updateOptions}
                        response={response}
                        deleteItem={deleteItem}
                      />                          
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
      </div>
      </div>
      </div>
  )
}

export default ListItinerary