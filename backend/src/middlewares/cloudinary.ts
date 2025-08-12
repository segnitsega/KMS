import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PassThrough } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

export const uploadToCloudinary = (
  buffer: Buffer,
  publicId: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const passthrough = new PassThrough();
    passthrough.end(buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'kms_documents',
        public_id: publicId,
        resource_type: 'auto',
      },
      (err: unknown, result: UploadApiResponse | undefined) => {
        if (err) return reject(err);
        resolve(result!);
      }
    );

    passthrough.pipe(uploadStream);
  });
};

