import express, { NextFunction } from "express";
import {
  getDocumentById,
  getDocuments,
  handleDocumentSearch,
  handleDocumentUpload,
} from "../controllers/documents.controller";
import { memoryUpload } from "../middlewares/upload.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  handleValidationErrors,
  validateDocumentData,
} from "../middlewares/validation.middleware";

export const documentRouter = express.Router();

documentRouter.use(verifyToken);
documentRouter.get("/", getDocuments);
documentRouter.post(
  "/upload",
  memoryUpload.single("file"),
  validateDocumentData,
  handleValidationErrors,
  handleDocumentUpload
);
documentRouter.get("/search", handleDocumentSearch);
documentRouter.get("/:id", getDocumentById);

