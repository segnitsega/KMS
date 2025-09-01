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
    const { title, description, pages, category } = req.body;

    const file = req.file;
    if (!file) throw new ApiError(400, "No file uploaded");

    // var documentUrl = "";
    // const isDevelopment = process.env.STORAGE === "development";

    // if (isDevelopment) {
    //   const publicId = `document_${Date.now()}_${Math.round(
    //     Math.random() * 1e6
    //   )}`;

    //   const uploadResult = await uploadToCloudinary(file.buffer, publicId);
    //   documentUrl = uploadResult.secure_url;
    // } else {
    //   const uploadDir = path.join(__dirname, "../../uploads");
    //   if (!fs.existsSync(uploadDir)) {
    //     fs.mkdirSync(uploadDir, { recursive: true });
    //   }
    //   const filePath = path.join(
    //     uploadDir,
    //     `${Date.now()}-${file.originalname}`
    //   );
    //   await fs.promises.writeFile(filePath, file.buffer);
    //   documentUrl = `/uploads/${path.basename(filePath)}`;
    // }

    const uploadedDocuments = path.join(__dirname, "../../uploaded-documents");
    if (!fs.existsSync(uploadedDocuments)) {
      fs.mkdirSync(uploadedDocuments, { recursive: true });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadedDocuments, fileName);
    await fs.promises.writeFile(filePath, file.buffer);
    const documentUrl = `/uploaded-documents/${fileName}`;

    if (documentUrl === "") throw new ApiError(500, "Error uploading document");

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
    if (!newDocument) {
      throw new ApiError(400, "Error uploading documenting");
    }

    res.status(201).json({
      success: true,
      newDocument,
    });
  }
);

export const handleDocumentSearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    console.log(query);
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const results = await prisma.document.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
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

export const handleDocumentDownload = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const contentTypes: {[key: string]: string } = {
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".txt": "text/plain",
      ".xls": "application/vnd.ms-excel",
      ".xlsx":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".ppt": "application/vnd.ms-powerpoint",
      ".pptx":
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".zip": "application/zip",
      ".rar": "application/x-rar-compressed",
    };

    const document = await prisma.document.findUnique({
      where: { id },
    });
    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    const fileExtension = path.extname(document.documentUrl).toLowerCase();

    const contentType = contentTypes[fileExtension] || "application/octet-stream";

    const fileName = path.basename(document.documentUrl);
    const filePath = path.join(__dirname, "../../uploaded-documents", fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log("Doccument does not exist");

      throw new ApiError(404, "File not found on server");
    }

    console.log("Doccument exists");
    // Increment download count
    await prisma.document.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${document.title}${fileExtension}"`
    );
    res.setHeader("Content-Type", contentType);

    // Set appropriate headers for file download
    // res.setHeader("Content-Disposition", `attachment; filename="${document.title}.pdf"`)
    // res.setHeader("Content-Type", "application/pdf") 

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
);
