import Button from "@mui/material/Button";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";

const ForgotPassword = () => {
  return (
    <section className="!bg-[#fff] !w-full !h-[100vh]">
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

        <h1 className="!text-center !text-gray-800 !text-[25px] !font-bold !mt-4">
          TIENES PROBLEMAS PARA INICIAR SESIÓN ? <br />
          <span className="text-blue-800">RESTABLECE TU CONTRASEÑA</span>
        </h1>

        <br />

        <form className="w-full !px-8 !mt-3">
          <div className="form-group !mb-4 w-full">
            <h4 className="text-[15px] font-bold !mb-1">CORREO ELECTRÓNICO</h4>
            <input
              type="email"
              className="w-full h-[50px] border-2 !border-gray-400 rounded-md
               focus:!border-gray-950 focus:outline-none !px-3 "
              placeholder="INGRESA TU CORREO ELECTRÓNICO"
            />
          </div>

          <Button className="btn-lg !w-full">RESTABLECER CONTRASEÑA</Button>

          <div className="text-center !mt-3 flex items-center justify-center !gap-4">
            <span>NO QUIERES RESTABLECER ?</span>
            <Link
              to="/forgot-password"
              className="text-blue-950 font-[600] !text-[15px] hover:underline hover:!text-gray-950
                          transition-all duration-300"
            >
              INICIAR SESIÓN
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
