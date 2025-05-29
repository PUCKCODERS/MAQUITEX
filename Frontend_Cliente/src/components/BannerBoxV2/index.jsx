import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 bg-white w-full overflow-hidden rounded-md group relative shadow-lg">
      <img
        src={props.image}
        className={`!w-full !h-[195px] !rounded-md transition-all duration-150 group-hover:scale-105 
    
  `}
      />

      <div
        className={`info absolute !p-5 !top-0 ${
          props.info === "left" ? "!left-0" : "!right-0"
        } w-[70%] h-[100%] !z-50 flex items-center justify-center flex-col !gap-2
        ${props.info === "left" ? "" : "!pl-8"} 
        `}
      >
        <h2 className="text-[15px] font-[700] text-[#082c55]">
          MAQUINA SINGER COLOR SILVER
        </h2>
        <span className="text-[13px] text-[#047ae9] font-[600] !w-full">
          $369.99
        </span>
        <div className="!w-full">
          <Link
            to="/"
            className="text-[10px] font-[bold] font-bold link text-[#000]"
          >
            COMPRAR AHORA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
