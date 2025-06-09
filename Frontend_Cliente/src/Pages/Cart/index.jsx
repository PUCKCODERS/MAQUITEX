import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";

const CartPage = () => {
  return (
    <section className="section !py-5 ">
      <div className="container w-[80%] max-w-[80%] flex">
        <div className="leftPart w-[75%]">
          <h2 className="font-[bold] font-bold text-[20px]">TU CARRITO</h2>
          <p className="!mt-0 !mb-2 text-[#000]">
            ESTOS SON <span className="font-bold text-[#274a72]"> 2 </span>
            PRODUCTOS EN TU CARRITO
          </p>

          <div className="shadow-md rounded-md !p-5 bg-white">
            <div className="cartItem w-full !p-3 flex items-center !gap-4">
              <div className="img w-[20%] rounded-md overflow-hidden shadow-[5px_5px_5px_#274a72]">
                <Link to="/product/7845" className="group">
                  <img
                    src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                    className="!w-[200px] !h-[200px] group-hover:scale-105 transition-all"
                  />
                </Link>
              </div>

              <div className="info w-[80%] relative">
                <RiDeleteBin5Fill className="absolute top-[-60px] right-[-10px] cursor-pointer text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all" />
                <span className="text-[13px] font-[400]">MAQUINA SINGER</span>
                <h3 className="text-[15px] font-bold font-[bold]">
                  <Link className="link">
                    MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ 9610SA-D3-M-3
                  </Link>
                </h3>

                <div className="flex items-center !gap-4 !mt-2">
                  <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]">
                    TAMAÑO <GoTriangleDown />
                  </span>
                </div>

                <div className="flex items-center !gap-4 !mt-2">
                  <span className="price text-[#0a7fec] text-[17px] font-[600]">
                    $69.00
                  </span>
                  <span className="oldPrice line-through text-[#b8b8b8] text-[15px] font-[500]">
                    $99.00
                  </span>

                  <span className="price text-[#ec370a] text-[17px] font-[600]">
                    39% <span className="text-[10px]">DESCUENTO</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
