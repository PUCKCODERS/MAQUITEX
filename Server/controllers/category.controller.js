import CategoryModel from "../models/category.modal.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      folder: "maquitex/categories",
      format: "webp",
      transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
        },
      );
    }

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
      images: imagesArr,
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

    imagesArr = [];

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
  const category = await CategoryModel.findById(request.params.id);
  const images = category.images;
  let img = "";

  for (img of images) {
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
      cloudinary.uploader.destroy(imageName, (error, result) => {});
    }
  }

  const subCategory = await CategoryModel.find({
    parentId: request.params.id,
  });

  for (let i = 0; i < subCategory.length; i++) {
    const thirdsubCategory = await CategoryModel.find({
      parentId: subCategory[i]._id,
    });

    for (let j = 0; j < thirdsubCategory.length; j++) {
      // OPTIMIZACIÓN: Borrar imágenes de la categoría de 3er nivel
      const thirdCatImages = thirdsubCategory[j].images || [];
      for (const img of thirdCatImages) {
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
          cloudinary.uploader.destroy(imageName, (error, result) => {});
        }
      }

      const deleteThirdSubCat = await CategoryModel.findByIdAndDelete(
        thirdsubCategory[j]._id,
      );
    }

    // OPTIMIZACIÓN: Borrar imágenes de la subcategoría
    const subCatImages = subCategory[i].images || [];
    for (const img of subCatImages) {
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
        cloudinary.uploader.destroy(imageName, (error, result) => {});
      }
    }

    const deletedSubCat = await CategoryModel.findByIdAndDelete(
      subCategory[i]._id,
    );
  }

  const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
  if (!deletedCat) {
    response.status(400).json({
      message: "CATEGORÍA NO ENCONTRADA",
      success: false,
    });
  }

  response.status(200).json({
    success: true,
    error: false,
    message: "CATEGORÍA BORRADA",
  });
}

export async function updatedCategory(request, response) {
  // OPTIMIZACIÓN: Si hay nuevas imágenes subidas, borrar las anteriores de Cloudinary
  if (imagesArr.length > 0) {
    const oldCategory = await CategoryModel.findById(request.params.id);
    if (oldCategory && oldCategory.images) {
      for (const img of oldCategory.images) {
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
          await cloudinary.uploader.destroy(imageName).catch(() => {});
        }
      }
    }
  }

  const category = await CategoryModel.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
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

  imagesArr = [];

  response.status(200).json({
    message: "CATEGORÍA ACTUALIZADA",
    error: false,
    success: true,
    category: category,
  });
}
