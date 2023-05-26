import React from 'react';
import './ListInformation.css'


const ListInformation = ({tripName, startTripDate, endTripDate, imageUrl}) => {
  console.log(imageUrl)
  
  return (
    <div style={{
      backgroundImage: `url(${imageUrl})` ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',}}>
    <div className='listInformation' 
    >
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