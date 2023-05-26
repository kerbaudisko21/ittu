import mongoose, { mongo } from 'mongoose';

const ItinerarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    tripLocation:{
      type: String,
    },
    tripBgImage:{
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    latitude: {
      type: String,
    },
    longtitude: {
      type: String,
    },
    itinerary_days: {
      type: JSON,
    },
    rating: {
      type: JSON,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Itinerary', ItinerarySchema);
