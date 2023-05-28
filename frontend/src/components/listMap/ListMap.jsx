import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow, Autocomplete } from "@react-google-maps/api";

import "./listMap.css"


const ListMap = ({ location, markerOn, stores, setSelectedMarker, selectedMarker, response, options, directionsCallback, onLoad, onPlaceChanged, saveItinerary}) => {

 
    const containerStyle = {
        width: "100%",
        height: "100vh",
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
            <div className='mapSearch'>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
                    options={{
                        componentRestrictions: { country: 'id' },
                    }}
                >
                    <input className='mapSearchInput' type="text" />
                </Autocomplete>
            </div>
            <div className='mapGmaps'>
                <GoogleMap
                    zoom={15}
                    center={center}
                    mapContainerStyle={containerStyle}
                    options={{
                        streetViewControl: false,
                        disableDefaultUI: true,
                        zoomControl: false,
                        fullscreenControl: true
                    }}
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
                </GoogleMap>
                <div className='mapSaveContainer'>
                <button className='mapSaveButton' onClick={saveItinerary}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default ListMap