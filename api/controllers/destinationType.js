import DestinationType from '../models/DestinationType.js'

export const createDestinationType = async (req,res,next) => {
    const newDestinationType = new DestinationType(req.body);

    try {
        const savedDestinationType = await newDestinationType.save();
        res.status(200).json(savedDestinationType);
    } catch (error) {
        next(error);
    }
}