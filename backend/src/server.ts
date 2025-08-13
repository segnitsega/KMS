import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routes/users.routes";
import { documentRouter } from "./routes/documents.routes";
import { articleRouter } from "./routes/articles.routes";
import { discussionRouter } from "./routes/discussions.routes";
import { authRoute } from "./routes/auth-route";

dotenv.config();
const port = process.env.port;
const server = express();

server.use(cors({
    origin: "*"
}))

server.use(express.json());

server.use('/user', userRouter)
server.use('/docs', documentRouter)
server.use('/articles', articleRouter)
server.use('/discussions', discussionRouter)
server.use('/auth', authRoute)

server.use(errorHandler)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
