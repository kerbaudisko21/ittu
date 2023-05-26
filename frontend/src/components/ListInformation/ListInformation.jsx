import React from 'react';
import './ListInformation.css'


const ListInformation = ({tripName, startTripDate, endTripDate, imageUrl}) => {
  console.log(imageUrl)

  var btn = document.getElementById('btn')

  function leftClick() {
    btn.style.left = '0'
  }
  
  function rightClick() {
    btn.style.left = '110px'
  }
  
  return (
    <div style={{
      backgroundImage: `url(${imageUrl})` ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',}}>
    <div className='listInformation' >

  	<div class="form-box">
		<div class="button-box">
			<div id="btn"></div>
			<button type="button" class="toggle-btn" onClick={leftClick} >Left</button>
			<button type="button" class="toggle-btn" onClick={rightClick}>Right</button>
		</div>
	</div>


      <div className='information'>

        <h1 className='tripName'>{tripName}</h1>
        <hr class="tripLine"></hr>
        <p>{startTripDate.toDateString()} <i class="arrow right"></i> {endTripDate.toDateString()}</p>
        </div>
    </div>
    </div>
  )
}

export default ListInformation