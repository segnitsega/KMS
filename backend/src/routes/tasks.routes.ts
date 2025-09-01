import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { getTaskById, getTasks, getUserTasks, handleSubmitTask } from "../controllers/task.controller"
import { memoryUpload } from "../middlewares/upload.middleware"

export const taskRouter = express.Router()

taskRouter.use(verifyToken)
taskRouter.get("/", getTasks)
taskRouter.get("/user", getUserTasks)
taskRouter.post("/submit", memoryUpload.single("task") ,handleSubmitTask)
taskRouter.get("/:id", getTaskById)
