import { Request, Response } from "express";
import { ApiError } from "../utils/api-error-class";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export const getTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const tasks = await prisma.task.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  }
);

export const getUserTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  }
);

export const getTaskById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    if (!taskId) {
      throw new ApiError(400, "Task ID is required");
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!task) {
      throw new ApiError(
        404,
        "Task not found or you don't have permission to access it"
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  }
);
