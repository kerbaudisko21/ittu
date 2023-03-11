import React from 'react'
import './newsBox.css'
import img from '../../Image/Homepage/Travel.png'

const NewsBox = () => {
  return (
        <div className="cardContainer">
            <div className="cardDesc">
                <h1 className="title"> Sign Up For News</h1>
                <span className="desc">Sign up for our newsletter and<br></br> 
                never miss out on the latest travel<br></br>news, destination guides, 
                insider<br></br>tips, and exclusive content to fuel<br></br>your wanderlust.
                </span>
                <br></br>
                <input type="email" name="email" className='email' placeholder='Email@gmail.com'/>
            </div>
            <div className="cardImg">
                <img src={img} alt="" />
            </div>
        </div>
  )
}

export default NewsBox