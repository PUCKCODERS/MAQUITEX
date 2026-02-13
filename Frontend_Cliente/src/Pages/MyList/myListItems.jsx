import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const MyListItems = (props) => {
  const context = useContext(MyContext);

  const removeItem = (id) => {
    deleteData(`/api/myList/${id}`).then(() => {
      context?.alertBox("success", "PRODUCTO ELIMINADO DE MI LISTA");
      context?.getMyListData();
    });
  };

  return (
    <div className="cartItem w-full !p-3 flex items-center !gap-4 !pb-5 border-b border-[#d1d1d1]">
      <div className="img w-[40%] sm:w-[30%] lg:w-[20%] rounded-md overflow-hidden shadow-[3px_3px_3px_#274a72] border-1 border-[#acb1b8]">
        <Link to={`/product/${props?.item?.productId}`} className="group">
          <img
            src={props?.item?.image}
            className="!w-full !h-[180px] group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[60%] sm:w-[70%] lg:w-[80%] relative">
        <RiDeleteBin5Fill
          className="!absolute top-[-5px] lg:top-[-5px] right-[-5px] lg:right-[10px] cursor-pointer text-[20px] lg:text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all"
          onClick={() => removeItem(props?.item?._id)}
        />
        <span className="!text-[11px] sm:!text-[12px] md:!text-[13px] lg:!text-[13px] font-[500]">
          {props?.item?.brand}
        </span>
        <h3 className="!text-[10px] sm:!text-[12px] md:!text-[14px] lg:!text-[15px] !font-[500] !mb-3 !mt-1">
          <Link
            to={`/product/${props?.item?.productId}`}
            className=" !text-[#556f8d] hover:!text-[#20446d]"
          >
            {props?.item?.productTitle?.substr(0, 200)}
          </Link>
        </h3>

        <Rating
          name="size-small"
          value={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center !gap-2 lg:!gap-4 !mt-3">
          <span className="oldPrice line-through text-[#b8b8b8] text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-[500]">
            {props?.item?.oldPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>

          <span className="price text-[#0a7fec] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-[600]">
            {props?.item?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>

          <span className="price text-[#ec370a] text-[10px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-[600]">
            {props?.item?.discount}%{" "}
            <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]">
              DESCUENTO
            </span>
          </span>
        </div>

        <br />
      </div>
    </div>
  );
};

export default MyListItems;
