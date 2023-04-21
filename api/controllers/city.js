import Country from '../models/Country.js'
import City from '../models/City.js'

export const createCity = async (req,res,next) => {
    const countryId = req.params.countryid;
    const newCity = new City(req.body);

    try {
        const savedCity = await newCity.save();
        try {
            await Country.findByIdAndUpdate(countryId,{$push : {city: savedCity._id}});
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedCity)
    } catch (err) {
        next(err)
    }
}

export const UpdateCity = async(req,res,next) =>{

    try {
        const updatedCity = await City.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true})
        res.status(200).json(updatedCity);
    } catch (err) {
        next(err)
    }
}

export const deleteCity = async(req,res,next) =>{
    const countryId = req.params.countryid;
    try {
        await Country.findByIdAndDelete(req.params.id)
        try {
            await Country.findByIdAndUpdate(countryId,{$pull : {city: req.params.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json("City has been deleted")
    } catch (err) {
        next(err)
    }
}