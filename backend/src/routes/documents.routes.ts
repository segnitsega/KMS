import express from "express"
import { getDocumentById, getDocuments } from "../controllers/documents.controller"

export const documentRouter = express.Router()

documentRouter.get('/', getDocuments)
documentRouter.get('/:id', getDocumentById)