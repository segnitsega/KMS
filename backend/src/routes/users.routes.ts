import express from "express"
import { getUserById, getUsers, handleLogin, handleProfileUpdate, handleSignup, handleUserSearch } from "../controllers/users.controller"
import { verifyToken } from "../middlewares/auth.middleware"
// import { validateSignupData } from "../middlewares/validation.middleware"

export const userRouter = express.Router()

userRouter.post('/signup', handleSignup)
userRouter.post('/login', handleLogin)

userRouter.use(verifyToken);
userRouter.get('/', getUsers)
userRouter.get('/search', handleUserSearch)
userRouter.post('/update-profile', handleProfileUpdate)
userRouter.get('/:id', getUserById)
