import React from 'react'
import {Grid} from '@material-ui/core';
import { PlaceDetails } from '../PlaceDetails/PlaceDetails';

const PlaceMap = () => {

    const places = [
        { name : 'Cool Place 1'},
        { name : 'Cool Place 2'},
        { name : 'Cool Place 3'},
        { name : 'Cool Place 4'},
    ]
    
  return (
    <div>
              <Grid container spacing={2} >
              {places?.map((place, i) => (
                <Grid key={i} item xs={12}>
                 <PlaceDetails place={place} />
                </Grid>
              ))}
            </Grid>
    </div>
  )
}

export default PlaceMap