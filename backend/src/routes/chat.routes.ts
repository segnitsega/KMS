import express from "express";
import { handleChat } from "../controllers/chat.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export const chatRouter = express.Router();

chatRouter.use(verifyToken);
chatRouter.post("/", handleChat);
