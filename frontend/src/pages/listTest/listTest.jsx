import React from 'react'
import GoogleMapReact from 'google-map-react';





const listTest = () => {



  
  return (
    <div> Test
      
      <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk' }}
      defaultCenter={{ lat: 59.95,
        lng: 30.33}}
      defaultZoom={11}
    >

    </GoogleMapReact>
  </div></div>
  )
}



export default listTest;