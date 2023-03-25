import mongoose, { mongo } from 'mongoose'

const ItinerarySchema = new mongoose.Schema({
    country:{
        type:[String]
    },
    destination:{
        type:[String]
    },
    budget:{
        type:Number,
        required:true
    },
    review:{
        type:[String]
    }
});

export default mongoose.model("Itinerary", ItinerarySchema);
