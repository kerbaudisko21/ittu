import React from 'react';
import Review from './Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import './reviewList.css';
import 'swiper/css';
import 'swiper/css/free-mode';

const ReviewList = () => {
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
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <Review></Review>
        </SwiperSlide>
      </Swiper>
      {/* <Review></Review> */}
    </div>
  );
};

export default ReviewList;
