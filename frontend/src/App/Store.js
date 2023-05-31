import { configureStore } from '@reduxjs/toolkit';
import ItineraryReducer from '../Features/Itinerary/ItinerarySlice';

export const Store = configureStore({
  reducer: {
    itinerary: ItineraryReducer,
  },
});
