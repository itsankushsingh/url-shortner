import { Router } from 'express'
import {verifyUser} from '../middlewares/auth.middleware.js'
import {
    changePassword,
    loginUser,
    logoutUser,
    registerUser,
    
 } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyUser,logoutUser)
router.route("/change-password").post(verifyUser,changePassword)


export default router