import React, { useState, useEffect } from 'react';
import "./list.css";
// import MapTempat from "../../components/map/MapTempat.jsx";
// import PlaceMap from "../../components/PlaceMap/PlaceMap";
import { GoogleMap, useLoadScript,Marker } from "@react-google-maps/api";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import {Grid} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Autocomplete } from '@react-google-maps/api';

const List = (props) => {

  const [autocomplete, setAutocomplete] = useState(null);
  const dateRange = useLocation();
  const { startDate, endDate,  name,latitude, longitude } = dateRange.state;
  const [dragging, setDragging] = useState(false);
  
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [storeList, setStoreList] = useState([]);

  console.log(dateRange.state)
  console.log(name)
  console.log(latitude)
  console.log(longitude)
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [ItineraryDay, setItineraryDay] = useState([]);
  
  // console.log(startDate)
  // console.log(endDate)
  
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
  
  async function addWeatherToItinerary(itinerary) {
    for (let i = 0; i < itinerary.length; i++) {
      const date = itinerary[i].date;
      const lat = 44.34;
      const lon = 10.99;
      const weatherData = await getWeatherForecast(lat, lon, date);
      itinerary[i].weather = weatherData[0].weather[0].description;
      itinerary[i].temperature = weatherData[0].main.temp;
    }
    
    setItineraryDay(itinerary);
  }

  useEffect(() => {
    function getDates() {
      const dates = [];
      let currentDate = new Date(startDate);
      let id = 1;
      function addDays(date, days) {
        const newDate = new Date(date.valueOf());
        newDate.setDate(newDate.getDate() + days);
        return { 
          id: id++, 
          date: newDate, 
          weather: '',
          temperature: '',
          destinations: []
        };
      }
      while (currentDate <= new Date(endDate)) {
        dates.push(addDays(currentDate, 0));
        currentDate = addDays(currentDate, 1).date;id--;
      }
      addWeatherToItinerary(dates);
    }

    getDates();
  }, [startDate, endDate]);




  console.log(storeList)

  useEffect(() => {
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
      type: ['restaurant'],
    };
    const callback = (results, status) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setStores(results);
      }
    };
    
    service.nearbySearch(request, callback);
  }, [props, location]);

 

  const renderList = () => {
    console.log(stores)
    return stores.map((store) => 

    <div
    id={store.place_id}
    draggable="true"
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
  >
  {store.name} 
  </div>
    // <li key={store.id}>{store.name} {store.rating} {store.geometry.location.lat()} {store.geometry.location.lng()} </li>);
    )
  };
   
  


  const handleClick = (data) => {
    const newStore = {
      name: data,
      lat: data.lat,
      lng: data.lng
    };
    setStoreList((storeList) => [...storeList, newStore]);
    
  };
  // console.log(storeList);

  const handleChange = ({center}) => {
    setLocation( {latitude: center.lat,
      longitude: center.lng} );

      // console.log(location)
  }

  // console.log(ItineraryDay)

  const handleDragStart = (event) => {
    setDragging(true);
    event.dataTransfer.setData('text/plain', event.target.id);

  };

  const handleDragEnd = () => {
    setDragging(false);
  };

 

  const handleDrop = (e, id) => {
    // Nanti tambahin id, lat, long dll
    console.log(e)
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    console.log(itemId)

    if (typeof stores.find((item) => item.place_id === itemId) === "undefined") {
      console.log("The variable is undefined");
      const newStore = {
        name: itemId,
      };

      const newDestinations = [...ItineraryDay[id - 1].destinations, newStore];

      setItineraryDay((prevData) =>
        prevData.map((Itinerary) =>
          Itinerary.id === id ? { ...Itinerary, destinations: newDestinations} : Itinerary
        )
      );
      

    } else {

      console.log("The variable is defined");

      const destinationName = stores.find((item) => item.place_id === itemId).name;
    
      const newStore = {
        name: destinationName,
      };
  
      const newDestinations = [...ItineraryDay[id - 1].destinations, newStore];
     
      console.log(newStore)
  
      setItineraryDay((prevData) =>
        prevData.map((Itinerary) =>
          Itinerary.id === id ? { ...Itinerary, destinations: newDestinations} : Itinerary
        )
      );
    }

    
   
  };


  const handleDragOver = (event) => {
    event.preventDefault();
    
  };

console.log(ItineraryDay)

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
     const latitude = autocomplete.getPlace().geometry.location.lat();
     const longitude = autocomplete.getPlace().geometry.location.lng();
    
     setLocation({ latitude, longitude });
  };


  return (
    <div className="list">
    
      <div className="planning">
     <h1>{name}</h1> 
      <div>

      {ItineraryDay.map(day => {
        
        return (
          <div key={day.id}
          
          >
            <h2>{day.date.toDateString()}</h2>
            <p>Weather: {day.weather}</p>
            <p>Temperature: {day.temperature}</p>
            <div
                  id="droppable1"
                  onDrop={(e) => handleDrop(e, day.id)}
                  onDragOver={handleDragOver}
                  style={{
                    backgroundColor: dragging ? 'lightgray' : 'white',
                    flexGrow: '1',
                    textAlign: 'left',
                    lineHeight: '50px',
                  }}
                  
                > 
                Destination :
                </div>

                {day.destinations.map((destination) => (
                  <div
                  id={destination.name}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}

                > 
                  {destination.name}
                </div>
              
              ))}
          </div>
        );
      })}
    </div>
   

      
       
  
      </div>


      <div className="placemap">
        {/* <PlaceMap /> */}
      
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      
   
      <h1>Nearby Restaurants</h1>
      <ul>{renderList()}</ul>

      </div>
      
      
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
            onClick={() => handleClick(store.name)}
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
