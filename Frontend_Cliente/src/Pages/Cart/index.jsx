import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { FaCashRegister } from "react-icons/fa6";
import CartItems from "./cartItems";
import { MyContext } from "../../App";
import { GiShoppingCart } from "react-icons/gi";

const CartPage = () => {
  const context = useContext(MyContext);

  return (
    <section className="section !py-10 !pb-10">
      <div className="container w-[80%] max-w-[80%] flex !gap-5">
        <div className="leftPart w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            {context?.cartData?.length === 0 ? (
              <div className="!py-10 !px-3 flex items-center justify-center">
                <div className="!mt-3 flex flex-col justify-center items-center">
                  <span className="font-bold !text-[#082c55] !text-[20px] ">
                    CARRITO VACÍO
                  </span>

                  <GiShoppingCart className="font-bold !text-[#082c55] !text-[90px] " />

                  <div className="text-center !mt-4 !max-w-xs !p-2">
                    <p className="text-gray-950 !mb-3">
                      ¡Parece que aún no has agregado nada! Explora nuestras
                      categorías y encuentra ese producto que tanto deseas.
                    </p>

                    <button className="bg-[#082c55] text-white font-semibold !py-2 !px-4 rounded transition duration-300 shadow-md">
                      CONTINUAR COMPARNDO Y VER OFERTAS
                    </button>

                    <div className="!mt-3 text-sm">
                      <a
                        href="/favoritos"
                        className="text-blue-600 hover:text-blue-800 !mx-2"
                      >
                        IR A MIS FAVORITOS
                      </a>
                      <span className="text-gray-400">|</span>
                      <a
                        href="/vistos-recientemente"
                        className="text-blue-600 hover:text-blue-800 !mx-1"
                      >
                        COMPARTIDOS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
                  <h2 className="font-[bold]  !text-[25px] flex justify-center">
                    TU CARRITO
                  </h2>
                  <p className="!mt-2 !mb-2 text-[#556f8d] !text-[20px] font-[600] flex justify-center">
                    ESTOS SON
                    <span className="font-bold text-[#ec370a]">
                      &nbsp;{context?.cartData?.length}&nbsp;
                    </span>
                    PRODUCTOS EN TU CARRITO
                  </p>
                </div>

                {context?.cartData.map((item, index) => {
                  return (
                    <CartItems
                      item={item}
                      key={index}
                      size={item.size}
                      ram={item.ram}
                      weight={item.weight}
                      quantity={item?.quantity}
                    />
                  );
                })}
              </>
            )}
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
