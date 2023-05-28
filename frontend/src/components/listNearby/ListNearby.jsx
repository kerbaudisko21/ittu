import React from 'react'
import ListDndStore from '../listDndStores/ListDndStores'
import './listNearby.css'

const ListNearby = ({ stores, SetMarkerOn, location, setType, type }) => {

  const ShowMarker = () => {
    SetMarkerOn(true)
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
    console.log(event.target.value)
  };


  return (
    <div>
        {/* <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p> */}
      
      <h2 className='listNearbyTitle'>Nearby {type}</h2>
      <div className='listNearbyTop'>
      <select value={type} onChange={handleTypeChange}>
        <option value="restaurant">restaurant</option>
        <option value="lodging">hotel</option>
        <option value="tourist_attraction">attraction</option>
      </select>
      <button onClick={ShowMarker}>Show Marker</button>
      
      </div>


      <ListDndStore stores={stores} />

    </div>
  )
}

export default ListNearby