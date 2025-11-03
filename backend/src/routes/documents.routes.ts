import express, { NextFunction } from "express";
import {
  getDocumentById,
  getDocuments,
  handleDocumentDownload,
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

documentRouter.get("/download/:id", handleDocumentDownload)
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

