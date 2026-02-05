import React from "react";
import "../BannerBoxV2/style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 box bg-white w-full overflow-hidden  group relative !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72]">
      <img
        src={props?.image}
        className={`!w-full h-[100px] sm:h-[130px] md:h-[150px] lg:!h-[195px]  transition-all duration-150 group-hover:scale-105 
    
  `}
      />

      <div
        className={`info absolute !p-5 !top-0 ${
          props.info === "left" ? "!left-0" : "!right-0"
        } w-[70%] h-[100%] !z-50 flex items-center justify-center flex-col !gap-2
        ${props.info === "left" ? "" : "!pl-8"} 
        `}
      >
        <Link
          to={`/productListing?thirdLavelCatId=${props?.item?.thirdsubCatId}`}
          className="no-underline"
        >
          <h2 className="!text-[12px] sm:!text-[15px] md:!text-[20px]  lg:!text-[25px] font-[bold] text-gray-700">
            {props?.item?.bannerTitle.substr(0, 60)}
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BannerBoxV2;
