import CategoryModel from "../models/category.modal.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function uploadImages(request, response) {
  try {
    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      folder: "maquitex/categories",
      format: "webp",
      transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
    };

    const uploadPromises = image.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        try {
          fs.unlinkSync(file.path);
        } catch (e) {}
        return result.secure_url;
      } catch (e) {
        return null;
      }
    });
    const imagesArr = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null,
    );

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function createCategory(request, response) {
  try {
    let category = new CategoryModel({
      name: request.body.name,
      images: request.body.images,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    });

    if (!category) {
      return response.status(500).json({
        message: "CATEGORÍA NO CREADA",
        error: true,
        success: false,
      });
    }

    category = await category.save();

    return response.status(200).json({
      message: "CATEGORÍA CREADA",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategories(request, response) {
  try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return response.status(200).json({
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });

    if (!categoryCount) {
      response.status(500).json({ success: false, error: true });
    } else {
      response.send({
        categoryCount: categoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getSubCategoriesCount(request, response) {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      response.status(500).json({ success: false, error: true });
    } else {
      const subCatList = [];
      for (let cat of categories) {
        if (cat.parentId !== undefined) {
          subCatList.push(cat);
        }
      }
      response.send({
        SubcategoryCount: subCatList.length,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);

    if (!category) {
      response.status(500).json({
        message: "NO SE ENCONTRÓ LA CATEGORÍA CON EL ID PROPORCIONADO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(request, response) {
  const imgUrl = request.query.img;

  console.log(imgUrl);

  let imageName = "";
  if (imgUrl.includes("maquitex")) {
    const parts = imgUrl.split("/maquitex/");
    imageName = "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
  } else {
    const urlArr = imgUrl.split("/");
    imageName = urlArr[urlArr.length - 1].split(".")[0];
  }

  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {},
    );

    if (res) {
      return response.status(200).json({
        error: false,
        success: true,
        message: "IMAGEN ELIMINADA EXITOSAMENTE",
      });
    }
  }
}

export async function deleteCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    if (!category) {
      return response
        .status(404)
        .json({
          message: "CATEGORÍA NO ENCONTRADA",
          success: false,
          error: true,
        });
    }

    // 1. Recolectar TODAS las imágenes (Padre, Hijos, Nietos)
    const allImagesToDelete = [];
    if (category.images) allImagesToDelete.push(...category.images);

    // Buscar subcategorías
    const subCategories = await CategoryModel.find({
      parentId: request.params.id,
    });
    const subCategoryIds = subCategories.map((cat) => cat._id);
    subCategories.forEach((cat) => {
      if (cat.images) allImagesToDelete.push(...cat.images);
    });

    // Buscar categorías de tercer nivel
    const thirdCategories = await CategoryModel.find({
      parentId: { $in: subCategoryIds },
    });
    const thirdCategoryIds = thirdCategories.map((cat) => cat._id);
    thirdCategories.forEach((cat) => {
      if (cat.images) allImagesToDelete.push(...cat.images);
    });

    // 2. Eliminar TODAS las imágenes en paralelo
    const deleteImagePromises = allImagesToDelete.map(async (img) => {
      let imageName = "";
      if (img.includes("maquitex")) {
        const parts = img.split("/maquitex/");
        imageName =
          "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
      } else {
        const urlArr = img.split("/");
        imageName = urlArr[urlArr.length - 1].split(".")[0];
      }
      if (imageName) {
        return cloudinary.uploader.destroy(imageName).catch(() => {});
      }
    });
    await Promise.all(deleteImagePromises);

    // 3. Eliminar documentos en la base de datos
    await CategoryModel.deleteMany({ _id: { $in: thirdCategoryIds } });
    await CategoryModel.deleteMany({ _id: { $in: subCategoryIds } });
    await CategoryModel.findByIdAndDelete(request.params.id);

    return response.status(200).json({
      success: true,
      error: false,
      message: "CATEGORÍA BORRADA",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updatedCategory(request, response) {
  // OPTIMIZACIÓN: Si hay nuevas imágenes subidas, borrar las anteriores de Cloudinary
  const newImages = request.body.images;
  if (newImages && newImages.length > 0) {
    const oldCategory = await CategoryModel.findById(request.params.id);
    if (oldCategory && oldCategory.images) {
      const deletePromises = oldCategory.images.map(async (img) => {
        let imageName = "";
        if (img.includes("maquitex")) {
          const parts = img.split("/maquitex/");
          imageName =
            "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
        } else {
          const urlArr = img.split("/");
          imageName = urlArr[urlArr.length - 1].split(".")[0];
        }
        if (imageName) {
          return cloudinary.uploader.destroy(imageName).catch(() => {});
        }
      });
      await Promise.all(deletePromises);
    }
  }

  const category = await CategoryModel.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      images: request.body.images,
      color: request.body.color,
      parentId: request.body.parentId,
      parentCatName: request.body.parentCatName,
    },
    { new: true },
  );

  if (!category) {
    return response.status(500).json({
      message: "LA CATEGORÍA NO SE PUEDE ACTUALIZAR",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    message: "CATEGORÍA ACTUALIZADA",
    error: false,
    success: true,
    category: category,
  });
}
