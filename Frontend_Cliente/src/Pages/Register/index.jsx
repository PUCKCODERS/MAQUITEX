import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { FaEye } from "react-icons/fa6";
import { FaEyeLowVision } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

const Register = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.openAlertBox("error", "POR FAVOR AGREGUE SU NOMBRE COMPLETO");
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "POR FAVOR AGREGUE SU CORREO ELECTRÓNICO");
      return false;
    }

    if (formFields.password === "") {
      context.openAlertBox("error", "POR FAVOR AGREGUE SU CORREO CONTRASEÑA");
      return false;
    }

    postData("/api/user/register", formFields).then((response) => {
      console.log(response);
    });
  };

  return (
    <section className="section !py-10">
      <div className="container">
        <div className="card w-[500px] !m-auto rounded-md bg-white !p-5 !px-10 shadow-[7px_7px_5px_#274a72]">
          <h3 className="text-center text-[20px] font-[bold] font-bold">
            REGÍSTRESE CON UNA NUEVA CUENTA
          </h3>

          <form className="w-full !mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full !mb-5">
              <TextField
                type="text"
                id="name"
                name="name"
                label="NOMBRE COMPLETO *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group w-full !mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="CORREO ELECTRÓNICO *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full !mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                name="password"
                label="CONTRASEÑA *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#274a72]"
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

            <div className="flex items-center w-full !mt-3 !mb-3">
              <Button
                type="submit"
                variant="contained"
                className="btn-org btn-lg w-full"
              >
                REGISTRARSE
              </Button>
            </div>

            <p className="text-center text-black">
              YA TIENES UNA CUENTA?
              <Link
                className="link text-[14px] font-[600] !text-[#d82c0e] !ml-2"
                to="/login"
              >
                INICIAR SESION
              </Link>
            </p>

            <p className="text-center font-[500] !mb-3">
              O INICIAR CON RED SOCIAL
            </p>

            <Button
              className="flex !gap-3 w-full !bg-[#f1f1f1] btn-lg
            !text-black !shadow-[5px_5px_7px_#7994b1] hover:!bg-[#e4e4e4] hover:!shadow-[5px_5px_5px_#7994b1] !mb-3"
            >
              <FcGoogle className="text-[20px]" /> INICIAR CON GOOGLE
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
