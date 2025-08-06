import multer from 'multer';
import { isDevelopment } from '../utils/env';
import path from 'path';
import cloudinary from './cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kms-documents',
    public_id: (req: any, file: any) => file.originalname.split('.')[0],
  } as any,
});

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const storage = isDevelopment ? cloudinaryStorage : localStorage;

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;
