import React, { useState } from "react";
import "./review.css";
import ProfileImage from "../../Image/Homepage/Tokyo2.png";
import CountryImage from "../../Image/Homepage/Tokyo2.png";

// import Stars from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css";
const possibleRates = [1, 2, 3, 4, 5];

const Review = () => {
  const selectedRate = 5;

  return (
    <div className="review">
      <div className="review-box">
        <div className="rate">
          <div className="profile">
            <img className="circle-img" src={ProfileImage} alt="avatar_img" />
            <h3>Anna</h3>
          </div>
          <div className="rating">{possibleRates.map((rate) => (rate > selectedRate ? "" : <i key={rate} className={"fas fa-star"}></i>))}</div>
        </div>
        <div className="content">
          <div
            className="country"
            style={{
              backgroundImage: `url(${CountryImage})`,
              // zIndex: 0,
            }}
          >
            <div className="countryText">
              <h2>Tokyo</h2>
              <p>3 days</p>
              {/* <img className="country-img" src={CountryImage} alt="avatar_img" /> */}
            </div>
          </div>
          <div className="comment">
            <h2>
              "<br></br>Using a travel itinerary website for Tokyo was a game-changer. User-friendly, budget-friendly, and stress-free.<br></br>"
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

// https://github.com/nodejs/node-gyp/tree/main/docs for stars npm i node-sass //update visual studio (bukan vscode ya p*k)
