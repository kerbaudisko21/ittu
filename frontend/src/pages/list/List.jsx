import React, { useState, useEffect } from 'react';
import "./list.css";
// import MapTempat from "../../components/map/MapTempat.jsx";
// import PlaceMap from "../../components/PlaceMap/PlaceMap";
import { GoogleMap, useLoadScript,Marker } from "@react-google-maps/api";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import {Grid} from '@material-ui/core';

const List = (props) => {

  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [storeList, setStoreList] = useState([]);
  

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  const handleChange = ({ center }) => {
    setCenter(center);
    console.log("test")
  };
 
  
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

  // console.log(location);

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
      location: new google.maps.LatLng(coordinatesLatLng),
      radius: '500',
      type: ['restaurant'],
    };
    const callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setStores(results);
        console.log(results);
      }
    };
    service.nearbySearch(request, callback);
  }, [props, location]);

  const renderList = () => {
    return stores.map((store) => <li key={store.id}>{store.name} {store.rating} {store.geometry.location.lat()} {store.geometry.location.lng()} </li>);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk"
  });
  if (!isLoaded) return <div>loading...</div>

  
  const renderMarkers = () => {
    return stores.map((store) => {
      
      const position = {
        lat: store.geometry.location.lat(),
        lng: store.geometry.location.lng(),
        
      };
      // console.log(position);
      // console.log(store.name);
  
      return new window.google.maps.Marker({
        position,
        map: props.map,
        title: store.name,
        icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png",
        
      }
      
      );
      
    });
    
  };
 
  const markers = renderMarkers(stores);

 

  const handleClick = (data) => {
    const newStore = {
      name: data,
      lat: data.lat,
      lng: data.lng
    };
    setStoreList((storeList) => [...storeList, newStore]);
    
  };console.log(storeList);

  return (
    <div className="list">
      <div className="planning">
        Lat & Lng
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      Data :

      <ul>
        {storeList.map((store) => (
          <li >{store.name}  {store.lat}  {store.lng}</li>
        ))}
      </ul>


      </div>


      <div className="placemap">
        {/* <PlaceMap /> */}
       
      <h1>Nearby Restaurants</h1>
      <ul>{renderList()}</ul>

      </div>


      <div className="MapTempat">
        <GoogleMap
        zoom={15} 
        center={
         { lat: location.latitude,
          lng: location.longitude,}
        }
        mapContainerClassName='map-container'
        onClick={handleChange}
        >

          {markers.map((marker) => (
        <Marker title={marker.title} position={marker.position} onLoad={(marker) => marker.addListener("click", () => handleClick(
          
          marker.title,
          marker.lat,
          marker.lng
          
          ))} />
      ))}

          </GoogleMap>
          
      </div>


    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(List);
