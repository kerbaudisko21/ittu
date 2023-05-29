import React, { useEffect } from 'react';
import Review from './Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import './reviewList.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { getAllItinerary } from '../../Features/Itinerary/ItinerarySlice';
import { useDispatch, useSelector } from 'react-redux';

const ReviewList = () => {
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itinerary?.list);
  useEffect(() => {
    dispatch(getAllItinerary());
  }, []);

  return (
    <div className="review-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="review-carousel"
        slidesPerView={5}
        slidesOffsetBefore={200}
        slidesOffsetAfter={100}
        // centeredSlides={true}
        // width={}

        // autoHeight={true}
        spaceBetween={69}
        // breakpoints={{ 0: { slidesPerView: 3, spaceBetween: 10 } }}
      >
        {itinerary.map((value, index) => {
          return (
            <SwiperSlide className="swiperSlide">
              <Review itineraryDet={value}></Review>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <Review></Review> */}
    </div>
  );
};

export default ReviewList;
