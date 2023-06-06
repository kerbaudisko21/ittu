import React, { useEffect, useState } from 'react';
import Review from './Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import './reviewList.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { getAllItinerary } from '../../Features/Itinerary/ItinerarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ReviewList = () => {
  const dispatch = useDispatch();
  const [len, setLen] = useState(0);

  const itinerary = useSelector((state) => state.itinerary?.list);
  useEffect(() => {
    dispatch(getAllItinerary());
    setLen(itinerary.length < 5 ? itinerary.length : 5);
  }, []);

  if (itinerary.length == 0) return <h1>No Itinerary Trip</h1>;

  return (
    <div className="review-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="review-carousel"
        slidesPerView={itinerary.length < 5 ? itinerary.length : 5}
        // slidesOffsetBefore={200}
        // slidesOffsetAfter={100}
        // centeredSlides={true}
        // width={}

        // autoHeight={true}
        // spaceBetween={69}
        breakpoints={{
          // when window width is >= 640px
          0: {
            // width: 640,
            spaceBetween: 0,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          766: {
            // width: 768,
            slidesPerView: { len },
          },
        }}
        // breakpoints={{ 0: { slidesPerView: 3, spaceBetween: 10 } }}
      >
        {itinerary.map((value, index) => {
          return (
            <SwiperSlide className="swiperSlide">
              <div className="box">
                <Review itineraryDet={value}></Review>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <br />
      <div className="buttonToRef">
        <Link to={'/reference'}>
          <button onClick={() => {}} className="seeAllBtn">
            See All Reference Trip
          </button>
        </Link>
      </div>
      {/* <Review></Review> */}
    </div>
  );
};

export default ReviewList;
