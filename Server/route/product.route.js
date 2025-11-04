import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createProduct,
  createProductRams,
  deleteMultipleProduct,
  deleteProduct,
  deleteProductRams,
  getAllFeaturedProducts,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getAllProductsByThirdLavelCatId,
  getAllProductsByThirdLavelCatName,
  getProduct,
  getProductsCount,
  removeImageFromCloudinary,
  updateProduct,
  updateProductRams,
  uploadImages,
} from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRouter.post("/create", auth, createProduct);
productRouter.post("/productRams/create", auth, createProductRams);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.put("/productRams/:id", auth, updateProductRams);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getAllProductsByCatId/:id", getAllProductsByCatId);
productRouter.get("/getAllProductsByCatName", getAllProductsByCatName);
productRouter.get("/getAllProductsBySubCatId/:id", getAllProductsBySubCatId);
productRouter.get("/getAllProductsBySubCatName", getAllProductsBySubCatName);
productRouter.get(
  "/getAllProductsByThirdLavelCat/:id",
  getAllProductsByThirdLavelCatId
);
productRouter.get(
  "/getAllProductsByThirdLavelCatName",
  getAllProductsByThirdLavelCatName
);
productRouter.get("/getAllProductsByPrice", getAllProductsByPrice);
productRouter.get("/getAllProductsByRating", getAllProductsByRating);
productRouter.get("/getAllProductsCount", getProductsCount);
productRouter.get("/getAllFeaturedProducts", getAllFeaturedProducts);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.delete("/deleteMultiple", deleteMultipleProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/productRams/:id", deleteProductRams);
productRouter.get("/:id", getProduct);

export default productRouter;
