import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToMyListController } from "../controllers/mylist.controller.js";

const myListRouter = Router();

myListRouter.post("/add", auth, addToMyListController);

export default myListRouter;
