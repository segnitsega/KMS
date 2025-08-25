import prisma from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../middlewares/cloudinary";
import path from "path";
import * as fs from "fs";
import { ApiError } from "../utils/api-error-class";

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});

export const addBook = catchAsync(async (req: any, res: Response) => {
  const { title, author, genre, description } = req.body;
  const book = req.book;
  if (!book) throw new ApiError(400, "No book uploaded");

  var bookUrl = "";
  const isDevelopment = process.env.STORAGE === "development";

  if (isDevelopment) {
    const publicId = `document_${Date.now()}_${Math.round(
      Math.random() * 1e6
    )}`;
    const uploadResult = await uploadToCloudinary(book.buffer, publicId);
    bookUrl = uploadResult.secure_url;
  } else {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, `${Date.now()}-${book.originalname}`);
    await fs.promises.writeFile(filePath, book.buffer);
    bookUrl = `/uploads/${path.basename(filePath)}`;
  }

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
