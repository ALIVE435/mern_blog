import express from "express"
import { verifyUser } from "../utils/verifyUser"
const router = express.Router()

router.post('/create',verifyUser,create);

export default router;