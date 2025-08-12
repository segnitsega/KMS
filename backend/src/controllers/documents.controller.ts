import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import * as fs from "fs";
import { uploadToCloudinary } from "../middlewares/cloudinary";
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

    var documentUrl = "";
    const isDevelopment = process.env.STORAGE === "development";

    if (isDevelopment) {
      const publicId = `document_${Date.now()}_${Math.round(
        Math.random() * 1e6
      )}`;

      const uploadResult = await uploadToCloudinary(file.buffer, publicId);
      documentUrl = uploadResult.secure_url;

      // try {
      //   const uploadResult = await new Promise<{ secure_url: string }>(
      //     (resolve, reject) => {
      //       const stream = cloudinary.uploader.upload_stream(
      //         {
      //           folder: "kms-documents",
      //           public_id: `${Date.now()}-${
      //             path.parse(file.originalname).name
      //           }`,
      //           resource_type: "auto",
      //         },
      //         (error, result) => {
      //           if (error) {
      //             console.error("Cloudinary upload error:", error);
      //             reject(new ApiError(500, "File upload failed"));
      //           }
      //           resolve(result!);
      //         }
      //       );
      //       stream.end(file.buffer);
      //     }
      //   );
      //   documentUrl = uploadResult.secure_url;
      // } catch (error) {
      //   throw new ApiError(500, "Failed to upload file to Cloudinary");
      // }
    } else {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(
        uploadDir,
        `${Date.now()}-${file.originalname}`
      );
      await fs.promises.writeFile(filePath, file.buffer);
      documentUrl = `/uploads/${path.basename(filePath)}`;
    }

    if(documentUrl === "") throw new ApiError(500, "Error uploading document")

    const documentData = {
      title,
      description,
      pages: parseInt(pages),
      author: `${firstName} ${lastName}`,
      category,
      documentUrl,
    };

    const result = await prisma.$transaction(async (prisma) => {
      const newDocument = await prisma.document.create({ data: documentData });
      const storeDocumentVersion = await prisma.documentVersion.create({
        data: {
          version: parseFloat(documentVersion),
          documentId: newDocument.id,
          documentUrl,
        },
      });
      return { newDocument, storeDocumentVersion };
    });

    res.status(201).json({
      success: true,
      document: result.newDocument,
    });
  }
);

export const handleDocumentSearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const results = await prisma.document.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { has: query } },
        ],
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    if (results.length === 0) {
      throw new ApiError(404, "No matching documents found");
    }

    res.status(200).json({
      totalResults: results.length,
      documents: results,
    });
  }
);
