import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { handleValidationErrors, validateDiscussionData } from "../middlewares/validation.middleware"
import { getDiscussionById, getDiscussions, handleDiscussionPost, handleDiscussionReply, handleDiscussionSearch } from "../controllers/discussions.controller"

export const discussionRouter = express.Router()

discussionRouter.use(verifyToken)
discussionRouter.get('/', getDiscussions)
discussionRouter.post('/post', validateDiscussionData, handleValidationErrors  , handleDiscussionPost)
discussionRouter.get('/search', handleDiscussionSearch)
discussionRouter.post('/reply', handleDiscussionReply)
discussionRouter.get('/:id', getDiscussionById)
