import React, { useState, useEffect, useRef } from 'react';
import "./list.css";
import axios from 'axios';

import { GoogleApiWrapper } from 'google-maps-react';
import { useLocation } from "react-router-dom";
import { Autocomplete } from '@react-google-maps/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import {GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import {format} from 'date-fns'
import { PDFDownloadLink } from "@react-pdf/renderer";





import DndStore from '../listTest/DndStore';
import PdfDownload from '../listTest/PdfDownload';

import ListInformation from '../../components/ListInformation/ListInformation';
import ListItinerary from '../../components/listItinerary/ListItinerary';

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
  const { startDate, endDate,  name,latitude, longitude, imageUnsplashSearch} = dateRange.state;
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [type, setType] = useState('restaurant');
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
      radius: '5000',
      type: [type],
    };
    const callback = (results, status) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {

         results = results.filter((item) => item.business_status === "OPERATIONAL" && item.user_ratings_total > 50);
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



  const containerStyle = {
    width: "100%",
    height: "800px",
   };

   const center = {
     lat: location.latitude,
      lng: location.longitude,
   };


   const [response, setResponse] = useState(null);
   const [OnArray, setOnArray] = useState(null);
   let [options, setOptions] = useState([])
   let [stopPoints, setStopPoints] = useState([]) 
   const [markerOn, SetMarkerOn] = useState(true);

   const directionsCallback = (res) => {
    if (res !== null && response === null) {
    console.log(res)

    res = {
      ...res,
      id: OnArray
    }
    
    console.log(res)
    setResponse(res);
    }
    };
  
  
    const updateOptions = (type,directions) => {
    setOptions(null)
    setResponse(null)
     console.log(directions)
    
     if(directions.length <= 1 ){
      return
     }
      else if(directions.length === 2){
      options = {
          destination: directions[1],
          origin: directions[0],
          travelMode: "DRIVING",
          }
        }
      else if (directions.length > 2){
        let i = 0;
        directions.map((item,index) => {
          if(index!== 0 && index!== directions.length-1){
            stopPoints[i] = {
           location: item,
           stopover: true,
         };
         i++;
        }
         console.log(stopPoints)
         return stopPoints;
       }
       );

       options = {
        destination: directions[directions.length-1],
        origin: directions[0],
        travelMode: "DRIVING",
        waypoints: stopPoints,

          
        }

      }
      console.log(type)
      setOnArray(type)
      console.log(OnArray)
      setOptions(options)
      console.log(options)
      SetMarkerOn(false)
    };

    const saveItinerary = async () => {
      let id = JSON.parse(localStorage.getItem('user'));
  
      let data = {
        "title" : name,
        "start_date": format(startDate,"MM/dd/yyyy"),
        "end_date": format(endDate,"MM/dd/yyyy"),
        "latitude": latitude,
        "longtitude": longitude,
        "itinerary_days":{ItineraryDay}
      };
      const res = axios.post(`/itinerary/${id._id}`, data);
  
      console.log(res);

      if (res) {
        window.location.href = '/';

      }
    }


    console.log(ItineraryDay)

    const ShowMarker = () => {
      SetMarkerOn(true)
    }

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMouseOver = (marker) => {
      setSelectedMarker(marker);
    };
  
    const handleMouseOut = () => {
      setSelectedMarker(null);
    };



  return (
    <div>
      {/* <Navbar /> */}
    <div className="list">
   
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="planning">
      <ListInformation 
      tripName = {name}
      startTripDate = {startDate}
      endTripDate ={endDate}
      />
      
      <ListItinerary 
      ItineraryDay={ItineraryDay}
      setItineraryDay={setItineraryDay}
      response={response}
      updateOptions={updateOptions}
      />

      </div>
      <div className="placemap">
   
      <button onClick={ShowMarker}>Show Marker</button>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>

      <select value={type} onChange={handleTypeChange}>
        <option value="restaurant">restaurant</option>
        <option value="lodging">hotel</option>
        <option value="tourist_attraction">attraction</option>
      </select>
   
      <h1>Nearby {type}</h1>
     
      <DndStore stores={stores} />
    

      </div>
      </DragDropContext>
      <div className="MapTempat">
      <PDFDownloadLink document={<PdfDownload 
      tripName={name}
      ItineraryDay={ItineraryDay}
      />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink>

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
          options={{
      componentRestrictions: { country: 'id' },
      }}
        >
        <input type="text" />
        </Autocomplete>
     
        <GoogleMap
        zoom={15} 
        center={center}
        mapContainerStyle={containerStyle}
      
        >
              {(() => {
        if (markerOn === true ) {
              return (
            <div>
              {stores.map((store,index) => (
               
          <Marker position={{
            lat : store.geometry.location.lat(),
            lng : store.geometry.location.lng()
            
          }} 
          onMouseOver={() => handleMouseOver(store.place_id)}
          onMouseOut={handleMouseOut}

          label={{
            text: (index + 1).toString(),
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          
          >
          {selectedMarker === store.place_id && (
            <InfoWindow>
              <div>
                <h3>{store.name}</h3>
              </div>
            </InfoWindow>
          )}
            </Marker>
           ))}
             </div>
          )
        } 
        else if (response !== null && markerOn === false ){
          return (
            <div>
               <DirectionsRenderer
 // required
 options={{
 directions: response,
 }}
 />
            </div>
          )
        }
      })()}
       
        
         
         
          
           

 <DirectionsService
 // required
 options={options}
 
 // required
 callback={directionsCallback}
 />



          </GoogleMap>          
    </div>
        <button onClick={saveItinerary}>Create</button>
    </div>
  </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(List);

