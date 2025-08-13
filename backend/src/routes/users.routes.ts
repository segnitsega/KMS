import express from "express"
import { getUserById, getUsers, handleLogin, handleRefreshToken, handleSignup, handleUserSearch } from "../controllers/users.controller"
// import { validateSignupData } from "../middlewares/validation.middleware"

export const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.get('/search', handleUserSearch)
userRouter.post('/signup', handleSignup)
userRouter.post('/login', handleLogin)
userRouter.get('/refresh-token', handleRefreshToken)