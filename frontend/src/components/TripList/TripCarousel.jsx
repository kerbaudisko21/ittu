import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import TripList from "./TripList";
import "./tripCarousel.css";
import useFetch from "../../hooks/useFetch";

const TripCarousel = () => {
  let userDetails = JSON.parse(localStorage.getItem('user'));
  console.log(userDetails);

  const {data, loading} = useFetch(`/itinerary/user/${userDetails._id}`);

  console.log(data);
  console.log(loading);

  return (
    <div className="trip-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="trip-carousel"
        slidesPerView={2}
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
      </Swiper>
      {/* <TripList></TripList> */}
    </div>
  );
};

export default TripCarousel;
