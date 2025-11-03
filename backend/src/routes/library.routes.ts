import express from "express"
import { addBook, addToUserLibrary, downloadBook, getBookById, getBooks, getUserLibrary, removeBookFromUserLibrary } from "../controllers/library.controller"
import { memoryUpload } from "../middlewares/upload.middleware"
import { verifyToken } from "../middlewares/auth.middleware"

export const  libraryRouter = express.Router()

libraryRouter.get("/download/:id", downloadBook)
libraryRouter.use(verifyToken)
libraryRouter.get("/", getBooks)
libraryRouter.get("/user/:id", getUserLibrary)
libraryRouter.delete("/user/:id", removeBookFromUserLibrary)
libraryRouter.post("/user/:id", addToUserLibrary)
libraryRouter.post("/upload-book", memoryUpload.single("book"), addBook)
libraryRouter.get("/:id", getBookById)
