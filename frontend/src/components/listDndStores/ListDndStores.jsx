import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaBars, FaStar } from 'react-icons/fa';


import "./listDndStores.css"


const getItemStyle = (isDragging, draggableStyle) => ({
  margin: `1rem 0 0 1rem`,
  display: "inline-flex",
  padding: "1rem 0.5rem 1rem 0.5rem",
  
 
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "aliceblue" : "white",
  borderRadius: '10px',
  
});

export const ListDndStore = ({ stores }) => {

  console.log({ stores })

  return (
    <div className="listDndStores">
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
                    className='storesContainer'
                  >
                    <div className="storesLeftContainer">
                    <div className="storesNumberContainer">
                      <p className="storesNumber">{index + 1}</p> </div>
                      <div  className='storesDndIcon'>
                    <span
                      {...provided.dragHandleProps}
                      className='storeDndIcon'
                    >
                      < FaBars  />
                    </span>
                    </div>
                    </div>
                   
                    <div className="storesInsideContainer"> 
                    <div className="storesUpperContainer">

                    <div className="storesNameContainer">
                    <div className='storesName'>{item.name}</div>
                    <div className='storesRating'>
                      <p>{item?.rating} <FaStar /></p>
                        <p> ({item?.user_ratings_total})</p>
                      </div>
                      </div>
                      </div>
                     


                    <div className='storesDescContainer'>
                      <div className='storesImageContainer'>
                        <img src={item.photos[0].getUrl()} alt="Logo" class="storesImage" />
                        <div className='storesDesc'>
                        <p className="storeDesc ">{item.vicinity}</p>
                        </div>
                      </div>
                      </div>


                    </div>
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
    </div>
  );
};

export default ListDndStore;
