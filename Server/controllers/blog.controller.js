import BlogModel from "../models/blog.model.js";

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
      folder: "maquitex/blogs",
      format: "webp",
      transformation: [
        { width: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
      resource_type: "image",
    };

    const uploadPromises = image.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        try {
          fs.unlinkSync(file.path);
        } catch (e) {}
        return result.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null,
    );

    response.status(200).json({ success: true, images: uploadedUrls });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Image upload failed", error });
  }
}

export async function addBlog(request, response) {
  try {
    let blog = new BlogModel({
      title: request.body.title,
      images: request.body.images,
      description: request.body.description,
    });

    if (!blog) {
      return response.status(500).json({
        message: "BLOG NO CREADO",
        error: true,
        success: false,
      });
    }

    blog = await blog.save();

    return response.status(200).json({
      message: "BLOG CREADO",
      error: false,
      success: true,
      blog: blog,
    });
  } catch (error) {
    // OPTIMIZACIÓN CRÍTICA: Rollback - Si falla la creación, borrar imágenes subidas
    if (Array.isArray(request.body.images) && request.body.images.length > 0) {
      const deletePromises = request.body.images.map(async (img) => {
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

    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBlogs(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage);
    const totalPosts = await BlogModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "BLOG NO ENCONTRADO",
        success: false,
        error: true,
      });
    }

    const blogs = await BlogModel.find()

      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!blogs) {
      response.status(500).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      blogs: blogs,
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

export async function getBlog(request, response) {
  try {
    const blog = await BlogModel.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        message: "NO SE ENCONTRÓ LA BLOG CON EL ID PROPORCIONADO",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      blog: blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteBlog(request, response) {
  try {
    const blog = await BlogModel.findById(request.params.id);
    if (!blog)
      return response.status(404).json({ message: "Blog no encontrado" });

    const images = blog.images || [];

    const deletePromises = images.map((img) => {
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

    const deletedBlog = await BlogModel.findByIdAndDelete(request.params.id);
    if (!deletedBlog) {
      return response.status(400).json({
        message: "BLOG NO ENCONTRADO",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      success: true,
      error: false,
      message: "BLOG BORRADO",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updatedBlog(request, response) {
  // OPTIMIZACIÓN: Eliminar imágenes antiguas de Cloudinary antes de actualizar
  if (Array.isArray(request.body.images)) {
    try {
      const newImages = request.body.images;
      const oldBlog = await BlogModel.findById(request.params.id);
      if (oldBlog && oldBlog.images) {
        const imagesToDelete = oldBlog.images.filter(
          (img) => !newImages.includes(img),
        );

        const deletePromises = imagesToDelete.map((img) => {
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
    } catch (e) {
      console.log("Error cleaning old blog images", e);
    }
  }

  try {
    const blog = await BlogModel.findByIdAndUpdate(
      request.params.id,
      {
        title: request.body.title,
        images: request.body.images,
        description: request.body.description,
      },
      { new: true },
    );

    if (!blog) {
      return response.status(404).json({
        message: "EL BLOG NO SE PUEDE ACTUALIZAR",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "BLOG ACTUALIZADO",
      error: false,
      success: true,
      blog: blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
