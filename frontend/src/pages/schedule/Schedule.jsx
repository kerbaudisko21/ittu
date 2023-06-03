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
import Swal from 'sweetalert2';
import './schedule.css';
import Loading from '../../components/loading/Loading.js';



const Schedule = (props) => {
  
  const itinerary = useLocation();
  let { startDate,tripBgImage, endDate, name, latitude, longitude, tripLocation, itinerary_days, itineraryId } = itinerary.state;
  console.log(itinerary.state);
  const [checklist, setChecklist] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState({});
  const [type, setType] = useState('restaurant');
  const [ItineraryDay, setItineraryDay] = useState([]);
  const [markerOn, SetMarkerOn] = useState(true);
  const [loading, setLoading] = useState(false);

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
    console.log(latitude)
    console.log(longitude)

    latitude = Number(latitude)
    longitude = Number(longitude)
   
      setLocation({  latitude , longitude });
   
  }
  , [latitude, longitude]);


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

    const callback = async (results, status) => {
      
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
      console.log(weatherData)
      itinerary[i].weather = weatherData[0].weather[0].description;
      itinerary[i].icon = weatherData[0].weather[0].icon;
      itinerary[i].temperature = weatherData[0].main.temp;
    }
    console.log(itinerary_days);
    setItineraryDay(itinerary_days);
    console.log(ItineraryDay);
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
  console.log(tripBgImage)
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
    latitude = Number(latitude)
    longitude = Number(longitude)
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
    console.log(result);
    console.log(ItineraryDay)
    console.log(itinerary_days)
    console.log("innner drag");
    if (!result.destination) {
      console.log("No Destination");
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
      console.log("droppableSubItem +")
      if (sourceParentId !== 'Stores') {
        const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
          acc[item.id] = item.destinations;
          console.log(item.destinations)
          console.log(acc)
          return acc;
        }, {});
        console.log({ itemSubItemMap })
        console.log([sourceParentId])
        const sourceSubItems = itemSubItemMap[sourceParentId];
        console.log(sourceSubItems)
        const destSubItems = itemSubItemMap[destParentId];


        let newItems = [...ItineraryDay];

        /** In this case subItems are reOrdered inside same Parent */
        if (sourceParentId === destParentId) {
          console.log("reordersub")
          console.log("sourceSubItems " + sourceSubItems)
          console.log("sourceIndex " + sourceIndex)
          console.log("destIndex " + destIndex)
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

        console.log('==> dest', destParentId);
        console.log(result)
        const itemSubItemMap = ItineraryDay.reduce((acc, item) => {
          acc[item.id] = item.destinations;
          console.log(item.destinations)
          console.log(acc)
          return acc;
        }, {});
        console.log(itemSubItemMap)

        const sourceStore = stores[sourceIndex];
        console.log(sourceStore)

        const newDestSubItems1 = itemSubItemMap[destParentId];
        console.log(newDestSubItems1)

        let newItems = [...ItineraryDay];

        let newSourceSubItems = [...stores];
        console.log(newSourceSubItems)
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        console.log([draggedItem])
        let newDestSubItems = [...newDestSubItems1];
        console.log(newDestSubItems)

        newDestSubItems.splice(destIndex, 0, { ...draggedItem, id: uuidv4() ,
          placePhotoUrl: draggedItem.photos[0].getUrl()
          ,latDirection : draggedItem.geometry.location.lat()
          ,lngDirection : draggedItem.geometry.location.lng()
        });


        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            console.log("sourceParentId")
            item.destinations = newSourceSubItems;

          } else if (item.id === destParentId) {



            item.destinations = newDestSubItems;
            console.log(newDestSubItems)

          }
          return item;
        });
        setItineraryDay(newItems);
        setResponseDirection(null)
        setOptions(null)

      }
    }
  };

  const [responseDirection, setResponseDirection] = useState(null);

  const [OnArray, setOnArray] = useState(null);
  let [options, setOptions] = useState([])
  let [stopPoints, setStopPoints] = useState([])

  const directionsCallback = (res) => {
    console.log("DirectionAPI")
    if (res !== null && responseDirection === null) {
      console.log(res)

      res = {
        ...res,
        id: OnArray
      }
      console.log(res)
      setResponseDirection(res);
    }
  };

  const updateOptions = (type, directions) => {
    setOptions(null)
    setResponseDirection(null)
    console.log(directions)

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
        console.log(stopPoints)
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
    console.log(type)
    setOnArray(type)
    console.log(OnArray)
    setOptions(options)
    console.log(options)
    SetMarkerOn(false)
  };

  const updateItinerary = async () => {
    let data = {
      "title": name,
      "tripLocation": tripLocation,
      "tripBgImage": imageUrl,
      "start_date": startDate,
      "end_date": endDate,
      "latitude": latitude,
      "longtitude": longitude,
      "itinerary_days": { ItineraryDay },
      "checklist": {checklist},
    };
    const res = axios.put(`/itinerary/${itineraryId}`, data);

    Swal.fire({
      icon: 'success',
      title: 'Itinerary succesfully updated!',
      confirmButtonText: 'Ok',
    }).then((ok) => {
      if (ok.isConfirmed) {
        window.location.href = '/';
      }
    })
  }


  return (
    <>
      {loading ? <Loading/> : 
      <div>
      <div className="list">
      <DragDropContext  onDragEnd={onDragEnd}>
        <div className="planning">
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
        {/* <PDFDownloadLink document={<PdfDownload 
    tripName={name}
    ItineraryDay={ItineraryDay}
    />} filename="FORM">
    {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
    </PDFDownloadLink> */}

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
    updateItinerary={updateItinerary}
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
      }
    
    </>

  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk',
})(Schedule);