import Button from "@mui/material/Button";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";

const Login = () => {
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  return (
    <section className="!bg-[#fff] !w-full !h-full fixed top-0 left-0 ">
      <header className="w-full fixed top-0 left-0 !px-4 !py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img
            src="../../../imagenes/logo1.png"
            className="!w-full !h-[80px]"
          />
        </Link>

        <div className="flex items-center !gap-2">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !px-5 !text-gray-200 !bg-gray-800 flex !gap-2">
              <FiLogIn className="!text-[20px]" />
              INICIAR SESION
            </Button>
          </NavLink>

          <Button className="!rounded-full !px-5 !text-gray-200 !bg-gray-800 flex !gap-2">
            <MdAssignmentInd className="!text-[20px]" />
            REGISTRARSE
          </Button>
        </div>
      </header>
      <img
        src="../../../imagenes/Login/fondo8.jpg"
        className="w-full fixed top-0 left-0 opacity-25"
      />

      <div className="loginBox card !w-[45%] !h-[300px] mx-auto !mt-20  z-50 ">
        <div className="text-center">
          <img src="../../../imagenes/logoMaquina.png" className="m-auto " />
        </div>

        <h1 className="!text-center !text-gray-800 !text-[25px] !font-bold !mt-4">
          ¡BIENVENIDOS DE NUEVO! <br />
          INICIE SESIÓN CON SUS CREDENCIALES.
        </h1>

        <div className="flex items-center justify-center w-full !mt-5 !gap-4">
          <LoadingButton
            className="  !text-gray-800 !border-gray-800  hover:!text-white  hover:!bg-gray-800 !px-5 !py-2 !text-[14px] flex items-center justify-center transition-all duration-300"
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
          >
            INICIE SESION CON GOOGLE
          </LoadingButton>

          <LoadingButton
            className="  !text-gray-800 !border-gray-800  hover:!text-white hover:!bg-gray-800 !px-5 !py-2 !text-[14px] flex items-center justify-center transition-all duration-300"
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FaSquareFacebook />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
          >
            INICIE SESION CON FACEBOOK
          </LoadingButton>
        </div>
      </div>
    </section>
  );
};

export default Login;
