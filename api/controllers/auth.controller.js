const User= require('../models/user.models.js');

const signup=async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        return res.status(400).send("all field are required");
    }
    const newUser=new User({
        username,
        email,
        password,
    })
    try{
        await newUser.save();
    }
    catch{
        return res.json({msg:"err occured"})
    }
}

module.exports=signup;