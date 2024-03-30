import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js"
import authRoute from './routes/auth.route.js'

const app=express();
const port=3300;
dotenv.config();
app.use(express.json())
console.log(process.env.MONGO_url)
mongoose.connect(process.env.MONGO_url)
.then(()=>{console.log("mongodb connected")})
.catch((err)=>{console.log(err)});

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);




app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`)
})