import mongoose, { mongo } from "mongoose";

const CountrySchema = new mongoose.Schema({
    country:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:[String]
    }
},{timestamps: true});

export default mongoose.model("Country", CountrySchema);