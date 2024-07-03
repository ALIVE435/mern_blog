import User from '../models/user.models.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";
import { passwordSchema } from '../models/user.models.js';

export const signup = async (req, res, next) => {
    //console.log(req.body)
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "all fields are required"));
        return;
    }
    const validatePassword = passwordSchema.safeParse(password);
    if(!validatePassword.success) return next(errorHandler(411,validatePassword.error.issues[0].message));
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        const result = await newUser.save();
        return res.status(200).json("user created")
    }
    catch (err) {
        return next(errorHandler(440, err.message));
        //return res.status(400).json({msg:"err occured"})
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const validateUser = await User.findOne({ email });
        if (!validateUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validatePassword = bcryptjs.compareSync(password, validateUser.password);
        if (!validatePassword) return next(errorHandler(404, 'Invalid password'));

        
        const { password: leftout, ...rest } = validateUser._doc;
        const token = jwt.sign({ id: validateUser._id,isAdmin:validateUser.isAdmin}, process.env.JWT_SECRET,);
        return res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (err) {
        return next(errorHandler(500, "Internal Server Error"))
    }
}

export const googleAuth = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const validateUser = await User.findOne({ email });
        if (!validateUser) {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email: email,
                password: hashedPassword,
                photoUrl: googlePhotoUrl,
            });
            try {
                const result = await newUser.save();
                const { password, ...rest } = result._doc;
                const token = jwt.sign({ id: result._id, isAdmin:result.isAdmin }, process.env.JWT_SECRET,);
                res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
            }
            catch (err) {
                return next(errorHandler(440, err.message));
                //return res.status(400).json({msg:"err occured"})
            }
        } else {
            const { password, ...rest } = validateUser._doc;
            const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET,);
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
    } catch (err) {
        console.log(err)
        return next(errorHandler(500, "Internal Server Error"))
    }
}