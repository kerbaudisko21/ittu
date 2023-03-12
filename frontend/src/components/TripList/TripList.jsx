import React from 'react'
import './tripList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import imgTrip from '../../Image/Homepage/Tokyo.png'
import { Link } from 'react-router-dom'

const TripList = () => {
  return (
    <div className="tripList">
      <div className="tContainer">
        <div className="tImg">
          <img src={imgTrip} alt="" />
        </div>
        <div className="tInfo">
          <h1 className="tTitle">
            Tokyo Trips 
          </h1>
          <h3 className="tDate">
            22/12-2023 <FontAwesomeIcon icon={faArrowRight} /> 23/12-2023
          </h3>
          <a href="/">
            <button className="btnTrip">View</button>
          </a>
        </div>
      </div>
      <div className="tContainer">
        <div className="tImg">
          <img src={imgTrip} alt="" />
        </div>
        <div className="tInfo">
          <h1 className="tTitle">
            Tokyo Trips 
          </h1>
          <h3 className="tDate">
            22/12-2023 <FontAwesomeIcon icon={faArrowRight} /> 23/12-2023
          </h3>
          <a href="/">
            <button className="btnTrip">View</button>
          </a>
        </div>
      </div>
      <div className="tContainer">
        <div className="tImg">
          <img src={imgTrip} alt="" />
        </div>
        <div className="tInfo">
          <h1 className="tTitle">
            Tokyo Trips 
          </h1>
          <h3 className="tDate">
            22/12-2023 <FontAwesomeIcon icon={faArrowRight} /> 23/12-2023
          </h3>
          <a href="/">
            <button className="btnTrip">View</button>
          </a>
        </div>
      </div>
      
    </div>

  )
}

export default TripList