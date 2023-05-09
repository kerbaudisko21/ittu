import Country from '../models/Country.js'
import City from '../models/City.js'

export const createCountry = async(req,res,next) => {
    const newCountry = new Country(req.body);

    try {
        const savedCountry = await newCountry.save();
        res.status(200).json(savedCountry);
    } catch (err) {
        next(err);
    }

}

export const UpdateCountry = async(req,res,next) =>{

    try {
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true});
        res.status(200).json(updatedCountry);
    } catch (err) {
        next(err);
    }
}

export const deleteCountry = async(req,res,next) =>{
    try {
        await Country.findByIdAndDelete(req.params.id);
        res.status(200).json("Country has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getCountry = async(req,res,next) =>{
    try {
        const country = await Country.findById(req.params.id);
        res.status(200).json(country);
    } catch (err) {
        next(err);
    }
}

export const getCountries = async(req,res) =>{
    const countries = await Country.find({}).sort({createdAt: -1})

    res.status(200).json(countries);
}

export const getCountryCities = async (req,res,next)=>{
    try {
        const country = await Country.findById(req.params.id)
        const list = await Promise.all(country.city.map(city=>{
            return City.findById(city)
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}