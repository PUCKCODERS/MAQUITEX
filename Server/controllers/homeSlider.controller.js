import HomeSliderModel from "../models/homeSlider.js";

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
      folder: "maquitex/sliders",
      format: "webp",
      transformation: [
        { width: 1920, crop: "limit" }, // Full HD máximo
        { quality: "auto" },
      ],
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

export async function addHomeSlide(request, response) {
  try {
    let slide = new HomeSliderModel({
      images: request.body.images, // CORRECCIÓN: Usar datos del body, no variable global
    });

    if (!slide) {
      return response.status(500).json({
        message: "DIAPOSITIVA NO CREADA",
        error: true,
        success: false,
      });
    }
    slide = await slide.save();

    return response.status(200).json({
      message: "DIAPOSITIVAS CREADA",
      error: false,
      success: true,
      slide: slide,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getHomeSlides(request, response) {
  try {
    const slides = await HomeSliderModel.find();
    if (!slides) {
      return response.status(404).json({
        message: "DIAPOSITIVAS NO ENCONTRADAS",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      data: slides,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getSlide(request, response) {
  try {
    const slide = await HomeSliderModel.findById(request.params.id);

    if (!slide) {
      response.status(500).json({
        message: "NO SE ENCONTRÓ LA DIAPOSITIVA CON EL ID PROPORCIONADO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      slide: slide,
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

export async function deleteSlide(request, response) {
  const slide = await HomeSliderModel.findById(request.params.id);
  const images = slide.images;
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

  const deletedSlide = await HomeSliderModel.findByIdAndDelete(
    request.params.id,
  );
  if (!deletedSlide) {
    response.status(400).json({
      message: "DIAPOSITIVA NO ENCONTRADA",
      success: false,
    });
  }

  return response.status(200).json({
    success: true,
    error: false,
    message: "DIAPOSITIVA BORRADA",
  });
}

export async function updatedSlide(request, response) {
  // OPTIMIZACIÓN: Si hay nuevas imágenes subidas, borrar las anteriores de Cloudinary
  const newImages = request.body.images;
  if (newImages && newImages.length > 0) {
    const oldSlide = await HomeSliderModel.findById(request.params.id);
    if (oldSlide && oldSlide.images) {
      const deletePromises = oldSlide.images.map(async (img) => {
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

  const slide = await HomeSliderModel.findByIdAndUpdate(
    request.params.id,
    {
      images: request.body.images,
    },
    { new: true },
  );

  if (!slide) {
    return response.status(500).json({
      message: "LA DIAPOSITIVA NO SE PUEDE ACTUALIZAR",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    message: "DIAPOSITIVA ACTUALIZADA",
    error: false,
    slide: slide,
  });
}

export async function deleteMultipleSlides(request, response) {
  const { ids } = request.body;

  console.log(ids);

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  try {
    const slides = await HomeSliderModel.find({ _id: { $in: ids } });
    const allDeletePromises = [];

    slides.forEach((slide) => {
      const images = slide.images || [];
      images.forEach((img) => {
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
          allDeletePromises.push(
            cloudinary.uploader.destroy(imageName).catch(() => {}),
          );
        }
      });
    });
    await Promise.all(allDeletePromises);
    await HomeSliderModel.deleteMany({ _id: { $in: ids } });

    return response.status(200).json({
      error: false,
      success: true,
      message: "DIAPOSITIVAS ELIMINADAS",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
