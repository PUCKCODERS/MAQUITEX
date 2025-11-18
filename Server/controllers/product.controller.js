import ProductModel from "../models/product.modal.js";
import ProductRamsModel from "../models/productRams.js";
import ProductWeightModel from "../models/productWeight.js";
import ProductSizeModel from "../models/productSize.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

// PARA PRODUCTO EN GENERAL
export async function uploadImages(request, response) {
  try {
    const files = request.files || [];
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].path;
      const result = await cloudinary.uploader.upload(filePath, options);
      if (result && result.secure_url) {
        uploadedUrls.push(result.secure_url);
      }

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {}
    }

    return response.status(200).json({
      images: uploadedUrls,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function uploadBannerImages(request, response) {
  try {
    const files = request.files || [];
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    const bannerImage = [];

    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].path;
      const result = await cloudinary.uploader.upload(filePath, options);
      if (result && result.secure_url) {
        bannerImage.push(result.secure_url);
      }

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {}
    }

    return response.status(200).json({
      images: bannerImage,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function createProduct(request, response) {
  try {
    const imagesFromClient = Array.isArray(request.body.images)
      ? request.body.images
      : [];

    const bannerimagesFromClient = Array.isArray(request.body.bannerimages)
      ? request.body.bannerimages
      : [];

    let product = new ProductModel({
      name: request.body.name,
      description: request.body.description,
      images: imagesFromClient,
      bannerimages: bannerimagesFromClient,
      bannerTitlename: request.body.bannerTitlename,
      isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
      brand: request.body.brand,
      price: request.body.price,
      oldPrice: request.body.oldPrice,
      catName: request.body.catName,
      category: request.body.category,
      catId: request.body.catId,
      subCatId: request.body.subCatId,
      subCat: request.body.subCat,
      thirdsubCat: request.body.thirdsubCat,
      thirdsubCatId: request.body.thirdsubCatId,
      category: request.body.category,
      countInStock: request.body.countInStock,
      rating: request.body.rating,
      isFeatured: request.body.isFeatured,
      discount: request.body.discount,
      productRams: request.body.productRams,
      size: request.body.size,
      productWeight: request.body.productWeight,
    });

    product = await product.save();
    if (!product) {
      response.status(500).json({
        error: true,
        success: false,
        message: "PRODUCTO NO CREADO",
      });
    }

    return response.status(200).json({
      message: "PRODUCTO CREADO CON ÉXITO",
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProducts(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      catId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      catName: request.query.catName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsBySubCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      subCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsBySubCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      subCat: request.query.subCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByThirdLavelCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      thirdsubCatId: request.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByThirdLavelCatName(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      thirdsubCat: request.query.thirdsubCat,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsByPrice(request, response) {
  let productList = [];

  if (request.query.catId !== "" && request.query.catId !== undefined) {
    const productListArr = await ProductModel.find({
      catId: request.query.catId,
    }).populate("category");

    productList = productListArr;
  }

  if (request.query.subCatId !== "" && request.query.subCatId !== undefined) {
    const productListArr = await ProductModel.find({
      subCatId: request.query.subCatId,
    }).populate("category");

    productList = productListArr;
  }

  if (
    request.query.thirdsubCatId !== "" &&
    request.query.thirdsubCatId !== undefined
  ) {
    const productListArr = await ProductModel.find({
      thirdsubCatId: request.query.thirdsubCatId,
    }).populate("category");

    productList = productListArr;
  }

  const filteredProducts = productList.filter((product) => {
    if (
      request.query.minPrice &&
      product.price < parseInt(+request.query.minPrice)
    ) {
      return false;
    }
    if (
      request.query.maxPrice &&
      product.price > parseInt(+request.query.maxPrice)
    ) {
      return false;
    }
    return true;
  });

  return response.status(200).json({
    error: false,
    success: true,
    products: filteredProducts,
    totalPages: 0,
    page: 0,
  });
}

export async function getAllProductsByRating(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "PÁGINA NO ENCONTRADA",
        success: false,
        error: true,
      });
    }

    let products = [];

    if (request.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        catId: request.query.catId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (request.query.subCatId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        subCatId: request.query.subCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (request.query.thirdsubCatId !== undefined) {
      products = await ProductModel.find({
        rating: request.query.rating,
        thirdsubCatId: request.query.thirdsubCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsCount(request, response) {
  try {
    const productsCount = await ProductModel.countDocuments();

    if (!productsCount) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      productsCount: productsCount,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllFeaturedProducts(request, response) {
  try {
    const products = await ProductModel.find({
      isFeatured: true,
    }).populate("category");

    if (!products) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "category"
    );

    if (!product) {
      return response.status(404).json({
        message: "PRODUCTO NO ENCONTRADO",
        error: true,
        success: false,
      });
    }

    const images = product.images || [];

    for (const imgUrl of images) {
      try {
        const urlArr = imgUrl.split("/");
        const lastSeg = urlArr[urlArr.length - 1] || "";
        const imageName = lastSeg.split(".")[0];
        if (imageName) {
          await cloudinary.uploader.destroy(imageName).catch(() => {});
        }
      } catch (err) {}
    }

    const deleteProduct = await ProductModel.findByIdAndDelete(
      request.params.id
    );

    if (!deleteProduct) {
      return response.status(404).json({
        message: "PRODUCTO NO ELIMINADO",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      success: true,
      error: false,
      message: "PRODUCTO ELIMINADO",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function deleteMultipleProduct(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  try {
    for (let i = 0; i < ids.length; i++) {
      const product = await ProductModel.findById(ids[i]);
      if (!product) continue;

      const images = product.images || [];
      for (const img of images) {
        try {
          const urlArr = img.split("/");
          const image = urlArr[urlArr.length - 1];
          const imageName = image.split(".")[0];
          if (imageName) {
            await cloudinary.uploader.destroy(imageName).catch(() => {});
          }
        } catch (err) {}
      }
    }
    await ProductModel.deleteMany({ _id: { $in: ids } });

    return response.status(200).json({
      error: false,
      success: true,
      message: "PRODUCTOS ELIMINADOS",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProduct(request, response) {
  try {
    const product = await ProductModel.findById(request.params.id).populate(
      "category"
    );

    if (!product) {
      return response.status(404).json({
        message: "NO SE ENCUENTRA EL PRODUCTO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      product: product,
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
  try {
    const imgUrl = request.query.img;
    if (!imgUrl) {
      return response
        .status(400)
        .json({ error: true, message: "img query required" });
    }
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1] || "";
    const imageName = image.split(".")[0];

    if (imageName) {
      const res = await cloudinary.uploader.destroy(imageName).catch(() => {});
      return response.status(200).json({ error: false, result: res });
    } else {
      return response
        .status(400)
        .json({ error: true, message: "invalid image url" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ error: true, message: error.message || error });
  }
}

export async function updateProduct(request, response) {
  try {
    const existingProduct = await ProductModel.findById(request.params.id);

    if (!existingProduct) {
      return response.status(404).json({
        message: "EL PRODUCTO NO SE ENCUENTRA",
        status: false,
      });
    }

    const imagesFromClient = Array.isArray(request.body.images)
      ? request.body.images
      : existingProduct.images;

    const bannerimagesFromClient = Array.isArray(request.body.bannerimages)
      ? request.body.bannerimages
      : existingProduct.bannerimages;

    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        description: request.body.description,
        images: imagesFromClient,
        bannerimages: bannerimagesFromClient,
        bannerTitlename: request.body.bannerTitlename,
        isDisplayOnHomeBanner: request.body.isDisplayOnHomeBanner,
        brand: request.body.brand,
        price: request.body.price,
        oldPrice: request.body.oldPrice,
        catName: request.body.catName,
        catId: request.body.catId,
        subCatId: request.body.subCatId,
        subCat: request.body.subCat,
        thirdsubCat: request.body.thirdsubCat,
        thirdsubCatId: request.body.thirdsubCatId,
        category: request.body.category,
        countInStock: request.body.countInStock,
        rating: request.body.rating,
        isFeatured: request.body.isFeatured,
        discount: request.body.discount,
        productRams: request.body.productRams,
        size: request.body.size,
        productWeight: request.body.productWeight,
      },
      { new: true }
    );

    if (!product) {
      return response.status(404).json({
        message: "EL PRODUCTO NO SE PUEDE ACTUALIZAR",
        status: false,
      });
    }

    return response.status(200).json({
      message: "EL PRODUCTO ESTÁ ACTUALIZADO",
      error: false,
      success: true,
      product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// PARA COLOR
export async function createProductRams(request, response) {
  try {
    let productRams = new ProductRamsModel({
      name: request.body.name,
    });

    productRams = await productRams.save();
    if (!productRams) {
      response.status(500).json({
        error: true,
        success: false,
        message: "COLOR NO CREADO",
      });
    }

    return response.status(200).json({
      message: "COLOR CREADO CON ÉXITO",
      error: false,
      success: true,
      product: productRams,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProductRams(request, response) {
  const productRams = await ProductRamsModel.findById(request.params.id);

  if (!productRams) {
    return response.status(404).json({
      message: "COLOR NO ENCONTRADO",
      error: true,
      success: false,
    });
  }

  const deleteProductRams = await ProductRamsModel.findByIdAndDelete(
    request.params.id
  );

  if (!deleteProductRams) {
    response.status(404).json({
      message: "COLOR NO ELIMINADO",
      success: false,
      error: true,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "COLOR ELIMINADO",
  });
}

export async function deleteMultipleProductRams(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  try {
    await ProductRamsModel.deleteMany({ _id: { $in: ids } });

    return response.status(200).json({
      error: false,
      success: true,
      message: "COLORES ELIMINADOS",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductRams(request, response) {
  try {
    const productRams = await ProductRamsModel.find();

    if (!productRams) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productRams,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductRamsById(request, response) {
  try {
    const productRams = await ProductRamsModel.findById(request.params.id);

    if (!productRams) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productRams,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function updateProductRams(request, response) {
  try {
    const productRams = await ProductRamsModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      { new: true }
    );

    if (!productRams) {
      return response.status(404).json({
        message: "EL COLOR NO SE PUEDE ACTUALIZAR",
        status: false,
      });
    }

    return response.status(200).json({
      message: "EL COLOR ESTÁ ACTUALIZADO",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// PARA PESO
export async function createProductWeight(request, response) {
  try {
    let productWeight = new ProductWeightModel({
      name: request.body.name,
    });

    productWeight = await productWeight.save();
    if (!productWeight) {
      response.status(500).json({
        error: true,
        success: false,
        message: "PESO NO CREADO",
      });
    }

    return response.status(200).json({
      message: "PESO CREADO CON ÉXITO",
      error: false,
      success: true,
      product: productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProductWeight(request, response) {
  const productWeight = await ProductWeightModel.findById(request.params.id);

  if (!productWeight) {
    return response.status(404).json({
      message: "PESO NO ENCONTRADO",
      error: true,
      success: false,
    });
  }

  const deleteProductWeight = await ProductWeightModel.findByIdAndDelete(
    request.params.id
  );

  if (!deleteProductWeight) {
    response.status(404).json({
      message: "PESO NO ELIMINADO",
      success: false,
      error: true,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "PESO ELIMINADO",
  });
}

export async function deleteMultipleProductWeight(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  try {
    await ProductWeightModel.deleteMany({ _id: { $in: ids } });

    return response.status(200).json({
      error: false,
      success: true,
      message: "PESOS ELIMINADOS",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductWeight(request, response) {
  try {
    const productWeight = await ProductWeightModel.find();

    if (!productWeight) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductWeightById(request, response) {
  try {
    const productWeight = await ProductWeightModel.findById(request.params.id);

    if (!productWeight) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function updateProductWeight(request, response) {
  try {
    const productWeight = await ProductWeightModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      { new: true }
    );

    if (!productWeight) {
      return response.status(404).json({
        message: "EL PESO NO SE PUEDE ACTUALIZAR",
        status: false,
      });
    }

    return response.status(200).json({
      message: "EL PESO ESTÁ ACTUALIZADO",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// PARA TAMAÑO
export async function createProductSize(request, response) {
  try {
    let productSize = new ProductSizeModel({
      name: request.body.name,
    });

    productSize = await productSize.save();
    if (!productSize) {
      response.status(500).json({
        error: true,
        success: false,
        message: "TAMAÑO NO CREADO",
      });
    }

    return response.status(200).json({
      message: "TAMAÑO CREADO CON ÉXITO",
      error: false,
      success: true,
      product: productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProductSize(request, response) {
  const productSize = await ProductSizeModel.findById(request.params.id);

  if (!productSize) {
    return response.status(404).json({
      message: "TAMAÑO NO ENCONTRADO",
      error: true,
      success: false,
    });
  }

  const deleteProductSize = await ProductSizeModel.findByIdAndDelete(
    request.params.id
  );

  if (!deleteProductSize) {
    response.status(404).json({
      message: "TAMAÑO NO ELIMINADO",
      success: false,
      error: true,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "TAMAÑO ELIMINADO",
  });
}

export async function deleteMultipleProductSize(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  try {
    await ProductSizeModel.deleteMany({ _id: { $in: ids } });

    return response.status(200).json({
      error: false,
      success: true,
      message: "TAMAÑOS ELIMINADOS",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductSize(request, response) {
  try {
    const productSize = await ProductSizeModel.find();

    if (!productSize) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductSizeById(request, response) {
  try {
    const productSize = await ProductSizeModel.findById(request.params.id);

    if (!productSize) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function updateProductSize(request, response) {
  try {
    const productSize = await ProductSizeModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
      },
      { new: true }
    );

    if (!productSize) {
      return response.status(404).json({
        message: "EL TAMAÑO NO SE PUEDE ACTUALIZAR",
        status: false,
      });
    }

    return response.status(200).json({
      message: "EL TAMAÑO ESTÁ ACTUALIZADO",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
