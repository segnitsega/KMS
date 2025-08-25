import express from "express"
import { addBook, getBookById, getBooks } from "../controllers/library.controller"
import { memoryUpload } from "../middlewares/upload.middleware"
import { verifyToken } from "../middlewares/auth.middleware"

export const  libraryRouter = express.Router()

libraryRouter.use(verifyToken)
libraryRouter.get("/", getBooks)
libraryRouter.post("/upload-book", memoryUpload.single("book"), addBook)
libraryRouter.get("/:id", getBookById)