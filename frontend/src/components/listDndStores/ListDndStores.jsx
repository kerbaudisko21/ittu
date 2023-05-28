import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaBars, FaStar } from 'react-icons/fa';


import "./listDndStores.css"


const getItemStyle = (isDragging, draggableStyle) => ({
  margin: `0 10px 15px 0`,
  display: "inline-flex",
  padding: "10px",

  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "aliceblue" : "white",
  padding: "5px",
  margin: "10px 0",
  borderRadius: '10px'
});

export const ListDndStore = ({ stores }) => {

  console.log({ stores })

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
                    className='storesContainer'
                  >
                    <span
                      {...provided.dragHandleProps}
                      className='storesDndIcon'
                    >
                      <FaBars />
                    </span>
                   
                    <div className="storesInsideContainer"> 
                    <div className="storesUpperContainer">
                    <div className="storesNumber">{index + 1}</div>
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
                        <p>{item.vicinity}</p>
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
  );
};

export default ListDndStore;
