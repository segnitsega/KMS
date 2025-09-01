import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { getSubmittedTasks, getTaskById, getTasks, getUserTasks, handleSubmitTask, getTaskSubmission, updateTask } from "../controllers/task.controller"
import { memoryUpload } from "../middlewares/upload.middleware"

export const taskRouter = express.Router()

taskRouter.use(verifyToken)
taskRouter.get("/", getTasks)
taskRouter.get("/user", getUserTasks)
taskRouter.post("/submit/:id", memoryUpload.single("file") ,handleSubmitTask)
taskRouter.get("/submit", getSubmittedTasks)
taskRouter.get("/submit/:id", getTaskSubmission)
taskRouter.get("/:id", getTaskById)
taskRouter.put("/:id", updateTask)
