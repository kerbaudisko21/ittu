import React, { useEffect } from 'react';
import './ListInformation.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';



const ListInformation = ({tripName, startTripDate, endTripDate, imageUrl,setListToggle}) => {
  console.log(imageUrl)

  var btn = document.getElementById('btn')

  const router = useLocation();
  const[props, setProps] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

 useEffect(() => {
     if (router.pathname == '/List') {
       setProps(0);
     } else if (router.pathname == `/list/${params.userid}/${params.id}`) {
         setProps(1);
     } else {
         setProps(2)
     }
   },[])

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
    {props == 2 ? <></> 
    :
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
    }
		
	</div>
      <div className='information'>
      <div className='informationContainer'>
        <h1 className='tripName'>{tripName}</h1>
        <hr class="tripLine"></hr>
        <p>{new Date(startTripDate).toDateString()} <i class="arrow right"></i> {new Date(endTripDate).toDateString()}</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default ListInformation