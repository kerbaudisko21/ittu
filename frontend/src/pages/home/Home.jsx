import React from 'react';
import FeatureList from '../../components/featureList/FeatureList';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import NewsBox from '../../components/newsBox/NewsBox';
import PlaceList from '../../components/PlaceList/PlaceList';
import ReviewList from '../../components/reviewList/ReviewList';
import TripCarousel from '../../components/TripList/TripCarousel';
import './home.css';

const Home = () => {
  let userDetails = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  let userId = userDetails ? userDetails._id : '';

  return (
    <div>
      <div className="bgImage"> </div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        {userId ? (
          <>
            <h1 className="homeTitle">My Trips</h1>
            <TripCarousel />
          </>
        ) : (
          <></>
        )}
        {/* <h1 className="homeTitle">Recommended Places</h1>
        <PlaceList /> */}
        {/* <h1 className="homeTitle">Features</h1>
        <FeatureList /> */}
        <h1 className="homeTitle">Discover Your Next Adventure</h1>
        <ReviewList />
        {/* <NewsBox /> */}
        <br></br>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
