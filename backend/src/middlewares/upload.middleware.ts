import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

const allowedMimeTypes = [
  "application/pdf",
  // "application/jpeg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only document formats are allowed!"));
  }
};

export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {fileSize: 20 * 1024 * 1024}
})

