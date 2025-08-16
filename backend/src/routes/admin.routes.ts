import express from "express";
import {
  addUser,
  assignTask,
  changeUserRole,
  deleteArticle,
  deleteDiscussion,
  deleteDocument,
  removeUser,
  updateArticle,
  updateDiscussion,
  updateDocument,
} from "../controllers/admin.controller";

export const adminRouter = express.Router();

// documents: delete, update
adminRouter.post("/update-doc/:id", updateDocument);
adminRouter.delete("/delete-doc/:id", deleteDocument);

// articles: delete, update
adminRouter.post("/update-art/:id", updateArticle);
adminRouter.delete("/delete-art/:id", deleteArticle);

// discussions: delete, update
adminRouter.post("/update-disc/:id", updateDiscussion);
adminRouter.delete("/delete-disc/:id", deleteDiscussion);

//users: add, remove, change role, edit profile details like password
// task assignment
adminRouter.post("/add-user", addUser);
adminRouter.delete("/remove-user/:id", removeUser);
adminRouter.post("/change-user-role/:id", changeUserRole);

//task assignment
adminRouter.post("/task-assign", assignTask)
