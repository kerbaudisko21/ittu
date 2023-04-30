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

const List = (props) => {


  const dateRange = useLocation();
  const { startDate, endDate } = dateRange.state;

  
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [storeList, setStoreList] = useState([]);


  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [ItineraryDay, setItineraryDay] = useState([]);
  
  console.log(startDate)
  console.log(endDate)
  
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


  const addDestination = (id) => {
    id = 1;
    setItineraryDay((prevData) =>
      prevData.map((Itinerary) =>
      Itinerary.id === id
          ? { ...Itinerary, destinations: [...Itinerary.destinations, ...storeList] }
          : Itinerary
      )
    );
  };

  // console.log(storeList)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
      },
      () => {
        console.log('Permission denied');
      }
      
    );
    
  }, []);
 
  
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
    return stores.map((store) => <li key={store.id}>{store.name} {store.rating} {store.geometry.location.lat()} {store.geometry.location.lng()} </li>);
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

  console.log(ItineraryDay)

  return (
    <div className="list">
    
      <div className="planning">
      
      <div>

      {ItineraryDay.map(day => {
        
        return (
          <div key={day.id}>
            <h2>{day.date.toDateString()}</h2>
            <p>Weather: {day.weather}</p>
            <p>Temperature: {day.temperature}</p>
                {day.destinations.map((destination) => (
                <li key={destination}>{destination.name}</li>
              ))}
          </div>
        );
      })}
    </div>
   

            <br />
        Lat & Lng
       
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      Data :
      
      <ul>
        {storeList.map((store) => (
          <li >{store.name}  {store.lat}  {store.lng}</li>
        ))}
      </ul>
      <button onClick={addDestination}>add Destination</button>
      
      {/* <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={() =>
  
                console.log(getDates(startDate, endDate))
              }
            >
              Generate
            </button>
          </form> */}
  
      </div>


      <div className="placemap">
        {/* <PlaceMap /> */}
       
      <h1>Nearby Restaurants</h1>
      <ul>{renderList()}</ul>

      </div>
      
      
      <div className="MapTempat">
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
