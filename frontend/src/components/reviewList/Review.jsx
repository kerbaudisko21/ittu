import React from "react";
import "./review.css";
import ProfileImage from "../../Image/Homepage/Tokyo 2.png";
import CountryImage from "../../Image/Homepage/Tokyo 2.png";

const Review = (props) => {
  return (
    <div className="review">
      <div className="review-box">
        <div className="rate">
          <div className="profile">
            <img className="circle-img" src={ProfileImage} alt="avatar_img" />
            <h3>Anna</h3>
          </div>
          <div className="rating"></div>
        </div>
        <div className="content">
          <div className="country">
            <img className="circle-img" src={CountryImage} alt="avatar_img" />
          </div>
          <div className="comment">
            <h2>
              {" "}
              "<br></br>
              Lorem ipsum dolor sit amet consectetur adipisic corporis! <br></br>"
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
