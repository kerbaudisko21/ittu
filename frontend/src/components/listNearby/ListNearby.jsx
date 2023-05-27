import React from 'react'
import DndStore from '../../pages/listTest/DndStore'

const ListNearby = ({ stores, SetMarkerOn, location, setType,type}) => {
    
    const ShowMarker = () => {
        SetMarkerOn(true)
      }

      const handleTypeChange = (event) => {
        setType(event.target.value);
        console.log(event.target.value)
      };
    

    return (
        <div>
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
    )
}

export default ListNearby