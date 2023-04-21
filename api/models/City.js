import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    city:{
        type:String,
        required:true,
        unique:true
    },
    destination:{
        type:[String]
    }
},{timestamps: true});

export default mongoose.model("City", CitySchema);