import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { handleValidationErrors, validateArticleData } from "../middlewares/validation.middleware"
import { getDiscussionById, getDiscussions, handleDiscussionPost, handleDiscussionSearch } from "../controllers/discussions.controller"

export const discussionRouter = express.Router()

discussionRouter.use(verifyToken)
discussionRouter.get('/', getDiscussions)
discussionRouter.post('/post', validateArticleData, handleValidationErrors  , handleDiscussionPost)
discussionRouter.get('/search', handleDiscussionSearch)
discussionRouter.get('/:id', getDiscussionById)
