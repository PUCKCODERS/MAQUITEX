import React from "react";
import "../BannerBoxV3/style.css";
import { Link } from "react-router-dom";

const BannerBoxV3 = (props) => {
  return (
    <div className="bannerBoxV3 bg-white w-full overflow-hidden rounded-md group relative !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72]">
      <img
        src={props?.image}
        className={`!w-full !h-[250px] !rounded-md transition-all duration-150 group-hover:scale-105 
    
  `}
      />

      <div
        className={`info absolute !p-5 !top-0  ${
          props.info === "left" ? "!left-0" : "!right-0"
        } w-[70%] h-[100%] !z-50 flex items-center justify-center flex-col !gap-2
        ${props.info === "left" ? "" : "!pl-8"} 
        `}
      >
        <h2 className="text-[25px] font-[bold] text-[#082c55]">
          {props?.item?.bannerTitle}
        </h2>

        <div className="!w-full">
          <Link
            to="/"
            className="text-[10px] font-[bold] font-bold link text-[#000]"
          >
            SUB CATEGORIA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV3;
