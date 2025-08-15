import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/prisma";

export const updateDocument = catchAsync(
  async (req: Request, res: Response) => {
    const docID = req.params.id;
    const { title, description, category } = req.body;

    const updatedDoc = await prisma.document.update({
        where: {
            id: docID
        },
        data: {
            title,
            description,
            category
        }
    });

    res.status(200).json({
        message: "Document update successful!",
        updatedDoc
    })
  }
);

export const deleteDocument = catchAsync(
  async (req: Request, res: Response) => {
    const docID = req.params.id;

    const deletedDoc = await prisma.document.delete({
        where: {
            id: docID
        }
    })

    res.status(200).json({
        message: "Document deleted successfully!",
        deletedDoc
    })
  }
);
