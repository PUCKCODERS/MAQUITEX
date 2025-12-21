import React, { useContext } from "react";
import { Button } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from "../../App";

const Checkout = () => {
  const context = useContext(MyContext);

  return (
    <section className="!py-5">
      <div className="container flex !gap-5">
        <div className="leftCol w-[70%]">
          <div className="card bg-white shadow-md !p-5 rounded-md w-full"></div>
        </div>

        <div className="rightCol w-[30%]">
          <div className="card shadow-md bg-white !p-5 rounded-md">
            <h2 className="mb-4">TU ORDEN</h2>

            <div className="flex items-center justify-between !py-3 border-t border-b border-[#b8b8b8]">
              <span className="text-[14px] font-[600]">PRODUCTO</span>
              <span className="text-[14px] font-[600]">SUBTOTAL</span>
            </div>

            <div className="mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden !pr-2">
              {context?.cartData?.length !== 0 &&
                context?.cartData?.map((item, index) => {
                  return (
                    <div className="flex items-center justify-between !py-2 border-b border-[#d1d1d1]">
                      <div className="part1 flex items-center !gap-3">
                        <div className="img !w-[50px] !h-[50px] object-cover overflow-hidden border-1 border-[#8998aa] rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                          <img
                            key={index}
                            src={item?.image}
                            className="w-full group-hover:scale-105 overflow-hidden !h-[50px]"
                          />
                        </div>
                        <div className="info">
                          <h4
                            className="text-[10px]"
                            title={item?.productTitle}
                          >
                            {item?.productTitle?.substr(0, 35) + "..."}
                          </h4>
                          <span className="text-[9px] ">
                            CANT: {item?.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-[#0a7fec]">
                        &#36; {item?.quantity * item?.price}
                      </span>
                    </div>
                  );
                })}
            </div>

            <Button className="btn-org btn-lg w-full flex !gap-2 items-center !mt-3">
              <IoBagCheck className="text-[25px]" />
              CONFIRMAR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
