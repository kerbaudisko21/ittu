import React from 'react';
import './tripList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import imgTrip from '../../Image/Homepage/Tokyo.png';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {format} from 'date-fns'
import Loading from '../loading/Loading';

const TripList = (props) => {

  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const [profile, setProfile] = useState();

  // const [dates, setDate] = useState([
  //   { 
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     lat: 0,
  //     lng: 0,
  //     name: null,
  //     tripLocation: null,
  //   }
  // ]);


  const handleClick = () => {

    let profile = JSON.parse(localStorage.getItem('user'));

    navigate(`/list/${profile._id}/${props.tripDet._id}`, { state:   {
      itineraryId: props.tripDet._id,
      tripBgImage: props.tripDet.tripBgImage,
      startDate: props.tripDet.start_date,
      endDate: props.tripDet.end_date,
      latitude: props.tripDet.latitude,
      longitude: props.tripDet.longtitude,
      tripLocation: props.tripDet.tripLocation,
      name: props.tripDet.title,
      checklistDb:  props.tripDet.checklist.checklist,
      itinerary_days: props.tripDet.itinerary_days.ItineraryDay
    } });
  };

  return (
    <div className="tripList">
      {props.load ? (
        <Loading />
      ) : props.tripDet != '' ? (
        <>
          {/* {data.map((data) => ( */}
          <div className="tContainer" key={props.tripDet._id}>
            <div className="tImg">
              <img src={props.tripDet.tripBgImage} alt="" />
            </div>
            <div className="tInfo">
              <h1 className="tTitle">{props.tripDet.title}</h1>
              <h3 className="tDate">
                {new Date(props.tripDet.start_date).toDateString()} <FontAwesomeIcon icon={faArrowRight} /> {new Date(props.tripDet.end_date).toDateString()}
              </h3>
              <a>
                <button className="btnTrip" onClick={handleClick}>View</button>
              </a>
            </div>
          </div>
          {/* ))} */}
        </>
      ) : (
        'you dont have any itinerary'
      )}
    </div>
  );
};

export default TripList;
