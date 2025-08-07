import express from "express"
import { getDocumentById, getDocuments, handleDocumentUpload } from "../controllers/documents.controller"
import upload from '../middlewares/upload.middleware';
import { verifyToken } from "../middlewares/auth.middleware";
import { handleValidationErrors, validateDocumentData } from "../middlewares/validation.middleware";

export const documentRouter = express.Router()

documentRouter.use(verifyToken)
documentRouter.get('/', getDocuments)
documentRouter.get('/:id', getDocumentById)
documentRouter.post('/upload', validateDocumentData, handleValidationErrors ,upload.single("file") , handleDocumentUpload)