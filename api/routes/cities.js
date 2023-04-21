import express  from "express";
import { UpdateCity, createCity, deleteCity } from "../controllers/city.js";

const router = express.Router();

//CREATE
router.post("/:countryid" ,createCity);

//UPDATE
router.put("/:id", UpdateCity);

//DELETE
router.delete("/:id/:countryid", deleteCity);



export default router;