import User from '../models/user.models.js'
import bcryptjs from "bcryptjs"

const signup=async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        return res.status(400).send("all field are required");
    }
    const hashedPassword=bcryptjs.hashSync(password,10);

    const newUser=new User({
        username,
        email,
        password:hashedPassword
    })
    try{
        const result=await newUser.save();
        console.log(result)
        res.json("user created")
    }
    catch(err){
        console.log(err)
        return res.json({msg:"err occured"})
    }
}

export default signup;