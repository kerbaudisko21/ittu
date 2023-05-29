import React, { useContext, useState } from 'react';
import './review.css';
import ProfileImage from '../../Image/Homepage/Tokyo2.png';
import CountryImage from '../../Image/Homepage/Tokyo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { toggleRating } from '../../Features/Itinerary/ItinerarySlice';

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
  const dayLength = dateDiffInDays(props?.itineraryDet?.start_date, props?.itineraryDet?.end_date) + 1;

  // console.log(user, props.itineraryDet);

  if (props?.filterLike === 'Liked' && !rating) return;
  if (props?.filterLike === 'Not Like' && rating) return;

  return (
    <div className="review">
      <div className="review-box">
        <div className="reviewTitle">
          <p>{props?.itineraryDet?.title}</p>
        </div>

        <div className="content">
          <div
            className="country"
            style={{
              backgroundImage: `url(${props?.itineraryDet?.tripBgImage})`,
              // zIndex: 0,
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
            {console.log(props.itineraryDet)}
            <img className="circle-img" src={`http://localhost:8800/userProfile/${props?.itineraryDet?.userProfileImage}`} alt="test" />
            <p>{props?.itineraryDet?.username}</p>
          </div>
          <div className="rating">
            <p>{ratingCounter}</p>

            {rating ? (
              // user?.userItinerary.includes(props.itineraryDet._id)
              <AiFillStar
                onClick={() => {
                  dispatch(toggleRating(false, props.itineraryDet._id));
                  console.log('clicked', user._id, props.itineraryDet);
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
                  console.log('clicked', user._id, props.itineraryDet);
                  setRatingCounter(ratingCounter + 1);
                  setRating(!rating);
                }}
                className="star"
              />
            )}

            {/* 
            <i className="fa-solid fa-star" key={'5'}></i>
            {possibleRates.map((rate) => (rate > selectedRate ? '' : <i key={rate} className={'fas fa-star'}></i>))} */}
          </div>
        </div>
        {/* <div className="comment">
          <h2>
            "<br></br>Using a travel itinerary website for Tokyo was a game-changer. User-friendly, budget-friendly, and stress-free.<br></br>"
          </h2>
        </div> */}
      </div>
    </div>
  );
};

export default Review;

// https://github.com/nodejs/node-gyp/tree/main/docs for stars npm i node-sass //update visual studio (bukan vscode ya p*k)
