import express from 'express';
import {test ,updateUser,deleteUser,signout} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test',test)
router.put("/update/:userId",verifyUser,updateUser); //verifyUser is a middleware before request handler,updateUser
router.delete("/delete/:userId",verifyUser,deleteUser);
router.post("/signout",signout);

export default router;