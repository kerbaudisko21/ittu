import React from 'react'
import fImg from '../../Image/Homepage/Icon 1.png'
import './featureList.css'

const FeatureList = () => {
  return (
    <>
      <div className="fl">
        <div className="fItem">
                <img
                src={fImg}
                alt=""
                className="fImg"
                />
                <span className="fCity">Trip Planner</span>
                <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
            </div>
        
          <div className="fItem">
              <img
              src={fImg}
              alt=""
              className="fImg"
              />
              <span className="fCity">Trip Planner</span>
              <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
          </div>
          <div className="fItem">
              <img
              src={fImg}
              alt=""
              className="fImg"
              />
              <span className="fCity">Trip Planner</span>
              <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
          </div>
        </div>
        <div className="fl">
        <div className="fItem">
                <img
                src={fImg}
                alt=""
                className="fImg"
                />
                <span className="fCity">Trip Planner</span>
                <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
            </div>
        
          <div className="fItem">
              <img
              src={fImg}
              alt=""
              className="fImg"
              />
              <span className="fCity">Trip Planner</span>
              <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
          </div>
          <div className="fItem">
              <img
              src={fImg}
              alt=""
              className="fImg"
              />
              <span className="fCity">Trip Planner</span>
              <span className='fDesc'>A user-friendly tool that allows users to plan their trip by adding destinations, dates, and activities.</span>
          </div>
        </div>
      </>
  )
}

export default FeatureList