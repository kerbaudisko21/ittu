import React, { useState, useEffect, useContext } from 'react';
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
import { InputNumber } from 'primereact/inputnumber';

import { Dropdown } from 'primereact/dropdown';
import { AuthContext } from '../../context/AuthContext';

const Reference = () => {
  //   let userDetails = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  //   let userId = userDetails ? userDetails._id : '';
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itinerary?.list);

  const [day, setDay] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Not Like');
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

  useEffect(() => {
    dispatch(getAllItinerary());
  }, [selectedFilter, day]);

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

  const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    a = new Date(a);
    b = new Date(b);
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const name = autocomplete.getPlace().name;
  };

  const { user } = useContext(AuthContext);
  const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    a = new Date(a);
    b = new Date(b);
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
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
                <div className="headerSearchItem headerDest">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="headerIcon" />
                  <input type="text" placeholder="Destination" className="headerSearchInputDest" />
                </div>
              </Autocomplete>

              <div className="headerSearchItem flex-auto headerInputNumber">
                <InputNumber
                  className="inputNumberStyle"
                  value={day}
                  showButtons
                  // buttonLayout="vertical"
                  onValueChange={(e) => {
                    setDay(e.value >= 1 ? e.value : 1);
                    console.log(e.value);
                  }}
                  prefix="More than "
                  suffix=" days"
                />

                {/* <FontAwesomeIcon icon={faCalendar} className="headerIcon" /> */}
              </div>

              <div className="headerSearchItem flex-auto headerFilter">
                <Dropdown value={selectedFilter} onChange={(e) => setSelectedFilter(e.value)} options={[{ name: 'Liked' }, { name: 'Not Like' }]} optionLabel="name" showClear placeholder="Filter By" className="dropdownFilter" />
              </div>
            </div>
          </div>
        </div>
        <div className="referenceList">
          <div className="refGrid-container">
            {/* {console.log(itinerary, 'dibawah')} */}
            {itinerary.map((value, index) => {
              const dayLength = dateDiffInDays(value.start_date, value.end_date) + 1;
              console.log(dayLength);
              const rating = value?.rating?.some((i) => i.user_id?.includes(user?._id));

              // if()
              console.log(navigate, 'navigate');
              console.log(autocomplete, 'autocom');

              if (dayLength < day) return;

              if (selectedFilter?.name === 'Liked') {
                if (rating)
                  return (
                    <div className="refGrid-item" key={index}>
                      <Review itineraryDet={value} dayLength={dayLength} />
                    </div>
                  );
                return;
              } else if (selectedFilter?.name === 'Not Like') {
                if (!rating) {
                  return (
                    <div className="refGrid-item" key={index}>
                      <Review itineraryDet={value} dayLength={dayLength} />
                    </div>
                  );
                }
                return;
              }
              return (
                <div className="refGrid-item" key={index}>
                  <Review itineraryDet={value} dayLength={dayLength} />
                </div>
              );
            })}

            {console.log(selectedFilter)}
          </div>
        </div>

        <br></br>
        <Footer />
      </div>
    </div>
  );
};

export default Reference;
