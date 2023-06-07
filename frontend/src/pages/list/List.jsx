import React, { useState, useEffect } from 'react';
import "./list.css";
import axios from 'axios';

import { GoogleApiWrapper } from 'google-maps-react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Autocomplete } from '@react-google-maps/api';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import { format } from 'date-fns'
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDownload from '../../components/pdfDownload/PdfDownload';
import ListInformation from '../../components/ListInformation/ListInformation';
import ListItinerary from '../../components/listItinerary/ListItinerary';
import ListNearby from '../../components/listNearby/ListNearby';
import ListCheckList from '../../components/listCheckList/ListCheckList';
import ListMap from '../../components/listMap/ListMap';
import Swal from 'sweetalert2';


const List = (props) => {
  const [checklist, setChecklist] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const dateRange = useLocation();
  const { startDate, endDate, name, latitude, longitude, tripLocation } = dateRange.state;
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [type, setType] = useState('restaurant');
  const [ItineraryDay, setItineraryDay] = useState([]);
  const [markerOn, SetMarkerOn] = useState(true);
  
  const [responseDirection, setResponseDirection] = useState(null);
  const [OnArray, setOnArray] = useState(null);
  let [options, setOptions] = useState([])
  let [stopPoints, setStopPoints] = useState([])

  useEffect(() => {
    function getDates() {
      const dates = [];
      let currentDate = new Date(startDate);
      let id = 0;
      function addDays(date, days) {
        const newDate = new Date(date.valueOf());
        newDate.setDate(newDate.getDate() + days);
        id = Number(id);
        id++;

        return {
          id: id.toString(),
          date: newDate,
          weather: '',
          temperature: '',
          destinations: []
        }

          ;



      }
      while (currentDate <= new Date(endDate)) {
        dates.push(addDays(currentDate, 0));
        currentDate = addDays(currentDate, 1).date;
        id = Number(id);
        id--;

      }
      addWeatherToItinerary(dates);
    }
    getDates();
  }, [startDate, endDate]);

    useEffect(() => {
      setLocation({ latitude, longitude });
    }, [latitude, longitude]);

  useEffect(() => {
    const { google } = props;
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    const coordinatesLatLng = new google.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const request = {
      location: coordinatesLatLng,
      radius: '5000',
      type: [type],
    };
    const callback = (results, status) => {

      if (status === google.maps.places.PlacesServiceStatus.OK) {

        results = results.filter((item) => item.business_status === "OPERATIONAL" && item.user_ratings_total > 50);
        setStores(results);
      }
    };

    service.nearbySearch(request, callback);
  }, [props, location, type]);

  async function addWeatherToItinerary(itinerary) {
    for (let i = 0; i < itinerary.length; i++) {
      const date = itinerary[i].date;
      const lat = latitude;
      const lon = longitude;
      const weatherData = await getWeatherForecast(lat, lon, date);
      itinerary[i].weather = weatherData[0]?.weather[0].description;
      itinerary[i].icon = weatherData[0]?.weather[0].icon;
      itinerary[i].temperature = weatherData[0]?.main.temp;
    }
    setItineraryDay(itinerary);
  }

  async function getWeatherForecast(lat, lon, date) {
    const apiKey = 'ab153f1fe2b71c6c9649d3beaeefc00c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Filter the list based on the date you want
    const filteredList = data.list.filter(item => {
      const itemDate = new Date(item.dt_txt);
      return itemDate.toDateString() === new Date(date).toDateString();
    });
    return filteredList;
  }

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const latitude = autocomplete.getPlace().geometry.location.lat();
    const longitude = autocomplete.getPlace().geometry.location.lng();

    setLocation({ latitude, longitude });
  };


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination.droppableId;
    if (result.type === "droppableItem") {
      setItineraryDay(reorder(ItineraryDay, sourceIndex, destIndex));
    }
    else if (result.type === "droppableSubItem") {
      if (sourceParentId !== 'Stores') {
        const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
          acc[item.id] = item.destinations;
          return acc;
        }, {});
        const sourceSubItems = itemSubItemMap[sourceParentId];
        const destSubItems = itemSubItemMap[destParentId];
        let newItems = [...ItineraryDay];

        /** In this case subItems are reOrdered inside same Parent */
        if (sourceParentId === destParentId) {
          const reorderedSubItems = reorder(
            sourceSubItems,
            sourceIndex,
            destIndex
          );
          newItems = newItems.map((item) => {
            if (item.id === sourceParentId) {
              item.destinations = reorderedSubItems;
            }
            return item;
          });
          setItineraryDay(newItems);
          setResponseDirection(null)
          setOptions(null)
        } else {
          let newSourceSubItems = [...sourceSubItems];
          const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

          let newDestSubItems = [...destSubItems];
          newDestSubItems.splice(destIndex, 0, draggedItem);
          newItems = newItems.map((item) => {
            if (item.id === sourceParentId) {
              item.destinations = newSourceSubItems;
            } else if (item.id === destParentId) {
              item.destinations = newDestSubItems;
            }
            return item;
          });
          setItineraryDay(newItems);
          setResponseDirection(null)
          setOptions(null)
        }
      } else if (sourceParentId === "Stores") {
        const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
          acc[item.id] = item.destinations;
          return acc;
        }, {});
        const sourceStore = stores[sourceIndex];
        const newDestSubItems1 = itemSubItemMap[destParentId];
        let newItems = [...ItineraryDay];
        let newSourceSubItems = [...stores];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        let newDestSubItems = [...newDestSubItems1];

        newDestSubItems.splice(destIndex, 0, { ...draggedItem, id: uuidv4() , placePhotoUrl: draggedItem.photos[0].getUrl() 
          ,latDirection : draggedItem.geometry.location.lat()
          ,lngDirection : draggedItem.geometry.location.lng()
        });


        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.destinations = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.destinations = newDestSubItems;
          }
          return item;
        });
        setItineraryDay(newItems);
        setResponseDirection(null)
        setOptions(null)
      }
    }
  };

  const directionsCallback = (res) => {
    if (res !== null && responseDirection === null) {
      res = {
        ...res,
        id: OnArray
      }
      setResponseDirection(res);
    }
  };

  const updateOptions = (type, directions) => {
    setOptions(null)
    setResponseDirection(null)
    if (directions.length <= 1) {
      return
    }
    else if (directions.length === 2) {
      options = {
        destination: directions[1],
        origin: directions[0],
        travelMode: "DRIVING",
      }
    }
    else if (directions.length > 2) {
      let i = 0;
      directions.map((item, index) => {
        if (index !== 0 && index !== directions.length - 1) {
          stopPoints[i] = {
            location: item,
            stopover: true,
          };
          i++;
        }
        return stopPoints;
      }
      );

      options = {
        destination: directions[directions.length - 1],
        origin: directions[0],
        travelMode: "DRIVING",
        waypoints: stopPoints,
      }
    }
    setOnArray(type)
    setOptions(options)
    SetMarkerOn(false)
  };

  const saveItinerary = async () => {
    let id = JSON.parse(localStorage.getItem('user'));

    let data = {
      "title": name,
      "tripLocation": tripLocation,
      "tripBgImage": imageUrl,
      "start_date": format(startDate, "yyyy/MM/dd"),
      "end_date": format(endDate, "yyyy/MM/dd"),
      "latitude": latitude,
      "longtitude": longitude,
      "itinerary_days": { ItineraryDay },
      "checklist": { checklist },
    };
    const res = axios.post(`/itinerary/${id._id}`, data);
    Swal.fire({
      icon: 'success',
      title: 'Itinerary succesfully created!',
      confirmButtonText: 'Ok',
    }).then((ok) => {
      if (ok.isConfirmed) {
        window.location.href = '/';
      }
    })
  }

  const [selectedMarker, setSelectedMarker] = useState(null);


  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random?query=${tripLocation}&orientation=landscape&client_id=cjj0NJ5aXgoO7iQZmizJJwOPeU2EH--C46El8zcmArQ`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.urls.regular);
      });

  }, [tripLocation]);

  const [listToggle, setListToggle] = useState(true);

  return (
    <>
    <div>
      {/* <Navbar /> */}
      <div className="list">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="planning">
            <ListInformation
              tripName={name}
              startTripDate={startDate}
              endTripDate={endDate}
              imageUrl={imageUrl}
              setListToggle={setListToggle}
            />

            <ListItinerary
              ItineraryDay={ItineraryDay}
              setItineraryDay={setItineraryDay}
              responseDirection={responseDirection}
              updateOptions={updateOptions}
              setResponseDirection={setResponseDirection}
              setOptions={setOptions}
            />

          </div>
          <div className="placemap">

            {listToggle ?
              <div><ListNearby
                stores={stores}
                SetMarkerOn={SetMarkerOn}
                location={location}
                setType={setType}
                type={type}
              /></div>
              :
              <div><ListCheckList
                checklist={checklist}
                setChecklist={setChecklist}
              /></div>}
          </div>
        </DragDropContext>

        <div className="MapTempat">
          <ListMap
            location={location}
            stores={stores}
            markerOn={markerOn}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
            responseDirection={responseDirection}
            options={options}
            directionsCallback={directionsCallback}
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            saveItinerary={saveItinerary}
            startDate={startDate}
            endDate={endDate}
            name={name}
            tripLocation={tripLocation}
            ItineraryDay={ItineraryDay}
            checklist={checklist}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB8Tlelmf8iFA8ailR6-0Q1_VWRAvBU5jA',
})(List);

