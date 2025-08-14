
// import { isDevelopment } from '../utils/env';
// import path from 'path';
// import cloudinary from './cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

const allowedMimeTypes = [
  "application/pdf",
  "application/jpeg",
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
  limits: {fileSize: 10 * 1024 * 1024}
})

// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'kms-documents',
//     public_id: (req: any, file: any) => file.originalname.name
//   } as any,
// });

// const localStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const storage = isDevelopment ? cloudinaryStorage : localStorage;

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, 
 
// });

// export default upload;
