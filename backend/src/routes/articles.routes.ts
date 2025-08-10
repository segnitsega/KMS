import express from "express"
import { verifyToken } from "../middlewares/auth.middleware"
import { getArticleById, getArticles, handleArticlePost, handleArticlesearch } from "../controllers/articles.controller"
import { handleValidationErrors, validateArticleData } from "../middlewares/validation.middleware"

export const articleRouter = express.Router()

articleRouter.use(verifyToken)
articleRouter.get('/', getArticles)
articleRouter.get('/:id', getArticleById)
articleRouter.post('/post', validateArticleData, handleValidationErrors  , handleArticlePost)
articleRouter.get('/search', handleArticlesearch)