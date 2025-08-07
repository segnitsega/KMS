import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import * as fs from "fs";
import { isDevelopment } from "../utils/env";
import cloudinary from "../middlewares/cloudinary";
import path from "path";

export const getDocuments = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const [documents, totalDocuments] = await Promise.all([
      prisma.document.findMany({
        skip,
        take: limit,
      }),
      prisma.document.count(),
    ]);
    if (documents.length === 0) throw new ApiError(400, "No documents found");
    res.status(200).json({
      totalDocuments: totalDocuments,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      documents: documents,
    });
  }
);

export const getDocumentById = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const document = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });
    if (!document) throw new ApiError(400, "Error finding document");
    res.status(200).json({ document: document });
  }
);

export const handleDocumentUpload = catchAsync(
  async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { firstName, lastName } = req.user;
    const { title, description, pages, category, documentVersion } = req.body;
    const file = req.file;

    if (!file) throw new ApiError(400, "No file uploaded");

    // const documentUrl = isDevelopment
    //   ? (file as any).path
    //   : `/uploads/${file.filename}`;

    if (isDevelopment) {
      const streamUpload = () => {
        return new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "kms-documents",
              public_id: path.parse(file.originalname).name,
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result as any);
            }
          );

          stream.end(file.buffer);
        });
      };

      const uploadResult = await streamUpload();
      var documentUrl = uploadResult.secure_url;
    } else {
      const filePath = path.join(
        __dirname,
        "../../uploads",
        `${Date.now()}-${file.originalname}`
      );
      await fs.promises.writeFile(filePath, file.buffer);
      var documentUrl = `/uploads/${path.basename(filePath)}`;
    }

    const documentData = {
      title,
      description,
      pages: parseInt(pages),
      author: `${firstName} ${lastName}`,
      category,
      documentUrl,
    };
    const newDocument = await prisma.document.create({
      data: documentData,
    });

    const storeDocumentVersion = await prisma.documentVersion.create({
      data: {
        version: parseFloat(documentVersion),
        documentId: newDocument.id,
        documentUrl,
      },
    });

    res.status(201).json({
      success: true,
      document: newDocument,
    });
  }
);
