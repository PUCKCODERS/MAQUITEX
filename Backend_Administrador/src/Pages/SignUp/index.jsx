import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

import CircularProgress from "@mui/material/CircularProgress";

import { postData } from "../../utils/api.js";
import { MyContext } from "../../App";

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

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

    if (formFields.password === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CONTRASEÑA");
      return false;
    }

    postData("/api/user/register", formFields).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });
        history("/verify-account");
      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="!bg-[#fff] !w-full ">
      <header className="w-full static lg:fixed top-0 left-0 !px-4 !py-3 flex items-center justify-center sm:justify-between z-50 bg-none">
        <Link to="/">
          <img
            src="../../../imagenes/logo1.png"
            className="!w-full !h-[80px]"
          />
        </Link>

        <div className="hidden sm:flex items-center !gap-2">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !px-5 !text-gray-200 !bg-gray-800 flex !gap-2 ">
              <FiLogIn className="!text-[20px]" />
              INICIAR SESION
            </Button>
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !px-5 !text-gray-200 !bg-gray-800 flex !gap-2 ">
              <MdAssignmentInd className="!text-[20px]" />
              REGISTRARSE
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src="../../../imagenes/Login/fondo8.jpg"
        className="!w-full !h-full fixed !top-0 !left-0 opacity-5 "
      />

      <div className="loginBox card w-full md:w-[600px] !h-[auto] !pb-20 mx-auto !pt-0 lg:!pt-20 relative z-50 ">
        <div className="text-center">
          <img src="../../../imagenes/logoMaquina1.png" className="m-auto " />
        </div>

        <h1 className="!text-center !text-gray-800  text-[15px] sm:text-[23px] !font-bold !mt-4">
          ¡ÚNETE HOY! CONSIGUE BENEFICIOS ESPECIALES <br />
          <span className="text-blue-800">Y MANTENTE INFORMADO</span>
        </h1>

        <div className="flex items-center justify-center w-full !mt-5 !gap-4">
          <LoadingButton
            className="  !text-gray-800 !border-gray-800  hover:!text-white  hover:!bg-gray-800 !px-5 !py-3 !text-[14px] flex items-center justify-center transition-all duration-300"
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
          >
            INICIE SESION CON GOOGLE
          </LoadingButton>
        </div>

        <br />

        <div className="w-full flex items-center justify-center !gap-3">
          <span className="flex items-center w-[100px] h-[1px] !bg-gray-400"></span>
          <span className="text-[10px] lg:text-[15px] font-bold ">
            O INICIA SESIÓN CON TU CORREO ELECTRÓNICO
          </span>
          <span className="flex items-center w-[100px] h-[1px] !bg-gray-400"></span>
        </div>

        <br />

        <form className="w-full !px-8 !mt-3" onSubmit={handleSubmit}>
          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">NOMBRE COMPLETO</h4>
            <input
              type="text"
              className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
              name="name"
              value={formFields.name}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">CORREO ELECTRÓNICO</h4>
            <input
              type="email"
              className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
              name="email"
              value={formFields.email}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">CONTRASEÑA</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow === false ? "password" : "text"}
                className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />

              <Button
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px]"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow === false ? (
                  <ImEye className="!text-[20px] !text-gray-950" />
                ) : (
                  <ImEyeBlocked className="!text-[20px] !text-gray-950" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="btn-blue !mb-4 !w-full"
            disabled={!valideValue}
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              "REGISTRARSE"
            )}
          </Button>

          <div className="form-group  !mb-4 !w-full flex items-center !justify-between !gap-12">
            <FormControlLabel
              control={<Checkbox defaultChecked fontSize="small" />}
              label={
                <span className="text-[10px] sm:text-[15px] lg:text-[15px]">
                  RECORDARME
                </span>
              }
            />

            <Link
              to="/forgot-password"
              className="text-blue-950 !font-[600] text-[10px] sm:text-[15px] lg:text-[15px] hover:underline hover:!text-gray-950
              transition-all duration-300 !cursor-pointer"
            >
              HAS OLVIDADO TU CONTRASEÑA ?
            </Link>
          </div>

          <div className="flex items-center justify-between !mb-4">
            <span className="text-[11px] lg:text-[15px] sm:text-[15px]">
              YA TIENES UNA CUENTA ?
            </span>
            <Link
              to="/login"
              className="text-blue-950 !font-[600] text-[11px] lg:text-[15px] sm:text-[15px] hover:underline hover:!text-gray-950
              transition-all duration-300 !cursor-pointer"
            >
              INICIAR SESION
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
