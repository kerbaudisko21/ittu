import React from 'react'
import './placeList.css'
import useFetch from "../../hooks/useFetch";

const PlaceList = () => {

  const {data, loading, error} = useFetch("/countries");
  console.log(data);
  return (
    <div className="placeList">
      {loading ? 
      "Loading"  
       : 
        <>
          {data.map((data) => (
          <div className="plContainer" key={data._id}>
              <div className="plItem">
              <img
                  src="https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJhbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="plImg"
                  />
                  <span className="plCity">{data.country}</span>
              </div>
            </div> ))}
        </>
      }
    </div>

  )
}

export default PlaceList