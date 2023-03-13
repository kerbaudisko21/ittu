import React from "react";

const Review = (props) => {
  return (
    <div className="review">
      <div className="container">
        <div className="header">
          <div className="">
            <img className="circle-img" src={props.img} alt="avatar_img" />;
          </div>
        </div>
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Review;
