import React from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";

const AddHomeSlide = () => {
  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form !py-3 !p-8 ">
        <div className="scroll max-h-[70vh]  !pr-4 !pt-1">
          <div className="grid grid-cols-7 !gap-2">
            <div className="uploadBoxWrapper relative">
              <span
                className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
                          -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
              >
                <IoClose className="text-[20px]" />
              </span>
              <div
                className="uploadBox !p-0 rounded-md overflow-hidden border border-[#082c55] h-[150px] w-[100%]
                           bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col "
              >
                <LazyLoadImage
                  className="w-full h-full object-cover"
                  alt={"image"}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                  src={"../../../imagenes/maquinas/maquina.jpg"}
                />
              </div>
            </div>

            <UploadBox multiple={true} />
          </div>
        </div>

        <br />
        <div className="w-[325px]">
          <Button type="button" className="btn-blue btn-lg w-full !gap-2">
            <FaFileUpload className="text-[25px] text-white" />
            PUBLICAR Y VER
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHomeSlide;
