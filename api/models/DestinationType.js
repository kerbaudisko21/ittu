import mongoose from 'mongoose'

const DestinationTypeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps: true});

export default mongoose.model("DestinationType", DestinationTypeSchema);
