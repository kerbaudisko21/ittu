import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow, Autocomplete } from "@react-google-maps/api";

import "./listMap.css"
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDownload from '../pdfDownload/PdfDownload';
import { matchPath, matchRoutes, useLocation, useParams } from 'react-router-dom';


const ListMap = ({ location, markerOn, stores, setSelectedMarker, selectedMarker, responseDirection, options, directionsCallback, onLoad, onPlaceChanged, updateItinerary ,saveItinerary, startDate, endDate, name, tripLocation, ItineraryDay,checklist
}) => {


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

    console.log(center)
    const router = useLocation();
     const[props, setProps] = useState(0);
    const params = useParams();
    console.log(params)
    useEffect(() => {
        if (router.pathname == '/List') {
          setProps(0);
        } else if (router.pathname == `/list/${params.userid}/${params.id}`) {
            setProps(1);
        } else {
            setProps(2)
        }
      },[])

    return (
        <div>
            <div className='mapSearch'>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
                    options={{
                        componentRestrictions: { country: 'id' },
                    }}
                >
                    <input  type="text"  onfocus="this.value=''" className='mapSearchInput' />

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
                        else if (responseDirection !== null && markerOn === false) {
                            return (
                                <div>
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: responseDirection,
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
                    {/* <button className='mapSaveButton' onClick={saveItinerary}>Save</button> */}
                        {(props == 0) ?
                                                    <div class="dropdown">
                                                    <button class="dropSaveBtn">Save</button>
                                                    <div class="dropdown-content">
                                                        <PDFDownloadLink document={<PdfDownload
                                                            tripName={name}
                                                            ItineraryDay={ItineraryDay}
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            tripLocation={tripLocation}
                                                            checklist={checklist}
                                                        />} filename="FORM">
                                                            {({ loading }) => (loading ? <button>Loading Document...</button> : <button className='dropDownButton'>Download PDF</button>)}
                                                        </PDFDownloadLink>
                                                        <button className='dropDownButton' onClick={saveItinerary}>Save</button>
                                                    </div>
                                                </div>
                             :
                             (props == 1) ?
                                <button className='dropSaveBtn' onClick={updateItinerary}>Update</button>
                             :
                             <></>
                            }

                </div>


            </div>
        </div>
    )
}

export default ListMap