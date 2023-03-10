import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();
dotenv.config();


app.use(express.static("build"))

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB')
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on('diconnected',() => {
    console.log('mongoDB disconnected!');
})

mongoose.connection.on('connected',() => {
    console.log('mongoDB connected!');
})
    

//middlewares


app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use((err, req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
 })

app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something Went Wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8800, ()=> {
    connect();
    console.log('connected to backend')
});