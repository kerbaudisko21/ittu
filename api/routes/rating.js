import express from 'express';
import { createRating, deletRating } from './../controllers/rating.js';

const router = express.Router();

router.post('/:itineraryid', createRating);
router.delete('/:itineraryId/:userId', deletRating);

export default router;
