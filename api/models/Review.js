import mongoose, { mongo } from "mongoose";
import User from "./User";

const ReviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String
    },
    user:{
        type:[String]
    }
},{timestamps: true});

export default mongoose.model("Review", ReviewSchema);