import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import countriesRoute from './routes/countries.js';
import citiesRoute from './routes/cities.js';
import destinationTypesRoute from './routes/destinationTypes.js';
import cookieParser from 'cookie-parser';
import ItineraryRoute from './routes/itinerary.js';
import RatingRoute from './routes/rating.js';

mongoose.set('strictQuery', true);
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongo disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('mongo connecteded asu');
});

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/countries', countriesRoute);
app.use('/api/cities', citiesRoute);
app.use('/api/destinationTypes', destinationTypesRoute);
app.use('/api/itinerary', ItineraryRoute);
app.use('/api/rating', RatingRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connected to backend!');
});
