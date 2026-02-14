import React from "react";
import { FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

const BlogItem = (props) => {
  return (
    <div className="blogItem group !mr-2">
      <div className="imgWrapper !w-full overflow-hidden rounded-md !border-1 !border-[#b1cdee] shadow-[3px_3px_3px_#274a72] cursor-pointer relative">
        <img
          src={props?.item?.images[0]}
          className="!w-full !h-[150px] transition-all group-hover:scale-105 group-hover:rotate-0"
          alt="blog image"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] !z-50 bg-[#556f8d] rounded-md !p-1 text-[15px] font-[500] gap-1">
          <FcOvertime className="text-[20px]" />{" "}
          {props?.item?.createdAt?.split("T")[0]}
        </span>
      </div>

      <div className="info !py-4">
        <h2 className="text-[13px] lg:text-[15px] font-bold  !mb-1">
          <Link to={props.link || "/"} className="link">
            {props?.item?.title}
          </Link>
        </h2>

        <div
          className="text-[11px] lg:text-[13px] font-[400] text-[#6c8199] !mb-3"
          dangerouslySetInnerHTML={{
            __html: props?.item?.description?.substr(0, 100) + "...",
          }}
        ></div>

        <Link
          to={props.link || "/"}
          className="link font-bold text-[12px] flex items-center !gap-2"
        >
          SEGUIR LEYENDO <BsBoxArrowUpRight className="text-[14px]" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
