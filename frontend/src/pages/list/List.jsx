import React, { useState, useEffect } from 'react';
import "./list.css";
// import MapTempat from "../../components/map/MapTempat.jsx";
// import PlaceMap from "../../components/PlaceMap/PlaceMap";
import { GoogleMap, useLoadScript,Marker } from "@react-google-maps/api";
import { Map, GoogleApiWrapper } from 'google-maps-react';

const List = (props) => {

  const [stores, setStores] = useState([]);
  
 

  useEffect(() => {
    const { google } = props;
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    const request = {
      location: new google.maps.LatLng(-6.200000, 106.816666),
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
  }, [props]);

  const renderList = () => {
    return stores.map((store) => <li key={store.id}>{store.name} {store.rating}</li>);
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
      console.log(store.name);
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
    console.log(data);
    // Show details here
  };

  return (
    <div className="list">
      <div className="planning">a</div>


      <div className="placemap">
        {/* <PlaceMap /> */}
       
      <h1>Nearby Restaurants</h1>
      <ul>{renderList()}</ul>

      </div>


      <div className="MapTempat">
        <GoogleMap zoom={15} center={{ lat: -6.200000, lng:106.816666 }}
          mapContainerClassName='map-container'>

          {markers.map((marker) => (
        <Marker title={marker.title} position={marker.position} onLoad={(marker) => marker.addListener("click", () => handleClick(marker.title))} />
      ))}

          </GoogleMap>
          
      </div>


    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(List);
