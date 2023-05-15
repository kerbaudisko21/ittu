import React, { useState, useEffect } from 'react';
import "./list.css";

import { GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { useLocation } from "react-router-dom";
import { Autocomplete } from '@react-google-maps/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';


import ServiceCommandUnit from "../listTest/ServiceCommandUnit";
import DndStore from '../listTest/DndStore';

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



const List = (props) => {

  const [autocomplete, setAutocomplete] = useState(null);
  const dateRange = useLocation();
  const { startDate, endDate,  name,latitude, longitude } = dateRange.state;
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [type, setType] = useState('');
  const [ItineraryDay, setItineraryDay] = useState([]);
  
  useEffect(() => {
    function getDates() {
      const dates = [];
      let currentDate = new Date(startDate);
      let id = 0;
      function addDays(date, days) {
        const newDate = new Date(date.valueOf());
        newDate.setDate(newDate.getDate() + days);
        id = Number(id);
        id++;
        
        return { 
          id: id.toString(),
          date: newDate, 
          weather: '',
          temperature: '',
          destinations: []
        }
      
        ;

       
        
      }
      while (currentDate <= new Date(endDate)) {
        dates.push(addDays(currentDate, 0));
        currentDate = addDays(currentDate, 1).date;
        id = Number(id);
        id--;
        
      }
      addWeatherToItinerary(dates);
    }

    getDates();
  }, [startDate, endDate]);

  useEffect(() => {
    // Get Current Position
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     setLocation({ latitude, longitude });
        
    //   },
    //   () => {
    //     console.log('Permission denied');
    //   }
      
    setLocation({ latitude, longitude });
    
  }, [latitude,longitude]);
 
  useEffect(() => {
    const { google } = props;
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    const coordinatesLatLng = new google.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const request = {
      location: coordinatesLatLng,
      radius: '500',
      type: [type],
    };
    const callback = (results, status) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setStores(results);
      }
    };
    
    service.nearbySearch(request, callback);
  }, [props, location, type]);
  

  async function addWeatherToItinerary(itinerary) {
    for (let i = 0; i < itinerary.length; i++) {
      const date = itinerary[i].date;
      const lat = latitude;
      const lon = longitude;
      const weatherData = await getWeatherForecast(lat, lon, date);
      itinerary[i].weather = weatherData[0].weather[0].description;
      itinerary[i].temperature = weatherData[0].main.temp;
    }
    
    setItineraryDay(itinerary);
  }
  
  async function getWeatherForecast(lat, lon, date) {
    const apiKey = 'ab153f1fe2b71c6c9649d3beaeefc00c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Filter the list based on the date you want
    const filteredList = data.list.filter(item => {
      const itemDate = new Date(item.dt_txt);
      return itemDate.toDateString() === new Date(date).toDateString();
    });
    return filteredList;
  }
  

  const handleTypeChange = (event) => {
    setType(event.target.value);
    console.log(event.target.value)
  };

  const handleChange = ({center}) => {
    setLocation( {latitude: center.lat,
      longitude: center.lng} );

  }

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
     const latitude = autocomplete.getPlace().geometry.location.lat();
     const longitude = autocomplete.getPlace().geometry.location.lng();
    
     setLocation({ latitude, longitude });
  };


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    console.log(result);
    console.log("innner drag");
    if (!result.destination) {
      console.log("No Destination");
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination.droppableId;
    if (result.type === "droppableItem") {
      setItineraryDay(reorder(ItineraryDay, sourceIndex, destIndex));
    } 
    else if (result.type === "droppableSubItem") {
      console.log("droppableSubItem +")
      if(sourceParentId !== 'Stores'){
      const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
        acc[item.id] = item.destinations;
        console.log(item.destinations)
        console.log(acc)
        return acc;
      }, {});
      console.log({itemSubItemMap})
        console.log([sourceParentId])
        const sourceSubItems = itemSubItemMap[sourceParentId];
        console.log(sourceSubItems)
        const destSubItems = itemSubItemMap[destParentId];
      

      let newItems = [...ItineraryDay];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        console.log("reordersub")
        console.log("sourceSubItems " + sourceSubItems)
        console.log("sourceIndex " + sourceIndex)
        console.log("destIndex " + destIndex)
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.destinations = reorderedSubItems;
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
            item.destinations = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.destinations = newDestSubItems;
          }
          return item;
        });
        setItineraryDay(newItems);
      }
    } else if ( sourceParentId === "Stores"){



      
      console.log('==> dest', destParentId);
      console.log(result)
      const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
        acc[item.id] = item.destinations;
        console.log(item.destinations)
        console.log(acc)
        return acc;
      }, {});
      console.log(itemSubItemMap)

      const sourceStore = stores[sourceIndex];
      console.log(sourceStore)
  
      const newDestSubItems1 = itemSubItemMap[destParentId];
      console.log(newDestSubItems1)
     
      let newItems = [...ItineraryDay];
   
        let newSourceSubItems = [...stores];
        console.log(newSourceSubItems)
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        console.log([draggedItem])
        let newDestSubItems = [...newDestSubItems1];
        console.log( newDestSubItems)

        newDestSubItems.splice(destIndex, 0, {...draggedItem, id: uuidv4()});


        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            console.log("sourceParentId")
            item.destinations = newSourceSubItems;
           
          } else if (item.id === destParentId) {
            
          
            
            item.destinations = newDestSubItems;
            console.log(newDestSubItems)
            
          }
          return item;
        });
        setItineraryDay(newItems);
      

    }
    }
  };




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

  return (
    <div className="list">
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="planning">
     <h1>{name}</h1> 
      <div>
      
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
                      {item.date.toDateString()}
                      <p>Weather: {item.weather}</p>
                     <p>Temperature: {item.temperature}</p>
                      <ServiceCommandUnit
                        destinations={item.destinations}
                        type={item.id}
                        addPlace={updateArray}

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
      <div className="placemap">
   
      
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>

      <select value={type} onChange={handleTypeChange}>
        <option value="">All</option>
        <option value="restaurant">restaurant</option>
        <option value="lodging">hotel</option>
        <option value="atm">atm</option>
        <option value="attraction">attraction</option>
      </select>
   
      <h1>Nearby Restaurants</h1>
     
      <DndStore stores={stores} />
    

      </div>
      </DragDropContext>
      <div className="MapTempat">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
          options={{
      componentRestrictions: { country: 'id' },
      }}
        >
        <input type="text" />
        </Autocomplete>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk' }}
        defaultZoom={17} 
        center={
         { lat: location.latitude,
          lng: location.longitude,}
          
        }
        onChange={handleChange}
        >
          
           {stores.map((store) => (
            <div   
            lat={store.geometry.location.lat()}
            lng={store.geometry.location.lng()}
            text={store.name}
            >            
            <LocationOnOutlinedIcon
            color="primary" fontSize="large" 
          
            />
          </div>
        ))}

          </GoogleMapReact>          
      </div>

        </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(List);

