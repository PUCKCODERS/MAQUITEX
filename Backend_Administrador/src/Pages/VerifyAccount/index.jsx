import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import OtpBox from "../../Components/OtpBox";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  const verityOTP = (e) => {
    e.preventDefault();

    if (otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");

      if (actionType !== "forgot-password") {
        postData("/api/user/verifyEmail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.alertBox("success", res?.message);
            localStorage.removeItem("userEmail");
            setIsLoading(false);
            history("/login");
          } else {
            context.alertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.alertBox("success", res?.message);
            history("/change-password");
          } else {
            context.alertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      }
    } else {
      context.alertBox("error", "PORFAVOR INGRESE EL CÓDIGO");
    }
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
          <img
            src="../../../imagenes/verify.png "
            className="w-[75px] sm:w-[150px] lg:w-[100px] md:w-[100px] m-auto"
          />
        </div>

        <h1 className="!text-center !text-gray-800  text-[15px] sm:text-[25px] !font-bold !mt-4 ">
          ¡BIENVENIDOS DE NUEVO! <br />
          <span className="text-blue-800">POR FAVOR VERIFIQUE SU CUENTA</span>
        </h1>

        <p className="text-center text-black font-[600]  !mb-4 text-[12px] sm:text-[15px] !mt-4">
          ENVIADO A: &nbsp;
          <span className="!ml-3 !text-[#274a72] font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>
        <br />

        <form onSubmit={verityOTP}>
          <div className="text-center flex items-center justify-center flex-col ">
            <OtpBox length={6} onchange={handleOtpChange} />
          </div>
          <div className="w-[300px] m-auto !mt-4">
            <Button type="submit" className="btn-blue w-full">
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "CONFIRMAR CÓDIGO"
              )}
            </Button>
          </div>
        </form>
        <br />
      </div>
    </section>
  );
};

export default VerifyAccount;
