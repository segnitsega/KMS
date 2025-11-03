import { catchAsync } from "../utils/catchAsync";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const getDiscussions = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const categoryQuery = query ? {category: query} : {}

    const [discussions, totalDiscussions] = await Promise.all([
      prisma.discussion.findMany({
        where: categoryQuery,
        skip,
        take: limit,
        orderBy: {
          uploadedAt: "desc",
        },
        include: {
          replies: {
            select: {
              message: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      }),
      prisma.discussion.count({
        where: categoryQuery
      }),
    ]);
    if (discussions.length === 0)
      throw new ApiError(400, "No discussions found");
    res.status(200).json({
      totalDiscussions: totalDiscussions,
      currentPage: page,
      totalPages: Math.ceil(totalDiscussions / limit),
      discussions: discussions,
    });
  }
);

export const getDiscussionById = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const discussion = await prisma.discussion.findUnique({
      where: {
        id: id,
      },
    });
    if (!discussion) throw new ApiError(400, "Error finding discussion");
    res.status(200).json({ discussion: discussion });
  }
);

export const handleDiscussionPost = catchAsync(
  async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { firstName, lastName, id } = req.user;
    const { title, description, category } = req.body;

    const newDiscussion = await prisma.discussion.create({
      data: {
        title,
        description,
        authorName: `${firstName} ${lastName}`,
        category,
        authorId: id,
      },
    });

    if (!newDiscussion)
      throw new ApiError(400, "Error while creating new discussion");

    res.status(201).json({
      success: true,
      newDiscussion: newDiscussion,
    });
  }
);

export const handleDiscussionSearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const results = await prisma.discussion.findMany({
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
      discussions: results,
    });
  }
);

export const handleDiscussionReply = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user;
    const { message, discussionId } = req.body;
    const replyCreated = await prisma.replies.create({
      data: {
        discussionId,
        userId: id,
        message,
      },
    });
    if (!replyCreated) {
      throw new ApiError(400, "Error creating reply!");
    }
    res.status(201).json({
      success: true,
      reply: replyCreated,
    });
  }
);

export const handleDiscussionLike = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const discussionId = req.params.id;
    const discussion = await prisma.discussion.findUnique({
      where: { id: discussionId },
    });
    if (!discussion) {
      throw new ApiError(404, "Discussion not found");
    }
    const updatedDiscussion = await prisma.discussion.update({
      where: { id: discussionId },
      data: { likes: { increment: 1 } },
    });
    res.status(200).json({
      success: true,
      likes: updatedDiscussion.likes,
    });
  }
);
