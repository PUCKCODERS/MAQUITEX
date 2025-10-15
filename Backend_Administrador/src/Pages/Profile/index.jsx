import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { RiFileUploadFill } from "react-icons/ri";
import CircularProgress from "@mui/material/CircularProgress";
import {
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Profile = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setisChangePasswordFormShow] =
    useState(false);

  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(`/api/address/get?${context?.userData?._id}`).then(
        (res) => {
          console.log(res);
        }
      );

      setUserId(context?.userData?._id);
      setFormsFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph);

      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (["oldPassword", "newPassword", "confirmPassword"].includes(name)) {
      setChangePassword((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormsFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NOMBRE COMPLETO");
      return false;
    }

    if (formFields.email === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CORREO ELECTRÓNICO");
      return false;
    }

    if (formFields.mobile === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NÚMERO CELULAR");
      return false;
    }

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.data?.message);

          const updatedUser = res?.data?.user;
          if (updatedUser) {
            setFormsFields({
              name: updatedUser.name,
              email: updatedUser.email,
              mobile: updatedUser.mobile,
            });
            context.setUserData(updatedUser);
          }

          setChangePassword({
            email: updatedUser?.email || "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          context.alertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  const valideValue2 = Object.values(formFields).every((el) => el);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (changePassword.oldPassword === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CONTRASEÑA ANTERIOR");
      return false;
    }

    if (changePassword.newPassword === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NUEVA CONTRASEÑA");
      return false;
    }

    if (changePassword.confirmPassword === "") {
      context.alertBox("error", "POR FAVOR CONFIRME SU CONTRASEÑA");
      return false;
    }

    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.alertBox(
        "error",
        "CONTRASEÑA Y CONFIRMAR CONTRASEÑA NO COINCIDE"
      );
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res?.error !== true) {
        setIsLoading2(false);
        context.alertBox("success", res?.message);
      } else {
        context.alertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  useEffect(() => {
    const userAvatar = [];

    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e /*apiEndPoint*/) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          (files[i] &&
            (files[i].type === "image/jpeg" ||
              files[i].type === "image/png" ||
              files[i].type === "image/jpg")) ||
          files[i].type === "image/webp"
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.alertBox(
            "error",
            "Por favor, seleccione un archivo de imagen válido en formato JPG, JPEG, WEBP o PNG."
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card !my-4 !pt-5 !w-[65%] !shadow-md sm:rounded-lg bg-white !px-5 !pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#082c55] text-[20px] font-bold font-[bold]  ">
            PERFIL USUARIO
          </h2>

          <Button
            className="!ml-auto "
            onClick={() =>
              setisChangePasswordFormShow(!isChangePasswordFormShow)
            }
          >
            CAMBIAR CONTRASEÑA
          </Button>
        </div>

        <br />

        <div
          className="w-[110px] h-[110px] rounded-full overflow-hidden !mb-4 relative group
                    flex items-center justify-center bg-[#f5f4f4]"
        >
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={index}
                      className="w-full h-full object-cover"
                    />
                  );
                })
              ) : (
                <img src={"/user.jpg"} className="w-full h-full object-cover" />
              )}
            </>
          )}

          <div
            className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-150 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer
                        opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <RiFileUploadFill className="text-[#fff] text-[30px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <form className="form !mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center !gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1] "
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
            </div>

            <div className="w-[50%]">
              <input
                type="email"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="email"
                value={formFields.email}
                disabled={true}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center !mt-4 !gap-5 ">
            <div className="w-[50%] ">
              <PhoneInput
                defaultCountry="ec"
                value={phone}
                disabled={isLoading === true ? true : false}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormsFields({
                    mobile: phone,
                  });
                }}
              />
            </div>
          </div>

          <div
            className="flex items-center justify-center !p-5 rounded-md border border-dashed border-[#082c55] bg-[#526b86] hover:bg-[#082c55] text-[#fff] hover:text-[#fff] !mt-5 cursor-pointer"
            onClick={() =>
              context.setIsOpentFullScreenPanel({
                open: true,
                model: "NUEVA DIRECCIÓN",
              })
            }
          >
            <span className="text-[16px]  font-[500]">AÑADIR DIRECCIÓNS</span>
          </div>

          <label className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] !p-3 rounded-md cursor-pointer">
            <Checkbox {...label} />
          </label>

          <div className="flex items-center !gap-4 !mt-5 cursor-pointer">
            <Button
              type="submit"
              disabled={!valideValue}
              className="btn-org btn-lg w-full "
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "ACTUALIZAR PERFIL"
              )}
            </Button>
          </div>
        </form>
      </div>

      <Collapse isOpened={isChangePasswordFormShow}>
        <div className="card w-[65%] bg-white !p-5 shadow-md rounded-md">
          <div className="flex items-center !pb-3">
            <h2 className="!pb-0 font-bold font-[bold] text-[20px]">
              CAMBIAR LA CONTRASEÑA
            </h2>
          </div>
          <hr className="!text-[#b8b8b8]" />

          <form className="!mt-8" onSubmit={handleSubmitChangePassword}>
            <div className="flex items-center !gap-5">
              <div className="w-[50%]">
                <TextField
                  label="CONTRASEÑA ANTERIOR"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="oldPassword"
                  value={changePassword.oldPassword}
                  disabled={isLoading2 === true ? true : false}
                  onChange={onChangeInput}
                />
              </div>

              <div className="w-[50%]">
                <TextField
                  type="text"
                  label="NUEVA CONTRASEÑA"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="flex items-center !mt-4 !gap-5">
              <div className="w-[50%]">
                <TextField
                  label="CONFIRMAR CONTRASEÑA"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="flex items-center !gap-4 !mt-5 cursor-pointer">
              <Button
                type="submit"
                disabled={!valideValue2}
                className="btn-org btn-lg w-[100%] "
              >
                {isLoading2 === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "CAMBIAR CONTRASEÑA"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
