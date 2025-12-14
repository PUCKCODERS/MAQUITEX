import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addAddressController,
  deleteAddressController,
  editAddress,
  getAddressController,
  getSingleAddressController,
  /* selectAddressController,*/
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.get("/:id", auth, getSingleAddressController);
addressRouter.put("/:id", auth, editAddress);
/*addressRouter.put("/selectAddress/:id", auth, selectAddressController);*/
addressRouter.delete("/:id", auth, deleteAddressController);

export default addressRouter;
