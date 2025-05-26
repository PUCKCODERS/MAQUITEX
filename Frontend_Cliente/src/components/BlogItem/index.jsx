import React from "react";
import { FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

const BlogItem = () => {
  return (
    <div className="blogItem group">
      <div className="imgWrapper w-full overflow-hidden rounded-md border-2 border-[#274a72] cursor-pointer relative">
        <img
          src="https://www.hostinger.es/tutoriales/wp-content/uploads/sites/7/2019/02/Que-es-un-blog.png"
          className="w-full transition-all group-hover:scale-105 group-hover:rotate-0"
          alt="blog image"
        />

        <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] !z-50 bg-[#556f8d] rounded-md !p-1 text-[15px] font-[500] gap-1">
          <FcOvertime className="text-[20px]" /> 6 MARZO, 2025
        </span>
      </div>

      <div className="info !py-4">
        <h2 className="text-[12px] font-[600] text-[#556f8d] !mb-1">
          <Link to="/" className="link">
            TITULO DEL ARTICULO DE INTERES
          </Link>
        </h2>
        <p className="text-[11px] font-[400] text-[#6c8199] !mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          praesentium sunt, perferendis aliquam unde nisi. . . . . . . . .
        </p>

        <Link className="link font-[bold] text-[12px] flex items-center !gap-2">
          SEGUIR LEYENDO <BsBoxArrowUpRight className="text-[14px]" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
