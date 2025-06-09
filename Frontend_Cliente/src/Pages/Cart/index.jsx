import React from "react";
import Button from "@mui/material/Button";
import { FaCashRegister } from "react-icons/fa6";
import CartItems from "./cartItems";

const CartPage = () => {
  return (
    <section className="section !py-5 !pb-5">
      <div className="container w-[80%] max-w-[80%] flex !gap-5">
        <div className="leftPart w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold] font-bold text-[20px]">TU CARRITO</h2>
              <p className="!mt-2 !mb-2 text-[#000] font-[600]">
                ESTOS SON <span className="font-bold text-[#ec370a]"> 2 </span>
                PRODUCTOS EN TU CARRITO
              </p>
            </div>
            <CartItems size="S" qty={1} />
            <CartItems size="S" qty={1} />
            <CartItems size="S" qty={1} />
            <CartItems size="S" qty={1} />
            <CartItems size="S" qty={1} />
            <CartItems size="S" qty={1} />
          </div>
        </div>

        <div className="rightPart w-[30%]">
          <div className="shadow-md rounded-md bg-white !p-5">
            <h3 className="font-[bold] font-bold !pb-2 ">TOTAL DE CARRITO</h3>
            <hr />

            <p className="flex items-center justify-between !mt-3">
              <span className="text-[14px] font-[500]">SUBTOTAL</span>
              <span className="text-[#0a7fec] font-bold">$369.69</span>
            </p>

            <p className="flex items-center justify-between">
              <span className="text-[14px] font-[500]">ENVIO</span>
              <span className="text-[#274a72] font-bold">GRATIS</span>
            </p>

            <p className="flex items-center justify-between">
              <span className="text-[14px] font-[500]">DESTINO</span>
              <span className="text-[#274a72] font-bold">QUITO</span>
            </p>

            <p className="flex items-center justify-between">
              <span className="text-[14px] font-[500]">TOTAL</span>
              <span className="text-[#0a7fec] font-bold">$369.69</span>
            </p>

            <br />
            <Button className="btn-org btn-lg w-full flex !gap-2">
              <FaCashRegister className="text-[25px]" />
              PASAR POR CAJA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
