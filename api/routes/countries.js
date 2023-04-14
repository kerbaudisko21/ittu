import express  from "express";
import { UpdateCountry, createCountry, deleteCountry, getCountry, getCountryCities } from "../controllers/country.js";

const router = express.Router();

//CREATE
router.post("/" ,createCountry);

//UPDATE
router.put("/:id",UpdateCountry);

//DELETE
router.delete("/:id", deleteCountry);

//GET
router.get("/find/:id", getCountry);
router.get("/city/:id", getCountryCities);

export default router;




