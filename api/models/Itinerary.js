import mongoose, { mongo } from 'mongoose'

const ItinerarySchema = new mongoose.Schema({
    title:{
        type:String,
    },
    start_date:{
        type:Date
    },
    end_date:{
        type:Date
    },
    latitude:{
        type:String
    },
    longtitude:{
        type:String
    },
    itinerary_days:[{
        date:Date,
        destination:[{
            name:{type:String},
            lat:{type:String},
            long:{type:String}
        }]
    }],
},{timestamps: true});

export default mongoose.model("Itinerary", ItinerarySchema);
