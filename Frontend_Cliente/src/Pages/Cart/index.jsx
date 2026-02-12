import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { FaCashRegister } from "react-icons/fa6";
import CartItems from "./cartItems";
import { MyContext } from "../../App";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const context = useContext(MyContext);

  return (
    <section className="section !py-4 lg:!py-8 !pb-10">
      <div className="container w-[80%] max-w-[80%] flex !gap-5 !flex-col lg:!flex-row">
        <div className="leftPart !w-full lg:!w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            {context?.cartData?.length === 0 ? (
              <div className="flex items-center justify-center flex-col !pt-[30px] !gap-1">
                <p className="!text-[#38597e] !text-[9px] !font-[600] !mb-1 !mt-4 !max-w-xs lg:!p-0 !p-6 !px-6 lg:!px-0">
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
                    href="/my-list"
                    className="text-blue-600 hover:text-blue-800 !mx-2"
                  >
                    IR A MIS FAVORITOS
                  </a>
                  <span className="text-gray-400">|</span>
                  <a
                    href="/productListing"
                    className="text-blue-600 hover:text-blue-800 !mx-1"
                  >
                    PRODUCTOS
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
                  <h2 className="font-[bold]  !text-[15px] sm:!text-[18px] md:!text-[20px] lg:!text-[25px] flex justify-center">
                    TU CARRITO
                  </h2>
                  <p className="!mt-2 !mb-2 text-[#556f8d] !text-[11px] sm:!text-[13px] md:!text-[15px] lg:!text-[20px] font-[600] flex justify-center">
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

        <div className="rightPart w-full lg:w-[30%]">
          <div className="shadow-md rounded-md bg-white !p-5 sticky !top-[155px] z-[90]">
            <h3 className="font-[bold] font-bold !pb-2 flex items-center !justify-center">
              TOTAL DE CARRITO
            </h3>
            <hr />

            <p className="flex items-center justify-between !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] !mt-3 !mb-0 sm:!mb-2 md:!mb-2 lg:!mb-0">
              <span className="!text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] font-bold">
                SUBTOTAL
              </span>
              <span className="text-[#0a7fec] ">
                {(context.cartData?.length !== 0
                  ? context.cartData
                      ?.map((item) => parseInt(item.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )
                  ?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .replace("$", "$ ")}
              </span>
            </p>

            <p className="flex items-center justify-between !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] !mb-0 sm:!mb-2 md:!mb-2 lg:!mb-0">
              <span className="!text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] font-bold">
                ENVIO
              </span>
              <span className="text-green-600 !font-bold ">
                GRATIS{" "}
                <span className="font-[bold]  text-[#7994b1] !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px]">
                  (SOLO QUITO)
                </span>
              </span>
            </p>

            <p className="flex items-center justify-between !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] !mb-0 sm:!mb-2 md:!mb-2 lg:!mb-0">
              <span className="!text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] font-[500]">
                CANTIDAD TOTAL DE PRODUCTOS
              </span>
              <span className="text-[#0a7fec]">
                {context.cartData?.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </span>
            </p>

            <p className="flex items-center justify-between  !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] ">
              <span className="!text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px] font-bold">
                TOTAL{" "}
                <span className="font-[bold] text-[#7994b1] !text-[10px] sm:!text-[14px] md:!text-[14px] lg:!text-[10px]">
                  (INCLUIDO IVA)
                </span>
              </span>
              <span className="text-[#0a7fec] ">
                {(context.cartData?.length !== 0
                  ? context.cartData
                      ?.map((item) => parseInt(item.price) * item.quantity)
                      .reduce((total, value) => total + value, 0)
                  : 0
                )
                  ?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .replace("$", "$ ")}
              </span>
            </p>

            <br />
            <Link to="/checkout">
              <Button className="btn-org btn-lg w-full flex !gap-2">
                <FaCashRegister className="!text-[25px]" />
                PASAR POR CAJA
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
