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
              <div className="flex items-center justify-center flex-col !pt-[30px] !gap-1">
                <p className="!text-[#38597e] !text-[9px] !font-[600] !mb-1 !mt-4 !max-w-xs !p-0">
                  ¡PARECE QUE AÚN NO HAS AGREGADO NADA! EXPLORA NUESTRAS
                  CATEGORÍAS Y ENCUENTRA ESE PRODUCTO QUE TANTO DESEAS
                </p>

                <img
                  src="../../../imagenes/empty-cart.png"
                  className="w-[200px]"
                />
                <Button className="btn-org btn-sm">
                  <a href="/">CONTINUAR COMPRANDO</a>
                </Button>

                <div className="!mt-6 !mb-6 text-sm ">
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
