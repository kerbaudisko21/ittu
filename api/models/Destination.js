import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:[String]
    },
    images:{
        type:[String]
    },
    description:{
        type:String,
    },
    rating:{
        type:[String]
    },
    location:{
        type:Point,
        coordinates:[latitude, longitude]
    }
},{timestamps: true});

export default mongoose.model("Country", CountrySchema);