import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import TripList from "./TripList";
import "./tripCarousel.css";

const TripCarousel = () => {
  return (
    <div className="trip-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="trip-carousel"
        slidesPerView={4}
        // gap={3}
        // autoHeight={true}
        // spaceBetween={500}
        // breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 10 } }}
      >
        <SwiperSlide>
          <TripList></TripList>
        </SwiperSlide>
        <SwiperSlide>
          <TripList></TripList>
        </SwiperSlide>
        <SwiperSlide>
          <TripList></TripList>
        </SwiperSlide>
        <SwiperSlide>
          <TripList></TripList>
        </SwiperSlide>
        <SwiperSlide>
          <TripList></TripList>
        </SwiperSlide>
      </Swiper>
      {/* <TripList></TripList> */}
    </div>
  );
};

export default TripCarousel;
