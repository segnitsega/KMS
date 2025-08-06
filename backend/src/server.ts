import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.middleware";

dotenv.config();
const port = process.env.port;
const server = express();

server.use(cors({
    origin: "*"
}))

server.get("/", (req, res)=>{
    res.send("Welcome to KMS backend server")
})


server.use(errorHandler)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
