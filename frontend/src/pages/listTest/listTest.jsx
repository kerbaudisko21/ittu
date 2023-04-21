import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const ListTest = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const { google } = props;
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    const request = {
      location: new google.maps.LatLng(37.7749, -122.4194),
      radius: '500',
      type: ['restaurant'],
    };
    const callback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setStores(results);
      }
    };
    service.nearbySearch(request, callback);
  }, [props]);

  const renderList = () => {
    return stores.map((store) => <li key={store.id}>{store.name}</li>);
  };

  return (
    <div>
      <h1>Nearby Restaurants</h1>
      <ul>{renderList()}</ul>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(ListTest);