import React from 'react';
import './tripList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import imgTrip from '../../Image/Homepage/Tokyo.png';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const TripList = (props) => {
  // let userDetails = JSON.parse(localStorage.getItem('user'));
  // console.log(userDetails);

  // const { data, loading, error } = useFetch(`/itinerary/user/${userDetails._id}`);

  // console.log(data);
  // console.log(loading);
  console.log(props, props.tripDet, props.load, 'wdawd');

  return (
    <div className="tripList">
      {props.load ? (
        'loading'
      ) : props.tripDet != '' ? (
        <>
          {/* {data.map((data) => ( */}
          <div className="tContainer" key={props.tripDet._id}>
            <div className="tImg">
              <img src={imgTrip} alt="" />
            </div>
            <div className="tInfo">
              <h1 className="tTitle">{props.tripDet.title}</h1>
              <h3 className="tDate">
                {props.tripDet.start_date} <FontAwesomeIcon icon={faArrowRight} /> {props.tripDet.end_date}
              </h3>
              <a href="/">
                <button className="btnTrip">View</button>
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
