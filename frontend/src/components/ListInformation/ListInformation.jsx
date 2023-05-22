import React from 'react';
import './ListInformation.css'


const ListInformation = ({tripName, startTripDate, endTripDate}) => {
  return (
    <div className='listInformation'>
      <div className='information'>
        <h1 className='tripName'>{tripName}</h1>
        <hr class="tripLine"></hr>
        <p>{startTripDate.toDateString()} <i class="arrow right"></i> {endTripDate.toDateString()}</p>
        </div>
    </div>
  )
}

export default ListInformation