import React, { useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verityOTP = (e) => {
    e.preventDefault();
    alert(otp);
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
            ENVIAR A :
            <span className=" !ml-3 !text-[#274a72]">
              jlc.rodriguez316@gmail.com
            </span>
          </p>

          <form onSubmit={verityOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center !mt-5 !px-3">
              <Button type="submit" className="w-full btn-org btn-lg">
                ENVIAR CODIGO
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
