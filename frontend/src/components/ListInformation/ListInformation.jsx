import React from 'react';
import './ListInformation.css'


const ListInformation = ({tripName, startTripDate, endTripDate, imageUrl,setListToggle}) => {
  console.log(imageUrl)

  var btn = document.getElementById('btn')

  function leftClick() {
    setListToggle(true)
    btn.style.left = '0'
    
  }
  
  function rightClick() {
    setListToggle(false)
    btn.style.left = '110px'
  }
  
  return (
    <div style={{
      backgroundImage: `url(${imageUrl})` ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',}}>
    <div className='listInformation' >

  	<div class="form-box">
		<div class="button-box-information">
			<div id="btn"></div>
			<button type="button" class="toggle-btn"
      style={{marginLeft: '0.3rem'}}
       onClick={leftClick} >Nearby Search</button>
			<button type="button" class="toggle-btn" 
      
      onClick={rightClick}
      style={{marginRight: '1rem'}}
      >Check List</button>
		</div>
	</div>
      <div className='information'>
      <div className='informationContainer'>
        <h1 className='tripName'>{tripName}</h1>
        <hr class="tripLine"></hr>
        <p>{startTripDate.toDateString()} <i class="arrow right"></i> {endTripDate.toDateString()}</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default ListInformation