import User from  './../models/Users.js';
import bcrypt from 'bcryptjs';
import { createError } from './../utils/error.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
      
        await newUser.save()
        res.status(200).send("user has been created successfully")
    }catch(err) {
        next(err);
    }
}

export const login = async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return next(createError(404,"User Not Found"))
        }
        const pass = await bcrypt.compare(req.body.password, user.password)
        if(!pass){
            return next(createError(400,"!Wrong Password"))
        }

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token", token,{ httpOnly:true }).status(200).json({...otherDetails})
       
    }catch(err){
        next(err); 
    }
}