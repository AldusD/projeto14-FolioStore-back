import { Router } from "express";
import * as auth from "../controllers/auth.controller.js"
import { signInMiddleware, signUpMiddleware } from "../middlewares/auth.middleware.js";


const router = Router()

router.post('/signin', signInMiddleware, auth.signIn)
router.post('/signup', signUpMiddleware, auth.signUp)

export default router