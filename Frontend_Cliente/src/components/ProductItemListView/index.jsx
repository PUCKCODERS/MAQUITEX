import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { MyContext } from "../../App"; // Adjust the import path as necessary

const ProductItem = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="productItem bg-white !rounded-md !overflow-hidden !border-1 !border-[#b1cdee] shadow-[5px_5px_5px_#274a72] flex items-center">
      <div className="group imgWrapper !w-[25%] !top-0 !overflow-hidden !rounded-md relative">
        <Link to="/">
          <div className="img !overflow-hidden">
            <img
              src={props?.item?.images[0]}
              className="!left-0 !top-0 !w-[300px] !h-[200px] !rounded-md"
            />

            <img
              src={props?.item?.images[1]}
              className="!left-0 !top-0 !w-[300px] !h-[200px] transition-all duration-700 !rounded-md absolute opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute !top-[0px] !left-[10px] !z-50 bg-[#e05e12] text-white !rounded-lg !p-1 text-[12px] font-[500]">
          {props?.item?.discount}%
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

      <div className="info !p-3 !py-4 !bg-white w-[75%]">
        <h6 className="text-[15px] !font-[500] text-[#556f8d]">
          <Link to="/" className="link transition-all">
            {props?.item?.catName} / {props?.item?.subCat} /
            {props?.item?.thirdsubCat} / {props?.item?.brand}
          </Link>
        </h6>
        <h3 className="text-[18px] title !mt-3 font-[bold] font-bold !mb-1 !text-[#082c55]">
          <Link to="/" className="link transition-all">
            {props?.item?.name}
          </Link>
        </h3>

        <p className="text-[14px] text-[#000] font-[bold] !mb-3">
          {props?.item?.description?.substr(0, 250) + "..."}
        </p>

        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center !gap-4">
          <span className="oldPrice line-through text-red-400 text-[13px] font-[500]">
            &#36; {props?.item?.oldPrice}
          </span>
          <span className="price text-[#082c55] text-[15px] font-[600]">
            &#36; {props?.item?.price}
          </span>

          <div className="!mt-0 ">
            <Button className="btn-org btn-sm !text-[15px] !gap-2">
              AGREGAR <GiShoppingCart class="text-[25px] scale-x-[-1]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
