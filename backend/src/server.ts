import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { userRouter } from "./routes/users.routes";
import { documentRouter } from "./routes/documents.routes";
import { articleRouter } from "./routes/articles.routes";

dotenv.config();
const port = process.env.port;
const server = express();

server.use(cors({
    origin: "*"
}))

server.use(express.json());

server.use('/api/user', userRouter)
server.use('/api/docs', documentRouter)
server.use('/api/articles', articleRouter)

server.use(errorHandler)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
