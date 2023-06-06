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
  const [len, setLen] = useState(0);

  const { data, loading } = useFetch(`/itinerary/user/${userDetails._id}`);

  useEffect(() => {
    setLen(data.length < 4 ? data.length : 4);
  }, [data]);

  if (data.length == 0) return <h1>No Data Trip</h1>;
  return (
    <div className="trip-list">
      {console.log(len)}
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="trip-carousel"
        slidesPerView={data.length < 4 ? data.length : 4}
        gap={3}
        // autoHeight={true}
        spaceBetween={50}
        // breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 10 } }}
        breakpoints={{
          // when window width is >= 640px
          0: {
            // width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          766: {
            // width: 768,
            slidesPerView: 4,
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
