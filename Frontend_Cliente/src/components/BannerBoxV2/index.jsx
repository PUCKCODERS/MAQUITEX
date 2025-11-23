import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 bg-white w-full overflow-hidden rounded-md group relative !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72]">
      <img
        src={props?.image}
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
        <h2 className="text-[15px] font-[bold] text-[#000]">
          {props?.item?.bannerTitle.substr(0, 60)}
        </h2>
        <span className="text-[18px] text-[#082c55] font-[bold] !w-full">
          &#36; {props?.item?.price}
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
