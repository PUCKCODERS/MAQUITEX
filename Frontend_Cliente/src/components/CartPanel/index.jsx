import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const CartPanel = (props) => {
  const context = useContext(MyContext);

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then(() => {
      context.alertBox("success", "PRODUCTO ELIMINADO");
      context.getCartItems();
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="scroll !w-full flex-1 overflow-y-auto overflow-x-hidden !py-3 !px-4">
        {props?.data?.map((item, index) => {
          return (
            <div className="cartItem w-full flex items-center !gap-4 border-b border-[#d1d1d1] !pb-4 !mb-2">
              <div className="img w-[25%] shrink-0 overflow-hidden !h-[100px] border-1 border-[#8998aa] rounded-md shadow-[3px_3px_3px_#274a72]">
                <Link
                  to={`/product/${item?.productId}`}
                  className="block group"
                >
                  <img
                    key={index}
                    src={item?.image}
                    className="w-full group-hover:scale-105 overflow-hidden !h-[100px]"
                  />
                </Link>
              </div>

              <div className="info w-[75%] !pr-5 !relative !pt-3">
                <h4 className="text-[14px] !font-bold !text-[#556f8d] hover:!text-[#20446d]">
                  <Link to={`/product/${item?.productId}`}>
                    {item?.productTitle?.substr(0, 80)}
                  </Link>
                </h4>
                <p className="flex items-center !text-[12px] !gap-5 !mt-2 !mb-2">
                  <span>
                    <span className="!text-[#556f8d] !font-bold">CANT: </span>
                    <span className="text-[#0a7fec] font-bold">
                      {item?.quantity}
                    </span>
                  </span>
                  <span className="text-[#0a7fec] font-bold">
                    <span className="!text-[#556f8d] !font-bold">
                      PRECIO.U:{" "}
                    </span>{" "}
                    {item?.price
                      ?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .replace("$", "$ ")}
                  </span>
                </p>

                <RiDeleteBin5Fill
                  className="!absolute top-[1px] right-[1px] cursor-pointer text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all"
                  onClick={() => removeItem(item?._id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Se elimina el <br /> para que el layout flexible funcione correctamente. */}
      <div className="bottomSec w-full shrink-0 overflow-hidden !pr-5">
        <div className="bottomInfo !py-3 !px-4 w-full border-t border-[#d1d1d1] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px]  !text-[#556f8d] !font-bold">
              {context?.cartData?.length} PRODUCTOS
            </span>
            <span className="text-[#0a7fec]  font-bold">
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
          </div>
        </div>

        <div className="bottomInfo !py-3 !px-4 w-full border-t border-[#d1d1d1] flex items-center justify-between">
          <span className="text-[14px]  !text-[#556f8d] !font-bold">
            CANTIDAD TOTAL DE PRODUCTOS
          </span>
          <span className="text-[#0a7fec] font-bold">
            {context.cartData?.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>

        <div className="bottomInfo !py-3 !px-4 w-full border-t border-[#d1d1d1] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full ">
            <span className="text-[14px]  !text-[#556f8d] !font-bold">
              TOTAL FINAL{" "}
              <span className="text-red-600 text-[10px]">(INCLUIDO IVA)</span>
            </span>
            <span className="text-[#0a7fec]  font-bold">
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
          </div>

          <br />
          <div className="flex items-center justify-between w-full !gap-5 !mb-5 !-mt-3">
            <Link
              to="/cart"
              className="w-[50%] d-block"
              onClick={context.toggleCartPanel(false)}
            >
              <Button className="btn-org btn-lg w-full">CARRITO</Button>
            </Link>
            <Link
              to="/checkout"
              className="w-[50%] d-block"
              onClick={context.toggleCartPanel(false)}
            >
              <Button className="btn-org btn-border btn-lg w-full">CAJA</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
