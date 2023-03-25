import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
    },
    user:{
        type:[String]
    }
});

export default mongoose.model("Rating", RatingSchema);
