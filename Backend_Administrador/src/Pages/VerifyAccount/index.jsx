import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import OtpBox from "../../Components/OtpBox";

const VerifyAccount = () => {
  const [setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

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
          <img
            src="../../../imagenes/verify.png "
            className="w-[150px] m-auto"
          />
        </div>

        <h1 className="!text-center !text-gray-800 !text-[25px] !font-bold !mt-4">
          ¡BIENVENIDOS DE NUEVO! <br />
          <span className="text-blue-800">POR FAVOR VERIFIQUE SU CUENTA</span>
        </h1>

        <p className="text-center text-black font-[600] !mt-0 !mb-4 text-[15px]">
          ENVIAR A: &nbsp;
          <span className="!ml-3 !text-[#274a72] font-bold">
            jlc.rodriguez316@gmail.com
          </span>
        </p>
        <br />

        <div className="text-center flex items-center justify-center flex-col">
          <OtpBox length={6} onChange={handleOtpChange} />
        </div>
        <br />

        <div className="w-[300px] m-auto ">
          <Button className="btn-blue w-full">CONFIRMAR CODIGO</Button>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
