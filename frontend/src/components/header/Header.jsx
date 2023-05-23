import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import {format} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { Autocomplete } from '@react-google-maps/api';

const Header = () => {

  const [openDate, setOpenDate] = useState(false)
  const [autocomplete, setAutocomplete] = useState(null);
  const navigate = useNavigate();
  const [dates, setDate] = useState([
    { 
      startDate: new Date(),
      endDate: new Date(),
      lat: 0,
      lng: 0,
      name: null,
      imageUnsplashSearch: null,
      key: 'selection'
    }
  ]);

  const handleClick = () => {
    navigate("/List", { state:   {
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      latitude: autocomplete.getPlace().geometry.location.lat(),
      longitude: autocomplete.getPlace().geometry.location.lng(),
      imageUnsplashSearch: autocomplete.getPlace().name,
      name: autocomplete.getPlace().name + ' Trips',
      key: 'selection'
    } });
  };

 

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const name = autocomplete.getPlace().name;
    
  
    console.log(lat)
    console.log(lng)
    console.log(name)
    console.log(autocomplete.getPlace())
  };

  return (
    <div className="header">
        <h1 className="headerTitle"> Discover Your Next Adventure <br></br> ITTU </h1>
        <div className="headerSearch">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
          options={{
    componentRestrictions: { country: 'id' },
    fields: ['address_components', 'geometry', 'icon', 'name'],
    types: ['(regions)'],
  }}
        >
          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faMapMarkerAlt} className='headerIcon' />
            <input type="text" placeholder="Destination" className='headerSearchInput' />
          </div>
          </Autocomplete>
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