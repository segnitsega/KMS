import express, { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/prisma";
import { verifyToken } from "../middlewares/auth.middleware";

export const statusRoute = express.Router();

statusRoute.get(
  "/",
  verifyToken,
  catchAsync(async (req: Request, res: Response) => {
    const [users, documents, articles, discussions] = await Promise.all([
      prisma.user.count(),
      prisma.document.count(),
      prisma.article.count(),
      prisma.discussion.count(),
    ]);

    res.status(200).json({
      users,
      documents,
      articles,
      discussions,
    });
  })
);
