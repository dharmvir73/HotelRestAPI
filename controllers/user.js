import Users from "../models/Users.js"


export const updateUser = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted Succesfully")
     }catch(err){
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const getUser = await Users.findById(req.params.id)
        res.status(200).json(getUser)
    }catch(err){
       next(err);
    }
}

export const getAllUser = async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const getAllUsers = await Users.find(req.params.id)
        res.status(200).json(getAllUsers)
    }catch(err){
        next(err);
    }
}