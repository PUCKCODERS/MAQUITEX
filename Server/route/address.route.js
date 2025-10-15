import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddressController } from "../controllers/address.controller.js";
import { getAddressController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);

export default addressRouter;
