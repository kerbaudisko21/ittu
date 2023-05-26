import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import './reference.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import Review from '../../components/reviewList/Review';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItinerary } from '../../Features/Itinerary/ItinerarySlice';

const Reference = () => {
  //   let userDetails = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  //   let userId = userDetails ? userDetails._id : '';
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itinerary?.list);

  useEffect(() => {
    dispatch(getAllItinerary());
  }, []);

  const [openDate, setOpenDate] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const navigate = useNavigate();
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      lat: 0,
      lng: 0,
      name: null,
      key: 'selection',
    },
  ]);

  const handleClick = () => {
    navigate('/List', {
      state: {
        startDate: dates[0].startDate,
        endDate: dates[0].endDate,
        latitude: autocomplete.getPlace().geometry.location.lat(),
        longitude: autocomplete.getPlace().geometry.location.lng(),
        name: autocomplete.getPlace().name + ' Trips',
        key: 'selection',
      },
    });
  };

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const name = autocomplete.getPlace().name;
  };

  if (!itinerary.length) return <div className="load">Loading</div>;
  return (
    <div className="refParent">
      {console.log(itinerary, 'diatas')}
      <Navbar />
      <div className="refContainer">
        <div className="refHead">
          <h1 className="refTitle">Discover Your Next Adventure</h1>
          <div className="refSearch">
            <div className="refSearchCont">
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={{
                  componentRestrictions: { country: 'id' },
                  fields: ['address_components', 'geometry', 'icon', 'name'],
                  types: ['(regions)'],
                }}
              >
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="headerIcon" />
                  <input type="text" placeholder="Destination" className="headerSearchInputDest" />
                </div>
              </Autocomplete>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                <input type="text" readOnly className="headerSearchInput" placeholder="Start Date" onClick={() => setOpenDate(!openDate)} value={`${format(dates[0].startDate, 'MM/dd/yyyy')}`} />
                {openDate && (
                  <DateRange
                    className="date"
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
                      setOpenDate(false);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                <input
                  type="text"
                  placeholder="End Date"
                  disabled
                  className="headerSearchInput"
                  value={`${format(dates[0].endDate, 'MM/dd/yyyy')}`}
                  // onChange={() => {
                  //   setOpenDate(false);
                  // }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="referenceList">
          <div className="refGrid-container">
            {console.log(itinerary, 'dibawah')}
            {itinerary.map((value, index) => {
              return (
                <div className="refGrid-item" key={index}>
                  <Review itineraryDet={value} />
                </div>
              );
            })}
          </div>
        </div>

        <br></br>
        <Footer />
      </div>
    </div>
  );
};

export default Reference;
