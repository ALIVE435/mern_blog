import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app=express();
const port=3000;
dotenv.config();

//console.log(process.env.MONGO_url)
mongoose.connect(process.env.MONGO_url)
.then(()=>{console.log("mongodb connected")})
.catch((err)=>{console.log(err)});






app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`)
})