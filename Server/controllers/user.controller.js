import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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
      VerificationEmail(name, verifyCode)
    );

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
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

var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = [];

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

    const urlArr = imgUrl.split("/");
    const avatar_image = urlArr[urlArr.length - 1];

    const imageName = avatar_image.split(".")[0];

    if (imageName) {
      const res = await cloudinary.uploader.destroy(
        imageName,
        (error, result) => {}
      );
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
        }
      );
    }

    user.avatar = imagesArr[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avatar: imagesArr[0],
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

  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];

  const imageName = image.split(".")[0];

  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {}
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
    let verifyCode = "";

    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
        verify_email: email !== userExist.email ? false : true,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
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
        VerificationEmail(user.name, verifyCode)
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

    if (oldPassword) {
      const checkPassword = await bcryptjs.compare(oldPassword, user.password);
      if (!checkPassword) {
        return response.status(400).json({
          message: "SU ANTIGUA CONTRASEÑA ES INCORRECTA",
          error: true,
          success: false,
        });
      }
    } else {
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
      process.env.SECRET_KEY_REFRESH_TOKEN
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
