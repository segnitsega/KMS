import { Request, Response } from "express";
import { ApiError } from "../utils/api-error-class";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/prisma";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import path from "path";
import * as fs from "fs";
import { uploadToCloudinary } from "../middlewares/cloudinary";

export const getTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        skip,
        take: limit,
        orderBy: {
          uploadedAt: "desc",
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.task.count(),
    ]);
    res.status(200).json({
      status: "success",
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
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
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            department: true,
          },
        },
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

export const handleSubmitTask = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { description } = req.body;

    const file = req.file;
    if (!file) throw new ApiError(400, "No file uploaded");

    // var taskDocumentUrl = "";
    // const isDevelopment = process.env.STORAGE === "development";

    // if (isDevelopment) {
    //   const publicId = `document_${Date.now()}_${Math.round(
    //     Math.random() * 1e6
    //   )}`;

    //   const uploadResult = await uploadToCloudinary(file.buffer, publicId);
    //   taskDocumentUrl = uploadResult.secure_url;
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
    //   taskDocumentUrl = `/uploads/${path.basename(filePath)}`;
    // }

    const uploadedTask = path.join(__dirname, "../../uploaded-tasks");
    if (!fs.existsSync(uploadedTask)) {
      fs.mkdirSync(uploadedTask, { recursive: true });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadedTask, fileName);
    await fs.promises.writeFile(filePath, file.buffer);
    const taskDocumentUrl = `/uploaded-tasks/${fileName}`;

    if (taskDocumentUrl === "")
      throw new ApiError(500, "Error uploading document");

    const [newTaskDocumentSubmitted, updatedTask] = await prisma.$transaction([
      prisma.taskSubmission.create({
        data: {
          description,
          documentUrl: taskDocumentUrl,
          taskId,
        },
      }),
      prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: "DONE" },
      }),
    ]);

    if (!newTaskDocumentSubmitted || !updatedTask) {
      throw new ApiError(500, "Error submitting task");
    }

    res.status(201).json({
      message: "Success",
      newTaskDocumentSubmitted,
      updatedTask,
    });
  }
);

export const getSubmittedTasks = catchAsync(
  async (req: Request, res: Response) => {
    const tasks = await prisma.taskSubmission.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
      include: {
        task: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    if (!tasks)
      throw new ApiError(404, "No tasks found in TaskSubmission table");
    res.status(200).json({
      tasks,
    });
  }
);

export const getTaskSubmission = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const taskId = req.params.id;

    if (!taskId) {
      throw new ApiError(400, "Task ID is required");
    }

    const submission = await prisma.taskSubmission.findFirst({
      where: {
        taskId: taskId,
      },
    });

    if (!submission) {
      throw new ApiError(404, "Submission not found for this task");
    }

    // Allow admin users to access all submissions, otherwise verify ownership
    if (userRole !== "ADMIN") {
      const task = await prisma.task.findFirst({
        where: {
          id: taskId,
          userId: userId,
        },
      });

      if (!task) {
        throw new ApiError(
          403,
          "You don't have permission to access this submission"
        );
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        submission,
      },
    });
  }
);

export const updateTask = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userRole = req.user.role;
    const taskId = req.params.id;
    const { title, description, userId, dueDate, taskStatus } = req.body;

    if (!taskId) {
      throw new ApiError(400, "Task ID is required");
    }
    if (userRole !== "ADMIN") {
      throw new ApiError(403, "Only admins can update tasks");
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(userId && { userId }),
        ...(dueDate && { dueDate }),
        ...(taskStatus && { taskStatus }),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        task: updatedTask,
      },
    });
  }
);


export const handleTaskDocumentDownload = catchAsync(
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

    const task = await prisma.taskSubmission.findUnique({
      where: { id },
      include: {
        task: true
      },
    });
    if (!task) {
      throw new ApiError(404, "task not found");
    }

    const fileExtension = path.extname(task.documentUrl as string).toLowerCase();

    const contentType = contentTypes[fileExtension] || "application/octet-stream";

    const fileName = path.basename(task.documentUrl as string);
    const filePath = path.join(__dirname, "../../uploaded-tasks", fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new ApiError(404, "File not found on server");
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${task.task.title}${fileExtension}"`
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