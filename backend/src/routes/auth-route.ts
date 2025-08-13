import express from 'express'
import { handleRefreshToken, handleTokenVerifaction } from '../controllers/auth.controller'

export const authRoute = express.Router()

authRoute.get('/refresh-token', handleRefreshToken)
authRoute.post('/validate-token', handleTokenVerifaction)
