import React, { useState } from 'react'
import Select from 'react-select';
import ListDndStore from '../listDndStores/ListDndStores'
import './listNearby.css'

const ListNearby = ({ stores, SetMarkerOn, location, setType, type }) => {

  const [Label, setLabel] = useState('Restaurant');

  const ShowMarker = () => {
    SetMarkerOn(true)
  }

  const handleTypeChange = (event) => {
    console.log(event.value)
    setType(event.value);
    setLabel(event.label)
  };

  const options = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'lodging', label: 'Hotel' },
    { value: 'tourist_attraction', label: 'Attraction' }
  ];
  


  return (
    <div>
      {/* <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p> */}

      <h2 className='listNearbyTitle'>Nearby {Label}</h2>
    

      <div className='listNearbyTop'>
        <div className='listNearbyDropdown'>
        </div>
        <Select options={options} onChange={handleTypeChange}/>
        <button onClick={ShowMarker}>Show Marker</button>

      </div>
      <ListDndStore stores={stores} />

    </div>
  )
}

export default ListNearby