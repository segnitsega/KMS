import express from "express"
import { addBook, addToUserLibrary, getBookById, getBooks, getUserLibrary } from "../controllers/library.controller"
import { memoryUpload } from "../middlewares/upload.middleware"
import { verifyToken } from "../middlewares/auth.middleware"

export const  libraryRouter = express.Router()

libraryRouter.use(verifyToken)
libraryRouter.get("/", getBooks)
libraryRouter.get("/user/:id", getUserLibrary)
libraryRouter.post("/user/:id", addToUserLibrary)
libraryRouter.post("/upload-book", memoryUpload.single("book"), addBook)
libraryRouter.get("/:id", getBookById)