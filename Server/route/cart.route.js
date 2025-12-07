import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
  updateCartItemController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemQtyController);
cartRouter.put("/update-item", auth, updateCartItemController);
cartRouter.delete("/delete-cart-item/:id", auth, deleteCartItemQtyController);

export default cartRouter;
