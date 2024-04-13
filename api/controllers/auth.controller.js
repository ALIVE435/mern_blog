import User from '../models/user.models.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';

const signup=async (req,res,next)=>{
    console.log(req.body)
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        next(errorHandler(400,"all field are required"));
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

export default signup;