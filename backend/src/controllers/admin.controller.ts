import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/prisma";
import { ApiError } from "../utils/api-error-class";
import bcrypt from "bcrypt";

export const updateDocument = catchAsync(
  async (req: Request, res: Response) => {
    const docID = req.params.id;
    const { title, description, category } = req.body;

    const updatedDoc = await prisma.document.update({
      where: {
        id: docID,
      },
      data: {
        title,
        description,
        category,
      },
    });

    res.status(200).json({
      message: "Document update successful!",
      updatedDoc,
    });
  }
);

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const docID = req.params.id;

    const deletedDoc = await prisma.document.delete({
      where: {
        id: docID,
      },
    });

    res.status(200).json({
      message: "Document deleted successfully!",
      deletedDoc,
    });
  }
);

export const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const articleID = req.params.id;
  const { title, description, category } = req.body;

  const articleUpdated = await prisma.article.update({
    where: {
      id: articleID,
    },
    data: {
      title,
      description,
      category,
    },
  });

  res.status(200).json({
    message: "Article update successful!",
    articleUpdated,
  });
});

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const articleID = req.params.id;

  const deletedArticle = await prisma.article.delete({
    where: {
      id: articleID,
    },
  });

  res.status(200).json({
    message: "Article deleted successfully!",
    deletedArticle,
  });
});

export const updateDiscussion = catchAsync(
  async (req: Request, res: Response) => {
    const discussionID = req.params.id;
    const { title, description, category } = req.body;

    const discussionUpdated = await prisma.discussion.update({
      where: {
        id: discussionID,
      },
      data: {
        title,
        description,
        category,
      },
    });

    res.status(200).json({
      message: "Article update successful!",
      discussionUpdated,
    });
  }
);

export const deleteDiscussion = catchAsync(
  async (req: Request, res: Response) => {
    const discussionID = req.params.id;

    const deletedDiscussion = await prisma.discussion.delete({
      where: {
        id: discussionID,
      },
    });

    res.status(200).json({
      message: "Article deleted successfully!",
      deletedDiscussion,
    });
  }
);

export const addUser = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists)
    throw new ApiError(400, `User with email ${email} already exists`);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) throw new ApiError(400, "Error registering new user.");

  return res.status(200).json({
    message: " New user registered successfully",
    userId: newUser,
  });
});

export const removeUser = catchAsync(async (req: Request, res: Response) => {
  const userID = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
  if (!user) {
    return res.status(404).json("User not found !");
  }
  const removedUser = await prisma.user.delete({
    where: {
      id: userID,
    },
  });
  return res.status(200).json({
    message: "User removed successfully",
    removedUser,
  });
});

export const changeUserRole = catchAsync(
  async (req: Request, res: Response) => {
    const userID = req.params.id;
    const { role } = req.body;
    const roleUpdatedUser = await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        role,
      },
    });
    return res.status(200).json({
      message: "User role updated successfully",
      roleUpdatedUser,
    });
  }
);

export const assignTask = catchAsync(async (req: Request, res: Response) => {
  const { title, description, id, dueDate } =
    req.body;

  // if (!Array.isArray(userIDs)) {
  //   return res.status(400).json({
  //     message: "userIDs must be an array",
  //   });
  // }

  // const tasksCreated = await Promise.all(
  //   userIDs.map((id: string) => {
  //     return prisma.task.create({
  //       data: {
  //         title,
  //         description,
  //         priorityLevel,
  //         dueDate,
  //         userId: id,
  //       },
  //     });
  //   })
    const tasksCreated = await prisma.task.create({
        data: {
          title,
          description,
          dueDate,
          userId: id,
        },
      });
  res.status(201).json({
    message: "Task assigned successfully!",
    tasksCreated,
  });
});
