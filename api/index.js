import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js"
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import cookieParser from "cookie-parser"
import path from 'path'

const __dirname = path.resolve();

const app=express();
const port=3300;
dotenv.config();
app.use(express.json())    //parse json into object
app.use(cookieParser())  //parse cookie


//console.log(process.env.MONGO_url)
mongoose.connect(process.env.MONGO_url)
.then(()=>{console.log("mongodb connected")})
.catch((err)=>{console.log(err)});

app.use('/api/user',userRoute); //middleware with custom route, runs only for request starting with /api/user
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute)

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use((err,req,res,next)=>{     //error handling middleware: if any of the req handler throws error, the control reaches here
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`)
})