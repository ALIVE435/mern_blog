import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
import User, {passwordSchema} from "../models/user.models.js";


const test=(req,res)=>{
    res.json({msg:"API is working!"});
}


const updateUser =  async(req,res,next)=>{
    if(req.user.id!==req.params.userId) return next(errorHandler(403,"You aren't allowed to update details of this user"));
    if(req.body.password ){
        const validatePassword = passwordSchema.safeParse(req.body.password);
        if(!validatePassword.success) return next(errorHandler(411,validatePassword.error.issues[0].message));
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    } 
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{                                  //only update this mentioned data if required
                username:req.body.username,
                photoUrl:req.body.profilePicture,
                password:req.body.password,
            }
        },{new:true});
        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }catch(err){
        next(err);
    }
};

export {test,updateUser};