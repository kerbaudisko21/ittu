import React from 'react'
import FeatureList from '../../components/featureList/FeatureList'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import NewsBox from '../../components/newsBox/NewsBox'
import PlaceList from '../../components/PlaceList/PlaceList'
import ReviewList from '../../components/reviewList/ReviewList'
import TripList from '../../components/TripList/TripList'
import './home.css'


const Home = () => {
  return (
    <div>
      <div className="bgImage"> </div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">My Trip</h1>
        <TripList />
        <h1 className="homeTitle">Recommended Place</h1>
        <PlaceList />
        <h1 className="homeTitle">Feature</h1>
        <FeatureList />
        <h1 className="homeTitle">Review</h1>
        <ReviewList />
        <NewsBox />
        <br></br>
        <Footer />
      </div>
    </div>
  )
}

export default Home