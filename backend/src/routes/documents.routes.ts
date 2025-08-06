import express from "express"
import { getDocumentById, getDocuments, handleDocumentUpload } from "../controllers/documents.controller"
import upload from '../middlewares/upload.middleware';

export const documentRouter = express.Router()

documentRouter.get('/', getDocuments)
documentRouter.get('/:id', getDocumentById)
documentRouter.post('/upload', upload.single("file") , handleDocumentUpload)