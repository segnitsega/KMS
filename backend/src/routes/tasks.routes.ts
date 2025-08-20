import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { getTaskById, getTasks } from "../controllers/task.controller"

export const taskRouter = express.Router()

taskRouter.use(verifyToken)
taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTaskById)
