import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom';
import ListInformation from '../../components/ListInformation/ListInformation';
import ListItinerary from '../../components/listItinerary/ListItinerary';
import ListNearby from '../../components/listNearby/ListNearby';
import ListCheckList from '../../components/listCheckList/ListCheckList';
import ListMap from '../../components/listMap/ListMap';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { GoogleApiWrapper } from 'google-maps-react';
import './viewList.css'


const ViewList = (props) => {
  
  const itinerary = useLocation();
  let { startDate,tripBgImage, endDate, name, latitude, longitude, tripLocation, itinerary_days, itineraryId } = itinerary.state;
  const [checklist, setChecklist] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [type, setType] = useState('restaurant');
  const [ItineraryDay, setItineraryDay] = useState([]);
  const [markerOn, SetMarkerOn] = useState(true);


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
    latitude = Number(latitude)
    longitude = Number(longitude)
    setLocation({  latitude , longitude });
  },[latitude, longitude]);

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
    setItineraryDay(itinerary_days);
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
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    if(tripBgImage != null){
    setImageUrl(tripBgImage);}
    else{
    fetch(`https://api.unsplash.com/photos/random?query=${tripLocation}&orientation=landscape&client_id=cjj0NJ5aXgoO7iQZmizJJwOPeU2EH--C46El8zcmArQ`)
    .then((response) => response.json())
    .then((data) => {
      setImageUrl(data.urls.regular);
    });}
  }, [tripLocation]);

  const [listToggle, setListToggle] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

        newDestSubItems.splice(destIndex, 0, { ...draggedItem, id: uuidv4() });


        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.destinations = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.destinations = newDestSubItems;
          }
          return item;
        });
        setItineraryDay(newItems);
      }
    }
  };

  const [responseDirection, setResponseDirection] = useState(null);

  const [OnArray, setOnArray] = useState(null);
  let [options, setOptions] = useState([])
  let [stopPoints, setStopPoints] = useState([])

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


  return (
    <div>
        <div className="list">
        <DragDropContext >
          <div className="planningView">
            <ListInformation
              tripName={name}
              startTripDate={new Date(startDate).toDateString()}
              endTripDate={new Date(endDate).toDateString()}
              imageUrl={imageUrl}
              setListToggle={setListToggle}
            />

            <ListItinerary
              ItineraryDay={ItineraryDay} // {ItineraryDays}
              setItineraryDay={setItineraryDay}
              responseDirection={responseDirection}
              setResponseDirection={setResponseDirection}
              updateOptions={updateOptions}
              setOptions={setOptions}
            />

          </div>
        </DragDropContext>

        <div className="MapTempatView">
          {/* <PDFDownloadLink document={<PdfDownload 
      tripName={name}
      ItineraryDay={ItineraryDay}
      />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink> */}

      <ListMap 
      location={location}
      stores={stores}
      markerOn={false}
      setSelectedMarker={setSelectedMarker}
      selectedMarker={selectedMarker}
      responseDirection={responseDirection}
      options={options}
      directionsCallback={directionsCallback}
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
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
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB8Tlelmf8iFA8ailR6-0Q1_VWRAvBU5jA',
})(ViewList);