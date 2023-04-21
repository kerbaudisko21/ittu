import React from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "./MapTempat.css";

const MapTempat = () => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk"
      });
  
      if(!isLoaded) return <div>loading...</div>
    return (
    <div>  
      
        <GoogleMap zoom={10} center={{lat:44, lng:-80}} 
        mapContainerClassName='map-container'></GoogleMap>
    </div>
  )
}

export default MapTempat