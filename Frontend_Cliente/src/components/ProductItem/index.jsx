import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App"; // Adjust the import path as necessary

const ProductItem = () => {
  const context = useContext(MyContext);

  return (
    <div className="productItem bg-white !rounded-md !overflow-hidden !border-1 !border-[#b1cdee] shadow-[5px_5px_5px_#274a72]">
      <div className="group imgWrapper !w-[100%] !overflow-hidden !rounded-md relative">
        <Link to="/">
          <div className="img !h-[200px] !overflow-hidden">
            <img
              src="https://singerlatam.com/ecuador/wp-content/uploads/sites/13/2022/10/maquina-de-coser-m3305-1024x1024.jpeg"
              className="!left-0 !top-0 !w-[300px] !h-[200px] !rounded-md"
            />

            <img
              src="https://singerlatam.com/ecuador/wp-content/uploads/sites/13/2022/10/maquina-de-coser-m3305-01-1024x1024.jpeg"
              className="!left-0 !top-0 !w-[300px] !h-[200px] transition-all duration-700 !rounded-md absolute opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[0px] left-[0px] !z-50 bg-[#e05e12] text-white !rounded-lg !p-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col !w-[30px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#f10606] !border-1 !border-[#f3b8b8]  hover:!bg-white hover:!text-[#f10606]">
            <FaHeart className="" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#082c55] !border-1 !border-[#b1cdee] hover:!bg-white hover:!text-[#082c55]">
            <IoGitCompare className="" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#082c55] !border-1 !border-[#b1cdee] hover:!bg-white hover:!text-[#082c55]"
            onClick={() => context.setOpenProductDetailsModal(true)}
          >
            <MdZoomOutMap className="" />
          </Button>
        </div>
      </div>

      <div className="info !p-3 !py-4 !bg-gray-100">
        <h6 className="text-[13px] text-[#556f8d] font-[bold]">
          <Link to="/" className="link transition-all">
            MAQUINA CASERA
          </Link>
        </h6>
        <h3 className="text-[13px] !title !mt-1 font-[500] !text-[#082c55] !mb-1">
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
