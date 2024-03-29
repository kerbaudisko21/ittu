import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import TripList from './TripList';
import './tripCarousel.css';
import useFetch from '../../hooks/useFetch';

const TripCarousel = () => {
  let userDetails = JSON.parse(localStorage.getItem('user'));

  const { data, loading } = useFetch(`/itinerary/user/${userDetails._id}`);

  if (data.length == 0) return <h1>No Data Trip</h1>;
  return (
    <div className="trip-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="trip-carousel"
        slidesPerView={1}
        gap={3}
        // autoHeight={true}
        spaceBetween={50}
        // breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 10 } }}
        breakpoints={{
          // when window width is >= 0px

          // when window width is >= 766px
          766: {
            // width: 768,
            slidesPerView: data.length < 4 ? data.length : 4,
          },
        }}
      >
        {loading
          ? 'loading'
          : data != ''
          ? data.map((value, index) => {
              return (
                <SwiperSlide key={value._id}>
                  <TripList tripDet={value} />
                </SwiperSlide>
              );
            })
          : 'You dont have any itinerary'}
      </Swiper>
    </div>
  );
};

export default TripCarousel;
