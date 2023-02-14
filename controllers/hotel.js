import Hotel from "../models/Hotels.js"
import Rooms from "../models/Rooms.js"


export const createHotel = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const newHotel = new Hotel(req.body)
try{
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
}catch(err){
    next(err)
}
}

export const updateHotel = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        try{
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
            res.status(200).json(updatedHotel)
        }catch(err){
            next(err);
        }
}

export const deleteHotel = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        await Hotel.findByIdAndDelete(req.params.id)
         res.status(200).json("Hotel Deleted Succesfully")
     }catch(err){
         next(err);
     }
}

export const getHotel = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    }catch(err){
       next(err);
    }
}

export const getAllHotel = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try{
        const getAllHotel = await Hotel.find(req.query)
        res.status(200).json(getAllHotel)
    }catch(err){
        next(err);
    }
}



export const countByCity = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const cities = req.query.cities.split(",")

    try{
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err);
    }
}

export const countByType = async(req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})  
        
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
            ])
    }catch(err){
        next(err);
    }
}


export const getHotelRooms = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Rooms.findById(room)
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}