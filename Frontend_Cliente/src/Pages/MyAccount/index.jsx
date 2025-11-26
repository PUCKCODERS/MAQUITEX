import { Button, TextField } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Collapse } from "react-collapse";
import { Radio } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setisChangePasswordFormShow] =
    useState(false);
  const [phone, setPhone] = useState("");
  const [address /*, setAddress*/] = useState([]);

  const [formFields, setFormFields] = useState({
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
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      // no envolver en comillas
      setPhone(context?.userData?.mobile || "");

      // Inicializa changePassword con todos los campos esperados pero conservando
      // valores previos si ya existen (por seguridad)
      setChangePassword((prev) => ({
        email: context?.userData?.email || "",
        oldPassword: prev.oldPassword || "",
        newPassword: prev.newPassword || "",
        confirmPassword: prev.confirmPassword || "",
      }));
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    // si el campo pertenece a changePassword, actualizamos ese estado
    const changePasswordKeys = [
      "email",
      "oldPassword",
      "newPassword",
      "confirmPassword",
    ];
    if (changePasswordKeys.includes(name)) {
      setChangePassword((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    // si es campo del perfil, actualizamos formFields (merge correcto)
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            setFormFields({
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

    if (
      changePassword.oldPassword === "" &&
      context?.userData?.signUpWithGoogle === false
    ) {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CONTRASEÑA ANTERIOR");
      setIsLoading2(false);
      return false;
    }

    if (changePassword.newPassword === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NUEVA CONTRASEÑA");
      setIsLoading2(false);
      return false;
    }

    if (changePassword.confirmPassword === "") {
      context.alertBox("error", "POR FAVOR CONFIRME SU CONTRASEÑA");
      setIsLoading2(false);
      return false;
    }

    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.alertBox(
        "error",
        "CONTRASEÑA Y CONFIRMAR CONTRASEÑA NO COINCIDE"
      );
      setIsLoading2(false);
      return false;
    }

    // petición al backend
    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    })
      .then((res) => {
        setIsLoading2(false);
        if (res?.error !== true) {
          context.alertBox("success", res?.message);
        } else {
          context.alertBox("error", res?.message);
        }
      })
      .catch((err) => {
        setIsLoading2(false);
        context.alertBox(
          "error",
          err?.message || "ERROR AL CAMBIAR LA CONTRASEÑA"
        );
      });
  };

  return (
    <section className="!py-5 w-full">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[60%]">
          <div className="card bg-white !p-5 shadow-md rounded-md !mb-5">
            <div className="flex items-center !pb-3">
              <h2 className="!pb-0 font-bold font-[bold] text-[20px]">
                MI PERFIL
              </h2>
              <Button
                className="!ml-auto"
                onClick={() =>
                  setisChangePasswordFormShow(!isChangePasswordFormShow)
                }
              >
                CAMBIAR CONTRASEÑA
              </Button>
            </div>

            <hr className="!text-[#b8b8b8]" />

            <form className="!mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center !gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="NOMBRE COMPLETO"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="w-[50%]">
                  <TextField
                    type="email"
                    label="CORREO ELECTRÓNICO"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex items-center !mt-4 !gap-5">
                <div className="w-[50%]">
                  <PhoneInput
                    defaultCountry="ec"
                    value={phone}
                    disabled={isLoading === true ? true : false}
                    onChange={(phone) => {
                      setPhone(phone);
                      setFormFields((prev) => ({
                        ...prev,
                        mobile: phone,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center !gap-4 !mt-5 cursor-pointer">
                <Button
                  type="submit"
                  disabled={!valideValue}
                  className="btn-org btn-lg w-[250px] "
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

          <div
            className="flex items-center justify-center !p-5 rounded-md border  border-[#082c55] bg-[#526b86] hover:bg-[#082c55] text-[#fff] hover:text-[#fff] !mt-5 cursor-pointer "
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVA DIRECCIÓN",
              })
            }
          >
            <span className="text-[16px]  font-[500]">AÑADIR DIRECCIÓN</span>
          </div>

          <div className="flex !gap-2 flex-col !mt-4">
            {address?.length > 0 &&
              address?.map((address, index) => {
                return (
                  <>
                    <label className="addressBox w-full flex items-center justify-center border-1 border-[#bdbdbd] bg-[#f1f1f1] !p-3 rounded-md cursor-pointer shadow-[3px_3px_3px_#000]">
                      <Radio
                        key={index}
                        {...label}
                        name="address"
                        checked={selectedValue === address?._id}
                        value={address?._id}
                        onChange={handleChange}
                      />
                      <span className="text-[12px]">
                        {address?.address_line1 +
                          " " +
                          address?.city +
                          " " +
                          address?.country +
                          " " +
                          address?.state +
                          " " +
                          address?.pincode}
                      </span>
                    </label>
                  </>
                );
              })}
          </div>

          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="card bg-white !p-5 shadow-md rounded-md">
              <div className="flex items-center !pb-3">
                <h2 className="!pb-0 font-bold font-[bold] text-[20px]">
                  CAMBIAR LA CONTRASEÑA
                </h2>
              </div>
              <hr className="!text-[#b8b8b8]" />

              <form className="!mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-2 !gap-5">
                  {context?.userData?.signUpWithGoogle === false && (
                    <div className="col">
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
                  )}

                  <div className="col">
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

                  <div className="col">
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
                  <Button type="submit" className="btn-org btn-lg w-[250px] ">
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
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
