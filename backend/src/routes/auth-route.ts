import express from 'express'
import { handleRefreshToken } from '../controllers/auth.controller'

export const authRoute = express.Router()

authRoute.get('/refresh-token', handleRefreshToken)
