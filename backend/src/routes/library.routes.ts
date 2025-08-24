import express from "express"
import { addBook, getBooks } from "../controllers/library.controller"

export const  libraryRouter = express.Router()

libraryRouter.get("/", getBooks)
libraryRouter.post("/", addBook)
