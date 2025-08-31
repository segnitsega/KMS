import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routes/users.routes";
import { documentRouter } from "./routes/documents.routes";
import { articleRouter } from "./routes/articles.routes";
import { discussionRouter } from "./routes/discussions.routes";
import { authRoute } from "./routes/auth-route";
import cookieParser from "cookie-parser";
import { statusRoute } from "./routes/dashboard.route";
import { adminRouter } from "./routes/admin.routes";
import { checkAdmin, verifyToken } from "./middlewares/auth.middleware";
import { taskRouter } from "./routes/tasks.routes";
import { libraryRouter } from "./routes/library.routes";
import { chatRouter } from "./routes/chat.routes";
import searchRouter from "./routes/search.routes";

dotenv.config();
const port = process.env.port || 8000;
const server = express();

server.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.45.162:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(express.json());
server.use(cookieParser());
server.use("/user", userRouter);
server.use("/docs", documentRouter);
server.use("/articles", articleRouter);
server.use("/discussions", discussionRouter);
server.use("/auth", authRoute);
server.use("/status-count", statusRoute);
server.use("/admin", verifyToken, checkAdmin, adminRouter);
server.use("/tasks", taskRouter);
server.use("/library", libraryRouter);
server.use("/chat", chatRouter);
server.use("/search", searchRouter);

server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
