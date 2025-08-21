import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const getArticles = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const [articles, totalArticles] = await Promise.all([
      prisma.article.findMany({
        skip,
        take: limit,
      }),
      prisma.article.count(),
    ]);
    if (articles.length === 0) throw new ApiError(400, "No articles found");
    res.status(200).json({
      totalArticles: totalArticles,
      currentPage: page,
      totalPages: Math.ceil(totalArticles / limit),
      articles: articles,
    });
  }
);

export const getArticleById = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });
    if (!article) throw new ApiError(400, "Error finding article");
    res.status(200).json({ article: article });
  }
);

export const handleArticlePost = catchAsync(
  async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { firstName, lastName } = req.user;
    const { title, description, category } = req.body;
    const newArticle = await prisma.article.create({
        data: {
            title,
            description,
            author: `${firstName} ${lastName}`,
            category
        }
    })

    if(!newArticle) throw new ApiError(400, "Error while creating new article")

    res.status(201).json({
      success: true,
      newArticle: newArticle,
    });
  }
);

export const handleArticlesearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const results = await prisma.article.findMany({
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
      throw new ApiError(404, "No matching articles found");
    }

    res.status(200).json({
      totalResults: results.length,
      articles: results,
    });
  }
);
