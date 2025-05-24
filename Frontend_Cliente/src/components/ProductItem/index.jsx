import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";

const ProductItem = () => {
  return (
    <div className="productItem bg-white !rounded-md !overflow-hidden !border-1 !border-[#b1cdee] shadow-[5px_5px_5px_#274a72]">
      <div className="group imgWrapper !w-[100%] !h-[200px] !overflow-hidden !rounded-md relative">
        <img
          src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
          className="!left-0 !top-0 !w-[300px] !h-[200px] !rounded-md"
        />
        <span className="discount flex items-center absolute top-[0px] left-[0px] !z-50 bg-[#e05e12] text-white !rounded-lg !p-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col !w-[30px] transition-all duration-300 group-hover:top-[15px]">
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !border-1 !border-[#f7adad]  hover:!bg-[#f3b8b8] ">
            <FaHeart className="!text-[18px] !text-[#f58686] group-hover:text-white hover:!text-[#f10606]" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !border-1 !border-[#b1cdee] hover:!bg-[#b1cdee] ">
            <IoGitCompare className="!text-[18px] !text-[#556f8d] group-hover:text-white hover:!text-[#082c55]" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !border-1 !border-[#b1cdee] hover:!bg-[#b1cdee]  ">
            <MdZoomOutMap className="!text-[18px] !text-[#556f8d] group-hover:text-white hover:!text-[#082c55]" />
          </Button>
        </div>
      </div>

      <div className="info !p-3 !py-4 !bg-gray-100">
        <h6 className="text-[13px] !text-[#2e4157] font-[bold]">
          <Link to="/" className="link transition-all">
            MAQUINA CASERA
          </Link>
        </h6>
        <h3 className="text-[13px] !title !mt-1 font-[500] !mb-1">
          <Link to="/" className="link transition-all">
            MAQUINA CASERA SINGER COLOR SILVER
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center justify-between !gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $69.99
          </span>
          <span class="price text-[#0a7fec] text-[17px] font-[600]">
            $99.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
