import express from 'express';
import { createItinerary, deleteItinerary, getItineraries, getUserItineraries, updateItinerary } from '../controllers/itinerary.js';

const router = express.Router();

//CREATE
router.post('/:userid', createItinerary);
router.delete('/:id/:userid', deleteItinerary);
router.put('/:id', updateItinerary);
router.get('/user/:id', getUserItineraries);
router.get('/', getItineraries);

export default router;
