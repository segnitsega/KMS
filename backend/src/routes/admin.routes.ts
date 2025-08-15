import express from "express"
import { deleteDocument, updateDocument } from "../controllers/admin.controller"

export const adminRouter = express.Router()

// documents: delete, update
adminRouter.post('/update-doc/:id', updateDocument)
adminRouter.delete('/delete-doc/:id', deleteDocument)

// articles: delete, update
// discussions: delete, update

//users: add, remove, change role, edit profile details like password
// task assignment
