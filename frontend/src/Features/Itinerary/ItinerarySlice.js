import { createSlice } from '@reduxjs/toolkit';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const initialState = {
  list: [],
  itinerary: {},
};

export const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.list = action.payload;
    },
    onGetDetails: (initialState, action) => {
      initialState.itinerary = action.payloads;
    },
  },
});

export const getAllItinerary = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/itinerary`);
    console.log(data);
    dispatch(onGetData(data));
  } catch (error) {
    console.log(error);
  }
};

export const toggleRating = (action, itineraryId) => async (dispatch) => {
  try {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    if (action) {
      const { data } = await axios.post(`/rating/${itineraryId}`, {
        rating: 5,
        comment: 'testRate',
        user_id: userId,
      });
    } else {
      const { data } = await axios.delete(`/rating/${itineraryId}/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const { onGetData, onGetDetails } = itinerarySlice.actions;
export default itinerarySlice.reducer;
