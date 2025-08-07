import express from "express"
import { handleLogin, handleSignup } from "../controllers/users.controller"
// import { validateSignupData } from "../middlewares/validation.middleware"

export const userRouter = express.Router()

userRouter.post('/signup', handleSignup)
userRouter.post('/login', handleLogin)