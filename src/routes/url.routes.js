import { Router } from 'express'
import {verifyUser} from '../middlewares/auth.middleware.js'
import {
    createShortCode,
    redirect
    
} from '../controllers/url.controller.js'

const router = Router()

router.route("/short").post(verifyUser, createShortCode)
router.route("/:code").post(redirect)

export default router