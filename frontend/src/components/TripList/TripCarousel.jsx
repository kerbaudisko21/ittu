import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import TripList from './TripList';
import './tripCarousel.css';
import useFetch from '../../hooks/useFetch';

const TripCarousel = () => {
  let userDetails = JSON.parse(localStorage.getItem('user'));
  console.log(userDetails);

  const { data, loading } = useFetch(`/itinerary/user/${userDetails._id}`);

  console.log(data);
  console.log(loading);

  if (data.length == 0) return <h1>SABAR ANJING MASIH LOADING</h1>;

  return (
    <div className="trip-list">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="trip-carousel"
        slidesPerView={4}
        gap={3}
        // autoHeight={true}
        spaceBetween={50}
        // breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 10 } }}
      >
        {loading
          ? 'loading'
          : data != ''
          ? data.map((value, index) => {
              return (
                <SwiperSlide key={value._id}>
                  {console.log(value)}
                  <TripList tripDet={value} />
                  {console.log(value)}
                </SwiperSlide>
              );
            })
          : 'You dont have any itinerary'}
      </Swiper>
    </div>
  );
};

export default TripCarousel;
