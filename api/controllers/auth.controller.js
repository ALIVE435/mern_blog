import User from '../models/user.models.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";

export const signup=async (req,res,next)=>{
    //console.log(req.body)
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        next(errorHandler(400,"all fields are required"));
        return;
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({
        username,
        email,
        password:hashedPassword
    })
    try{
        const result=await newUser.save();
        res.status(200).json("user created")
    }
    catch(err){
        next(errorHandler(440,err.message));
        //return res.status(400).json({msg:"err occured"})
    }
}

export const signin = async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    try{
        const validateUser =await User.findOne({email});
        if(!validateUser){
            return next(errorHandler(404,"User not found"));
        }
        const validatePassword=bcryptjs.compareSync(password,validateUser.password);
        if(!validatePassword) return next(errorHandler(404,'Invalid password'));

        const {password:leftout, ...rest}=validateUser._doc;
        const token=jwt.sign({id:validateUser._id},process.env.JWT_SECRET,);
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    }catch(err){

    }
}