import prisma from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});

export const addBook = catchAsync(async (req: Request, res: Response) => {
  const { title, author, genre, description } = req.body;

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      genre,
      description,
    },
  });

  res.status(201).json({
    status: "success",
    data: newBook,
  });
});
