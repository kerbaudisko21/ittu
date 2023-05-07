import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';



const ListTest3 = () => {


  const [autocomplete, setAutocomplete] = useState(null);
 

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    
    console.log(lat)
    console.log(lng)
    
  };
 

  return (
   

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}
          options={{
    componentRestrictions: { country: 'id' },
  }}
        >
          <input
            type="text"
            placeholder="Input"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
              top: '2%',
            }}
          />
        </Autocomplete>


  );
};

export default React.memo(ListTest3);