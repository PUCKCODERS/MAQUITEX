import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";

const ChangePassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);

  return (
    <section className="!bg-[#fff] !w-full ">
      <header className="w-full fixed top-0 left-0 !px-4 !py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img
            src="../../../imagenes/logo1.png"
            className="!w-full !h-[80px]"
          />
        </Link>

        <div className="flex items-center !gap-2">
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
        className="w-full fixed top-0 left-0 opacity-25"
      />

      <div className="loginBox card !w-[600px] !h-[auto] !pb-20 mx-auto !pt-20 relative z-50 ">
        <div className="text-center">
          <img src="../../../imagenes/logoMaquina1.png" className="m-auto " />
        </div>

        <h1 className="!text-center !text-gray-800 !text-[24px] !font-bold !mt-4">
          ¡BIENVENIDOS DE NUEVO! <br />
          <span className="text-blue-800">
            PUEDES CAMBIAR TU CONTRASEÑA DESDE AQUÍ
          </span>
        </h1>

        <br />

        <form className="w-full !px-8 !mt-3">
          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">NUEVA CONTRASEÑA</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow === false ? "password" : "text"}
                className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
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

          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">
              CONFIRMAR CONTRASEÑA
            </h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow2 === false ? "password" : "text"}
                className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
              />

              <Button
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px]"
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
              >
                {isPasswordShow2 === false ? (
                  <ImEye className="!text-[20px] !text-gray-950" />
                ) : (
                  <ImEyeBlocked className="!text-[20px] !text-gray-950" />
                )}
              </Button>
            </div>
          </div>

          <Button className="btn-lg !w-full">CAMBIAR CONTRASEÑA</Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
