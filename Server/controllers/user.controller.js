import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ReviewModel from "../models/review.model.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function registerUserController(request, response) {
  try {
    let user;

    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "PROPORCIONAR CORREO ELECTRÓNICO, NOMBRE, CONTRASEÑA",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ email: email });
    if (user) {
      return response.json({
        message: "USUARIO YA REGISTRADO CON ESTE EMAIL",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    user = new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    });

    await user.save();

    await sendEmailFun(
      email,
      "VERIFICAR CORREO ELECTRÓNICO DESDE LA APLICACION DE MAQUITEXT",
      "",
      VerificationEmail(name, verifyCode),
    );

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
    );

    return response.status(200).json({
      success: true,
      error: false,
      message:
        "USUARIO REGISTRADO CORRECTAMENTE! POR FAVOR, REVISE SU CORREO ELECTRÓNICO",
      token: token,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "USUARIO NO ENCONTRADO",
      });
    }

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return response.status(200).json({
        error: false,
        success: true,
        message: "CORREO ELECTRÓNICO VERIFICADO EXITOSAMENTE",
      });
    } else if (!isCodeValid) {
      return response
        .status(400)
        .json({ error: true, success: false, message: "CODIGO NO VÁLIDO" });
    } else {
      return response
        .status(400)
        .json({ error: true, success: false, message: "CODIGO CADUCADO" });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function authWithGoogle(request, response) {
  const { name, email, password, avatar, mobile, role } = request.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      const user = await UserModel.create({
        name: name,
        mobile: mobile,
        email: email,
        password: "null",
        avatar: avatar,
        role: role,
        verify_email: true,
        signUpWithGoogle: true,
      });

      await user.save();

      const accessToken = await generatedAccessToken(user._id);
      const refreshToken = await generatedRefreshToken(user._id);

      await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      response.cookie("accessToken", accessToken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);

      return response.json({
        message: "INICIO DE SESIÓN EXITOSAMENTE",
        error: false,
        success: true,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } else {
      const accessToken = await generatedAccessToken(existingUser._id);
      const refreshToken = await generatedRefreshToken(existingUser._id);

      await UserModel.findByIdAndUpdate(existingUser._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      response.cookie("accessToken", accessToken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);

      return response.json({
        message: "INICIO DE SESIÓN EXITOSAMENTE",
        error: false,
        success: true,
        data: {
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      response.status(400).json({
        message: "USUARIO NO REGISTRADO",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "CONTACTE CON ADMINISTRADOR",
        error: true,
        success: false,
      });
    }

    if (user.verify_email !== true) {
      return response.status(400).json({
        message:
          "SU CORREO ELECTRÓNICO AÚN NO ESTÁ VERIFICADO. POR FAVOR, VERIFIQUE SU CORREO ELECTRÓNICO PRIMERO",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        message: "COMPRUEBA TU CONTRASEÑA",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "INICIO DE SESIÓN EXITOSAMENTE",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(request, response) {
  try {
    const userId = request.userId;

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return response.json({
      message: "SESIÓN CERRADA EXITOSAMENTE",
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

export async function userAvatarController(request, response) {
  try {
    const userId = request.userId;
    const image = request.files;

    const user = await UserModel.findOne({ _id: userId });
    // Si falla quitar esto
    if (!user) {
      return response.status(500).json({
        message: "USUARIO NO ENCONTRADO",
        error: true,
        success: false,
      });
    }
    // hasta aqui

    const imgUrl = user.avatar;

    let imageName = "";
    if (imgUrl && imgUrl.includes("maquitex")) {
      const parts = imgUrl.split("/maquitex/");
      imageName =
        "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
    } else if (imgUrl) {
      const urlArr = imgUrl.split("/");
      imageName = urlArr[urlArr.length - 1].split(".")[0];
    }

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {},
      );
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      folder: "maquitex/avatars",
      format: "webp",
      transformation: [
        { width: 300, crop: "limit", gravity: "face" }, // Enfoca la cara y reduce tamaño
        { quality: "auto" },
      ],
    };

    // OPTIMIZACIÓN VERCEL: Subida en paralelo y limpieza de /tmp
    const uploadPromises = image.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        try {
          fs.unlinkSync(file.path);
        } catch (e) {}
        return result.secure_url;
      } catch (error) {
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    user.avatar = uploadedUrls[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avatar: uploadedUrls[0],
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
      response.status(200).send(res);
    }
  }
}

export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId;
    const { name, email, mobile, password } = request.body;
    const userExist = await UserModel.findById(userId);

    if (!userExist)
      return response.status(400).send("NO SE PUEDE ACTUALIZAR EL USUARIO");

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
      },
      { new: true },
    );

    if (email !== userExist.email) {
      await sendEmailFun({
        sendTo: email,
        subject: "VERIFICAR CORREO ELECTRÓNICO DESDE LA APLICACIÓN MAQUITEXT",
        text: "",
        html: VerificationEmail(name, verifyCode),
      });
    }

    return response.json({
      message: "ACTUALIZACIÓN DE USUARIO EXITOSA",
      error: false,
      success: true,
      user: {
        name: updateUser?.name,
        _id: updateUser?._id,
        email: updateUser?.email,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "CORREO ELECTRÓNICO NO DISPONIBLE",
        error: true,
        success: false,
      });
    } else {
      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = verifyCode;
      user.otpExpires = Date.now() + 600000;

      await user.save();

      await sendEmailFun(
        email,
        "VERIFICAR CÓDIGO DESDE LA APLICACIÓN MAQUITEXT",
        "",
        VerificationEmail(user.name, verifyCode),
      );

      return response.json({
        message: "REVISA TU CORREO ELECTRÓNICO",
        error: false,
        success: true,
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

export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(400).json({
        message: "CORREO ELECTRÓNICO NO DISPONIBLE",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return response.status(400).json({
        message: "PROPORCIONE EL CAMPO REQUERIDO CORREO ELECTRÓNICO, CÓDIGO",
        error: true,
        success: false,
      });
    }

    if (otp !== user.otp) {
      return response.status(400).json({
        message: "CÓDIGO NO VÁLIDO",
        error: true,
        success: false,
      });
    }

    const now = Date.now();
    const otpExpiresTime = user.otpExpires
      ? new Date(user.otpExpires).getTime()
      : 0;

    if (otpExpiresTime < now) {
      return response.status(400).json({
        message: "EL CÓDIGO HA EXPIRADO",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = "";

    await user.save();

    return response.status(200).json({
      message: "VERIFICADO, CÓDIGO EXITOSO",
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

export async function resetpassword(request, response) {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        error: true,
        success: false,
        message:
          "PROPORCIONE LOS CAMPOS OBLIGATORIOS CORREO ELECTRÓNICO, NUEVA CONTRASEÑA, CONFIRMAR CONTRASEÑA",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "EL CORREO ELECTRÓNICO NO ESTÁ DISPONIBLE",
        error: true,
        success: false,
      });
    }

    if (user.signUpWithGoogle === false) {
      if (oldPassword) {
        const checkPassword = await bcryptjs.compare(
          oldPassword,
          user.password,
        );
        if (!checkPassword) {
          return response.status(400).json({
            message: "SU ANTIGUA CONTRASEÑA ES INCORRECTA",
            error: true,
            success: false,
          });
        }
      } else {
      }
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "NUEVA CONTRASEÑA Y CONFIRMAR CONTRASEÑA, DEBEN SER IGUALES",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    user.password = hashPassword;
    user.signUpWithGoogle = false;
    user.otp = "";
    user.otpExpires = "";
    await user.save();

    return response.json({
      message: "CONTRASEÑA ACTUALIZADA EXITOSAMENTE",
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

export async function refreshToken(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return response.status(401).json({
        message: "TOKEN INVÁLIDO",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN,
    );

    if (!verifyToken) {
      return response.status(401).json({
        message: "EL TOKEN ESTÁ CADUCADO",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "NUEVO TOKEN DE ACCESO GENERADO",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(request, response) {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId)
      .select("-password -refresh_token")
      .populate("address_details");

    return response.json({
      message: "DATOS DEL USUARIO",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: "ALGO ESTÁ MAL",
      error: true,
      success: false,
    });
  }
}

export async function addReview(request, response) {
  try {
    const { image, userName, review, rating, userId, productId } = request.body;

    const userReview = new ReviewModel({
      image: image,
      userName: userName,
      review: review,
      rating: rating,
      userId: userId,
      productId: productId,
    });

    await userReview.save();

    return response.json({
      message: "RESEÑA AGREGADA EXITOSAMENTE",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: "ALGO ESTÁ MAL",
      error: true,
      success: false,
    });
  }
}

export async function getReviews(request, response) {
  try {
    const productId = request.query.productId;

    const reviews = await ReviewModel.find({ productId: productId });

    if (!reviews) {
      return response.status(400).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    return response.status(500).json({
      message: "ALGO ESTÁ MAL",
      error: true,
      success: false,
    });
  }
}

export async function getAllReviews(request, response) {
  try {
    const reviews = await ReviewModel.find();

    if (!reviews) {
      return response.status(400).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    return response.status(500).json({
      message: "ALGO ESTÁ MAL",
      error: true,
      success: false,
    });
  }
}

export async function getAllUsers(request, response) {
  try {
    // OPTIMIZACIÓN: No enviar contraseñas ni tokens al frontend para reducir peso y mejorar seguridad
    const users = await UserModel.find().select(
      "-password -refresh_token -access_token -otp -otpExpires",
    );

    if (!users) {
      return response.status(400).json({
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      users: users,
    });
  } catch (error) {
    return response.status(500).json({
      message: "ALGO ESTÁ MAL",
      error: true,
      success: false,
    });
  }
}

export async function deleteUser(request, response) {
  try {
    if (request.params.id === request.userId) {
      return response.status(403).json({
        message: "NO PUEDES ELIMINAR TU PROPIA CUENTA",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(request.params.id);

    if (!user) {
      return response.status(404).json({
        message: "USUARIO NO ENCONTRADO",
        error: true,
        success: false,
      });
    }

    // CORRECCIÓN: Borrar avatar, no images
    if (user.avatar) {
      try {
        let imageName = "";
        if (user.avatar.includes("maquitex")) {
          const parts = user.avatar.split("/maquitex/");
          imageName =
            "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
        } else {
          const urlArr = user.avatar.split("/");
          imageName = urlArr[urlArr.length - 1].split(".")[0];
        }
        if (imageName) {
          await cloudinary.uploader.destroy(imageName).catch(() => {});
        }
      } catch (err) {
        console.log("Error eliminando avatar de Cloudinary", err);
      }
    }

    const deleteUser = await UserModel.findByIdAndDelete(request.params.id);

    if (!deleteUser) {
      return response.status(404).json({
        message: "USUARIO NO ELIMINADO",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      success: true,
      error: false,
      message: "USUARIO ELIMINADO",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteMultiple(request, response) {
  let { ids } = request.body;

  if (!ids || !Array.isArray(ids)) {
    return response
      .status(400)
      .json({ error: true, success: false, message: "ENTRADA NO VÁLIDA" });
  }

  const loggedInUserId = request.userId;
  const originalIdsLength = ids.length;

  // Filter out the logged-in user's ID
  ids = ids.filter((id) => id !== loggedInUserId);

  if (ids.length === 0 && originalIdsLength > 0) {
    return response.status(403).json({
      message: "NO PUEDES ELIMINAR TU PROPIA CUENTA",
      error: true,
      success: false,
    });
  }

  try {
    // OPTIMIZACIÓN: Buscar y eliminar en paralelo para evitar Timeouts en Vercel
    const users = await UserModel.find({ _id: { $in: ids } });

    const deletePromises = users.map(async (user) => {
      if (user.avatar) {
        let imageName = "";
        if (user.avatar.includes("maquitex")) {
          const parts = user.avatar.split("/maquitex/");
          imageName =
            "maquitex/" + parts[1].substring(0, parts[1].lastIndexOf("."));
        } else {
          const urlArr = user.avatar.split("/");
          imageName = urlArr[urlArr.length - 1].split(".")[0];
        }
        if (imageName) {
          return cloudinary.uploader.destroy(imageName).catch(() => {});
        }
      }
    });

    await Promise.all(deletePromises);
    await UserModel.deleteMany({ _id: { $in: ids } });

    let message = "USUARIOS ELIMINADOS";
    if (originalIdsLength > ids.length) {
      message =
        "Algunos usuarios fueron eliminados. El usuario logueado no puede ser eliminado.";
    }

    return response.status(200).json({
      error: false,
      success: true,
      message: message,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
