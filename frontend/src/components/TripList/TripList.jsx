import React from "react";
import "./tripList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import imgTrip from "../../Image/Homepage/Tokyo.png";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const TripList = () => {

  let userDetails = JSON.parse(localStorage.getItem('user'));
  console.log(userDetails);

  const {data, loading, error} = useFetch(`/itinerary/user/${userDetails._id}`);

  console.log(data);
  console.log(loading);


  return (
    <div className="tripList" >
    {loading ?
    "loading" : 
    (data != '') ? 
    <> 
     {data.map((data) => (
      <div className="tContainer"key={data._id}>
        <div className="tImg">
          <img src={imgTrip} alt="" />
        </div>
        <div className="tInfo">
          <h1 className="tTitle">{data.title}</h1>
          <h3 className="tDate">
            {data.start_date} <FontAwesomeIcon icon={faArrowRight} /> {data.end_date}
          </h3>
          <a href="/">
            <button className="btnTrip">View</button>
          </a>
        </div>
      </div>
     ))}
    </> : 'you dont have any itinerary'
    }
    </div>



  );
};

export default TripList;
