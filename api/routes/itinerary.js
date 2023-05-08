import express  from "express";
import { createItinerary, deleteItinerary, getUserItineraries, updateItinerary } from "../controllers/itinerary.js";

const router = express.Router();

//CREATE
router.post("/:userid" ,createItinerary);
router.delete("/:id/:userid" ,deleteItinerary);
router.put("/:id" ,updateItinerary);
router.get("/user/:id", getUserItineraries);

export default router;




