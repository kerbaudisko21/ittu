import React, { useState } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
 width: "400px",
 height: "400px",
};

const center = {
 lat: -3.745,
 lng: -38.523,
};

function ListTest() {
 const [response, setResponse] = useState(null);

 const directionsCallback = (res) => {
 if (res !== null && response === null) {
 console.log(res)
 setResponse(res);
 }
 };
 
 const destinations = [
 "Fillmore Coffee",
 "Universitas Bina Nusantara, Kampus Anggrek",
 "Universitas Bina Nusantara, Kampus Alam Sutera",
 ];

 return (
 <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
 {response !== null && (
 <DirectionsRenderer
 // required
 options={{
 directions: response,
 }}
 />
 )}

 <DirectionsService
 // required
 options={{
 destination: destinations[2],
 origin: destinations[0],
 travelMode: "DRIVING",
 waypoints: [
  {
  location: destinations[1],
  stopover: true,
  },
  ],
  }}
 
 // required
 callback={directionsCallback}
 />

 </GoogleMap>
 );
}

export default ListTest;