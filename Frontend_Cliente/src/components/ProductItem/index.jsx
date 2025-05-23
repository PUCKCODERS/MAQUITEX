import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductItem = () => {
  return (
    <div className="productItem !rounded-md !overflow-hidden !border-1 !border-gray-200 shadow-md">
      <div className="imgWrapper !w-[100%] !h-[200px] !overflow-hidden !rounded-md relative">
        <img
          src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
          className="!left-0 !top-0 !w-[300px] !h-[200px] !rounded-md"
        />
        <span className="discount flex items-center absolute top-[0px] left-[0px] !z-50 bg-[#e05e12] text-white !rounded-lg !p-1 text-[12px] font-[500]">
          10%
        </span>
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
