import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createProduct,
  createProductRams,
  createProductSize,
  createProductWeight,
  deleteMultipleProduct,
  deleteMultipleProductRams,
  deleteMultipleProductSize,
  deleteMultipleProductWeight,
  deleteProduct,
  deleteProductRams,
  deleteProductSize,
  deleteProductWeight,
  filters,
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
  getProductRams,
  getProductRamsById,
  getProductsCount,
  getProductSize,
  getProductSizeById,
  getProductWeight,
  getProductWeightById,
  removeImageFromCloudinary,
  sortBy,
  updateProduct,
  updateProductRams,
  updateProductSize,
  updateProductWeight,
  uploadBannerImages,
  uploadImages,
} from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.post("/uploadImages", auth, upload.array("images"), uploadImages);
productRouter.post(
  "/uploadBannerImages",
  auth,
  upload.array("bannerimages"),
  uploadBannerImages
);
productRouter.post("/create", auth, createProduct);
productRouter.post("/productRams/create", auth, createProductRams);
productRouter.post("/productWeight/create", auth, createProductWeight);
productRouter.post("/productSize/create", auth, createProductSize);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.put("/productRams/:id", auth, updateProductRams);
productRouter.put("/productWeight/:id", auth, updateProductWeight);
productRouter.put("/productSize/:id", auth, updateProductSize);
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
productRouter.get("/productRams/get", getProductRams);
productRouter.get("/productWeight/get", getProductWeight);
productRouter.get("/productSize/get", getProductSize);
productRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
productRouter.delete("/deleteMultiple", deleteMultipleProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/productRams/:id", deleteProductRams);
productRouter.delete("/productWeight/:id", deleteProductWeight);
productRouter.delete("/productSize/:id", deleteProductSize);
productRouter.delete("/deleteMultipleRams", deleteMultipleProductRams);
productRouter.delete("/deleteMultipleWeight", deleteMultipleProductWeight);
productRouter.delete("/deleteMultipleSize", deleteMultipleProductSize);
productRouter.get("/:id", getProduct);
productRouter.get("/productRams/:id", getProductRamsById);
productRouter.get("/productWeight/:id", getProductWeightById);
productRouter.get("/productSize/:id", getProductSizeById);

productRouter.post("/filters", filters);
productRouter.post("/sortBy", sortBy);

export default productRouter;
