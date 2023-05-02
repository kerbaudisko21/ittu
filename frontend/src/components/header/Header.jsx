import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import {format} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [openDate, setOpenDate] = useState(false)
  const navigate = useNavigate();
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleClick = () => {
    navigate("/List", { state:   {
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      key: 'selection'
    } });
  };

  return (
    <div className="header">
        <h1 className="headerTitle"> Discover Your Next Adventure <br></br> ITTU </h1>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faMapMarkerAlt} className='headerIcon' />
            <input type="text" placeholder="Destination" className='headerSearchInput' />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faCalendar} className='headerIcon' />
            <input type="text" readOnly className='headerSearchInput' placeholder='Start Date' onClick={() => setOpenDate(!openDate)} value={`${format(dates[0].startDate, "MM/dd/yyyy")}`}/> 
            { openDate && < DateRange className='date'
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              />}
          </div>
          <div className="headerSearchItem">
              <FontAwesomeIcon icon = {faCalendar} className='headerIcon' />
              <input type="text" placeholder='End Date' disabled className='headerSearchInput' value={`${format(dates[0].endDate, "MM/dd/yyyy")}`} />
          </div>
          <div className="headerSearchItem">
              <button onClick={handleClick} className="headerBtn">Create</button>
          </div>
        </div>
    </div>
  )
}

export default Header