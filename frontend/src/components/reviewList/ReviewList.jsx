import React from "react";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "./reviewList.css";
import "swiper/css";
import "swiper/css/free-mode";

const ReviewList = () => {
  return (
    <div className="review-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="review-carousel"
        slidesPerView={2}
        // spaceBetween={500}
        // breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 10 } }}
      >
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
        <SwiperSlide>
          <Review></Review>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewList;
