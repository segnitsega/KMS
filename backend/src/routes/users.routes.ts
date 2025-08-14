import express from "express"
import { getUserById, getUsers, handleLogin, handleSignup, handleUserSearch } from "../controllers/users.controller"
// import { validateSignupData } from "../middlewares/validation.middleware"

export const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/search', handleUserSearch)
userRouter.post('/signup', handleSignup)
userRouter.post('/login', handleLogin)
userRouter.get('/:id', getUserById)
