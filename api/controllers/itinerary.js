import Itinerary from "../models/Itinerary.js";
import User from "../models/User.js";

export const createItinerary = async (req,res,next) => {
    const userId = req.params.userid;
    const newItinerary = new Itinerary(req.body);

    try {
        const savedItinerary = await newItinerary.save();
        try {
            await User.findByIdAndUpdate(userId,{$push : {userItinerary: savedItinerary._id}});
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedItinerary);
    } catch (error) {
        next(error);
    }
}

export const updateItinerary = async(req,res,next) =>{

    try {
        const updateItinerary = await Itinerary.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true});
        res.status(200).json(updateItinerary);
    } catch (err) {
        next(err);
    }
}

export const deleteItinerary = async(req,res,next) =>{
    const userId = req.params.userid;

    try {
        await Itinerary.findByIdAndDelete(req.params.id);
        try {
            await User.findByIdAndUpdate(userId,{$pull : {userItinerary: req.params.id}});
        } catch (err) {
            next(err)
        }
        res.status(200).json("Itinerary has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getUserItineraries = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        const itinerary = await Promise.all(user.userItinerary.map(itinerary=>{
            return Itinerary.findById(itinerary);
        }));
        res.status(200).json(itinerary);
    } catch (err) {
        next(err);
    }
  }