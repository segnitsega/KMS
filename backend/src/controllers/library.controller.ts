import prisma from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../middlewares/cloudinary";
import path from "path";
import * as fs from "fs";
import { ApiError } from "../utils/api-error-class";

interface bookInterface extends Request {
  file?: Express.Multer.File;
}

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;

  let whereClause = {};

  if (search && typeof search === "string" && search.trim() !== "") {
    const searchTerm = search.trim();
    whereClause = {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { author: { contains: searchTerm, mode: "insensitive" } },
        { genre: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
    };
  }

  const books = await prisma.book.findMany({
    where: whereClause,
  });

  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});

export const addBook = catchAsync(async (req: bookInterface, res: Response) => {
  const { title, author, genre, description } = req.body;
  const book = req.file;
  if (!book) throw new ApiError(400, "No book uploaded");

  // var bookUrl = "";
  // const isDevelopment = process.env.STORAGE === "development";

  // if (isDevelopment) {
  //   const publicId = `document_${Date.now()}_${Math.round(
  //     Math.random() * 1e6
  //   )}`;
  //   const uploadResult = await uploadToCloudinary(book.buffer, publicId);
  //   bookUrl = uploadResult.secure_url;
  // } else {
  //   const uploadDir = path.join(__dirname, "../../uploads");
  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir, { recursive: true });
  //   }
  //   const filePath = path.join(uploadDir, `${Date.now()}-${book.originalname}`);
  //   await fs.promises.writeFile(filePath, book.buffer);
  //   bookUrl = `/uploads/${path.basename(filePath)}`;
  // }

  const uploadedBooks = path.join(__dirname, "../../uploaded-books");
  if (!fs.existsSync(uploadedBooks)) {
    fs.mkdirSync(uploadedBooks, { recursive: true });
  }
  const filePath = path.join(
    uploadedBooks,
    `${Date.now()}-${book.originalname}`
  );
  await fs.promises.writeFile(filePath, book.buffer);
  const bookUrl = `/uploaded-books/${path.basename(filePath)}`;
  if (bookUrl === "") throw new ApiError(500, "Error uploading book");

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      genre,
      description,
      bookUrl,
    },
  });

  res.status(201).json({
    status: "success",
    data: newBook,
  });
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!book) throw new ApiError(404, "Book not found.");

  res.status(200).json({
    message: "Success",
    book,
  });
});

export const getUserLibrary = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    const userBooks = await prisma.userLibrary.findMany({
      where: {
        userId,
      },
    });

    if (!userBooks) {
      return res.status(404).json({
        message: "No books found in user library.",
      });
    }

    res.status(200).json({
      message: "Success",
      userBooks,
    });
  }
);

export const addToUserLibrary = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { bookId } = req.body;

    const bookAdded = await prisma.userLibrary.create({
      data: {
        userId,
        bookId,
      },
    });

    if (!bookAdded)
      throw new ApiError(400, "Error adding book to user library");

    res.status(201).json({
      message: "Success",
      bookAdded,
    });
  }
);

export const removeBookFromUserLibrary = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { bookId } = req.body;

    if (!bookId) throw new ApiError(400, "bookId required");

    const bookRemoved = await prisma.userLibrary.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (!bookRemoved)
      throw new ApiError(400, "Error adding book to user library");

    res.status(201).json({
      message: "Success",
      bookRemoved,
    });
  }
);

export const downloadBook = catchAsync(async (req: bookInterface, res: Response) => {
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

    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new ApiError(404, "book not found");
    }

    const fileExtension = path.extname(book.bookUrl).toLowerCase();

    const contentType = contentTypes[fileExtension] || "application/octet-stream";

    const fileName = path.basename(book.bookUrl);
    const filePath = path.join(__dirname, "../../uploaded-books", fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new ApiError(404, "File not found on server");
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title}${fileExtension}"`
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