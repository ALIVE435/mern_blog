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
                photoUrl:req.body.photoUrl,
                password:req.body.password,
            }
        },{new:true});
        const {password,...rest} = updatedUser._doc;
        return res.status(200).json(rest);
    }catch(err){
        console.log(err)
        next(errorHandler(440, err.message));
        //next({err.statusCode:500,});
    }
};

const deleteUser = async(req,res,next)=>{
    if(req.user.id!= req.params.userId){
        return next(errorHandler(403,"You aren't allowed to delete this user"))
    }
    try{
        const result = await User.findByIdAndDelete(req.params.userId)
        //console.log(result)
        res.status(200).json("User has been deleted")
    }catch(err){
        console.log(err)
        next(err);
    }
}
export {test,updateUser,deleteUser};