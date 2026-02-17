import BannerV2Model from "../models/bannerV2.model.js";

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
      folder: "maquitex/banners_v2",
      format: "webp",
      transformation: [{ width: 1920, crop: "limit" }, { quality: "auto" }],
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

export async function addBanner(request, response) {
  try {
    let banner = new BannerV2Model({
      bannerTitle: request.body.bannerTitle,
      images: request.body.images,
      catId: request.body.catId,
      subCatId: request.body.subCatId,

      alignInfo: request.body.alignInfo,
    });

    if (!banner) {
      return response.status(500).json({
        message: "BANNER NO CREADA",
        error: true,
        success: false,
      });
    }

    banner = await banner.save();

    return response.status(200).json({
      message: "BANNER CREADA",
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBanners(request, response) {
  try {
    const banners = await BannerV2Model.find();

    if (!banners) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: banners,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteBanner(request, response) {
  const banner = await BannerV2Model.findById(request.params.id);
  const images = banner.images;

  let img = "";

  const deletePromises = images.map(async (img) => {
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

  const deletedBanner = await BannerV2Model.findByIdAndDelete(
    request.params.id,
  );
  if (!deletedBanner) {
    response.status(400).json({
      message: "BANNER NO ENCONTRADA",
      success: false,
    });
  }

  response.status(200).json({
    success: true,
    error: false,
    message: "BANNER BORRADA",
  });
}

export async function updatedBanner(request, response) {
  // OPTIMIZACIÓN: Si hay nuevas imágenes subidas, borrar las anteriores de Cloudinary
  const newImages = request.body.images;
  if (newImages && newImages.length > 0) {
    const oldBanner = await BannerV2Model.findById(request.params.id);
    if (oldBanner && oldBanner.images) {
      const deletePromises = oldBanner.images.map(async (img) => {
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

  const banner = await BannerV2Model.findByIdAndUpdate(
    request.params.id,
    {
      bannerTitle: request.body.bannerTitle,
      images: request.body.images,
      catId: request.body.catId,
      subCatId: request.body.subCatId,

      alignInfo: request.body.alignInfo,
    },
    { new: true },
  );

  if (!banner) {
    return response.status(500).json({
      message: "EL BANNER NO SE PUEDE ACTUALIZAR",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    message: "BANNER ACTUALIZADA",
    error: false,
    success: true,
    banner: banner,
  });
}

export async function getBanner(request, response) {
  try {
    const banner = await BannerV2Model.findById(request.params.id);

    if (!banner) {
      response.status(500).json({
        message: "NO SE ENCONTRÓ LA BANNER CON EL ID PROPORCIONADO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
