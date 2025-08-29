import express from "express";
import { handleUnifiedSearch } from "../controllers/search.controller";

const searchRouter = express.Router();

searchRouter.get("/", handleUnifiedSearch);

export default searchRouter;
