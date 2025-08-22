import React, { useContext, useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  const verityOTP = (e) => {
    e.preventDefault();

    const actionType = localStorage.getItem("actionType");

    if (actionType !== "forgot-password") {
      postData("/api/user/verifyEmail", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          localStorage.removeItem("userEmail");
          history("/login");
        } else {
          context.alertBox("error", res?.message);
        }
      });
    } else {
      postData("/api/user/verify-forgot-password-otp", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      }).then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);
          history("/forgot-password");
        } else {
          context.alertBox("error", res?.message);
        }
      });
    }
  };

  return (
    <section className="section !py-10">
      <div className="container">
        <div className="card w-[400px] !m-auto rounded-md bg-white !p-5 !px-10 shadow-[7px_7px_5px_#274a72]">
          <div className="text-center flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8286/8286772.png"
              width="100"
            />
          </div>
          <h3 className="text-center text-[20px] font-[bold] font-bold !mt-4 !mb-1">
            VERIFICAR CODIGO
          </h3>

          <p className="text-center text-black font-[600] !mt-0 !mb-4">
            ENVIADO A :
            <span className=" !ml-3 !text-[#274a72]">
              {localStorage.getItem("userEmail")}
            </span>
          </p>

          <form onSubmit={verityOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center !mt-5 !px-3">
              <Button type="submit" className="w-full btn-org btn-lg">
                CONFIRMAR CODIGO
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
