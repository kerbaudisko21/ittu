import express  from "express";
import { createDestinationType } from "../controllers/destinationType.js";

const router = express.Router();

//CREATE
router.post("/" ,createDestinationType);

export default router;