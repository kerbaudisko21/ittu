import React, { useContext, useState } from 'react';
import './review.css';
import ProfileImage from '../../Image/Homepage/Tokyo2.png';
import CountryImage from '../../Image/Homepage/Tokyo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { toggleRating } from '../../Features/Itinerary/ItinerarySlice';
import { useNavigate } from 'react-router-dom';

const possibleRates = [1, 2, 3, 4, 5];

const dateDiffInDays = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  a = new Date(a);
  b = new Date(b);
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const Review = (props) => {
  const selectedRate = 5;
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [ratingCounter, setRatingCounter] = useState(props.itineraryDet?.rating?.length || 0);
  const [rating, setRating] = useState(props.itineraryDet?.rating?.some((i) => i.user_id?.includes(user?._id)));
  const dayLength = dateDiffInDays(props.itineraryDet?.start_date, props.itineraryDet?.end_date) + 1;
  const router = useNavigate();

  if (props?.filterLike === 'Liked' && !rating) return;
  if (props?.filterLike === 'Not Like' && rating) return;

  const toReference = () => {
    router(`/list/${props.itineraryDet._id}`, {
      state: {
        itineraryId: props.itineraryDet._id,
        tripBgImage: props.itineraryDet.tripBgImage,
        startDate: props.itineraryDet.start_date,
        endDate: props.itineraryDet.end_date,
        latitude: props.itineraryDet.latitude,
        longitude: props.itineraryDet.longtitude,
        tripLocation: props.itineraryDet.tripLocation,
        name: props.itineraryDet.title,
        itinerary_days: props.itineraryDet.itinerary_days.ItineraryDay,
      },
    });
  };

  return (
    <div className="review">
      <div className="review-box">
        <div className="reviewTitle">
          <h3>{props?.itineraryDet?.title}</h3>
        </div>
        <div className="content" onClick={toReference} style={{ cursor: 'pointer' }}>
          <div
            className="country"
            style={{
              backgroundImage: `url(${props?.itineraryDet?.tripBgImage})`,
              boxShadow: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
              // zIndex: 0,
              height: ' 200px',
              bordeRadius: '15px',
            }}
          >
            <div className="countryText">
              {/* <h2>Tokyo</h2>
              <p>3 days</p> */}
            </div>
          </div>
        </div>
        <div className="reviewDays">
          <p>{`${dayLength} days in ${props?.itineraryDet?.tripLocation}`}</p>
        </div>
        <div className="rate">
          <div className="profile">
            {/* <img className="circle-img profilePicture" src={`http://localhost:8800/public/userProfile/${props?.itineraryDet?.userProfileImage}`} alt="test" /> */}
            <h3>{props?.itineraryDet?.username.substring(0, 12)}</h3>
          </div>
          <div className="rating">
            <p>{ratingCounter}</p>
            {/* <div className="pi-star"></div> */}

            {rating ? (
              // user?.userItinerary.includes(props.itineraryDet._id)
              <AiFillStar
                onClick={() => {
                  dispatch(toggleRating(false, props.itineraryDet._id));
                  setRatingCounter(ratingCounter - 1);
                  setRating(!rating);
                }}
                className="star"
              />
            ) : (
              <AiOutlineStar
                onClick={() => {
                  if (!user) return alert('You need to login before rate');
                  dispatch(toggleRating(true, props.itineraryDet._id));
                  setRatingCounter(ratingCounter + 1);
                  setRating(!rating);
                }}
                className="star"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

// https://github.com/nodejs/node-gyp/tree/main/docs for stars npm i node-sass //update visual studio (bukan vscode ya p*k)
