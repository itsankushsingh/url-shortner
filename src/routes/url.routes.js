import { Router } from 'express'
import {verifyUser} from '../middlewares/auth.middleware.js'
import {
    createShortCode
    
} from '../controllers/url.controller.js'

const router = Router()

router.route("/short").post(verifyUser, createShortCode)

export default router