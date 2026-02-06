import React from "react";
import "../BannerBoxV3/style.css";
import { Link } from "react-router-dom";

const BannerBoxV3 = (props) => {
  return (
    <div className="bannerBoxV3 bg-white w-full overflow-hidden rounded-md group relative !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72]">
      <img
        src={props?.image}
        className={`!w-full h-[150px] sm:h-[180px] md:h-[200px] lg:!h-[250px] !rounded-md transition-all duration-150 group-hover:scale-105 
    
  `}
      />

      <div
        className={`info absolute !p-5 !top-0  ${
          props.info === "left" ? "!left-0" : "!right-0"
        } w-[70%] h-[100%] !z-50 flex items-center justify-center flex-col !gap-2
        ${props.info === "left" ? "" : "!pl-8"} 
        `}
      >
        <Link
          to={`/productListing?subCatId=${props?.item?.subCatId}`}
          className="no-underline"
        >
          <h2 className="!text-[12px] sm:!text-[15px] md:!text-[20px]  lg:!text-[25px] font-[bold] text-[#082c55]">
            {props?.item?.bannerTitle}
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BannerBoxV3;
