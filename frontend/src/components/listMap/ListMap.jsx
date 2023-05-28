import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow,Autocomplete} from "@react-google-maps/api";

const ListMap = ({location,markerOn,stores,setSelectedMarker,selectedMarker,response,options,directionsCallback,onLoad,onPlaceChanged}) => {

    const containerStyle = {
        width: "100%",
        height: "800px",
      };

      const center = {
        lat: location.latitude,
        lng: location.longitude,
      };

      const handleMouseOver = (marker) => {
        setSelectedMarker(marker);
      };
    
      const handleMouseOut = () => {
        setSelectedMarker(null);
      };
    

    return (
        <div>

<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
            options={{
              componentRestrictions: { country: 'id' },
            }}
          >
            <input type="text" />
          </Autocomplete>   

            <GoogleMap
                zoom={15}
                center={center}
                mapContainerStyle={containerStyle}

            >
                {(() => {
                    if (markerOn === true) {
                        return (
                            <div>
                                {stores.map((store, index) => (

                                    <Marker position={{
                                        lat: store.geometry.location.lat(),
                                        lng: store.geometry.location.lng()

                                    }}
                                        onMouseOver={() => handleMouseOver(store.place_id)}
                                        onMouseOut={handleMouseOut}

                                        label={{
                                            text: (index + 1).toString(),
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                        }}

                                    >
                                        {selectedMarker === store.place_id && (
                                            <InfoWindow>
                                                <div>
                                                    <h3>{store.name}</h3>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </Marker>
                                ))}
                            </div>
                        )
                    }
                    else if (response !== null && markerOn === false) {
                        return (
                            <div>
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        directions: response,
                                    }}
                                />
                            </div>
                        )
                    }
                })()}







                <DirectionsService
                    // required
                    options={options}

                    // required
                    callback={directionsCallback}
                />



            </GoogleMap></div>
    )
}

export default ListMap