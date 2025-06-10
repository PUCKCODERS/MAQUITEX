import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { FaEye } from "react-icons/fa6";
import { FaEyeLowVision } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const histoty = useNavigate();

  const forgotPassword = () => {
    context.openAlertBox("success", "VERIFICACION ENVIADA A TU CORREO");
    histoty("/verify");
  };

  return (
    <section className="section !py-10">
      <div className="container">
        <div className="card w-[400px] !m-auto rounded-md bg-white !p-5 !px-10 shadow-[7px_7px_5px_#274a72]">
          <h3 className="text-center text-[20px] font-[bold] font-bold">
            INICIA SESIÓN EN TU CUENTA
          </h3>

          <form className="w-full !mt-5">
            <div className="form-group w-full !mb-5">
              <TextField
                type="email"
                id="email"
                label="CORREO ELECTRÓNICO *"
                variant="outlined"
                className="w-full"
                name="name"
              />
            </div>

            <div className="form-group w-full !mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                label="CONTRASEÑA *"
                variant="outlined"
                className="w-full"
                name="password"
              />
              <Button
                className="!absolute !top-[10px] !right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#274a72]"
                onClick={() => {
                  setIsPasswordShow(!isPasswordShow);
                }}
              >
                {isPasswordShow === false ? (
                  <FaEye className="text-[20px] opacity-75" />
                ) : (
                  <FaEyeLowVision className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <a
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              OLVIDASTE TU CONTRASEÑA ?
            </a>

            <div className="flex items-center w-full !mt-3 !mb-3">
              <Button
                variant="contained"
                className="btn-org btn-lg !w-full !mb-3"
              >
                INICIAR SESIÓN
              </Button>
            </div>

            <p className="text-center text-black">
              NO ESTÁS REGISTRADO ?
              <Link
                className="link text-[14px] font-[600] !text-[#d82c0e] !ml-2"
                to="/register"
              >
                REGISTRARSE
              </Link>
            </p>

            <p className="text-center font-[500] !mb-3">
              O INICIAR CON RED SOCIAL
            </p>

            <Button
              className="flex !gap-3 w-full !bg-[#f1f1f1] btn-lg
            !text-black !shadow-[5px_5px_7px_#7994b1] hover:!bg-[#e4e4e4] hover:!shadow-[5px_5px_7px_#7994b1]"
            >
              <FcGoogle className="text-[20px]" /> INICIAR CON GOOGLE
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
