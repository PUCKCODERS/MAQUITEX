import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from "../../App";
import { FaPlus } from "react-icons/fa";
import Radio from "@mui/material/Radio";

const Checkout = () => {
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const context = useContext(MyContext);

  useEffect(() => {
    setUserData(context?.userData);
  }, [context?.userData, userData]);

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
    }
  };

  return (
    <section className="!py-5">
      <div className="w-[70%] !m-auto flex !gap-5">
        <div className="leftCol w-[60%]">
          <div className="card bg-white shadow-md !p-5 rounded-md w-full">
            <div className="flex items-center justify-between !mb-3">
              <h2 className="text-[10px]">
                SELECCIONE LA DIRECCIÓN DE ENTREGA
              </h2>
              <Button
                onClick={() => {
                  context?.setOpenAddressPanel(true);
                  context?.setAddressMode("add");
                }}
                className="btn-org btn-sm !gap-2 "
              >
                <FaPlus className="text-[10px]" />{" "}
                <span className="text-[10px]">AGREGAR NUEVA DIRECCIÓN</span>
              </Button>
            </div>

            <div className="flex flex-col !gap-4">
              {userData?.address_details?.length !== 0 ? (
                userData?.address_details?.map((address, index) => {
                  return (
                    <label
                      className={`flex !gap-3 !p-4 border border-[#8998aa] rounded-md shadow-[2px_2px_2px_#082c55] relative ${
                        isChecked === index && "bg-[#aeb9c7] text-[#000]"
                      }`}
                      key={index}
                    >
                      <div>
                        <Radio
                          size="small"
                          onChange={(e) => handleChange(e, index)}
                          checked={isChecked === index}
                        />
                      </div>

                      <div className="info">
                        <span className="inline-block !p-1 !bg-[#082c55] !text-white !font-[700]  !text-[12px] !rounded-sm !mb-2">
                          {address?.addressType}
                        </span>
                        <h3>{userData?.name}</h3>
                        <p className="!mt-0 !mb-0">
                          {address?.address_line1 +
                            ", " +
                            address?.city +
                            ", " +
                            address?.country +
                            ", " +
                            address?.state +
                            ", " +
                            address?.landmark}
                        </p>
                        <p className="!mb-0 font-bold">+{userData?.mobile}</p>
                      </div>

                      <Button
                        size="small"
                        variant="text"
                        className="!absolute !text-[13px] !top-[10px] !right-[15px] btn-org btn-border !size-6 "
                        onClick={() => editAddress(address?._id)}
                      >
                        EDITAR
                      </Button>
                    </label>
                  );
                })
              ) : (
                <>
                  <div className="flex items-center justify-center flex-col !pt-[30px] !gap-1">
                    <h2 className="text-center">
                      ¡NO SE ENCONTRARON DIRECCIONES EN SU CUENTA!
                    </h2>
                    <p className="!mt-0">AGREGA UNA DIRECCIÓN DE ENTREGA</p>

                    <img
                      src="../../../imagenes/person.png"
                      className="w-[200px] !mb-2"
                    />
                    <Button
                      className="btn-org btn-sm"
                      onClick={() => {
                        context?.setOpenAddressPanel(true);
                        context?.setAddressMode("add");
                      }}
                    >
                      AGREGAR DIRECCIÓN
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rightCol w-[40%]">
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
                    <div
                      className="flex !items-center !justify-between !py-2 border-b border-[#d1d1d1]"
                      key={index}
                    >
                      <div className="part1 flex items-center !gap-3">
                        <div className="img !w-[50px] !h-[50px] object-cover overflow-hidden border-1 border-[#8998aa] rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                          <img
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
                          <span className="text-[9px] flex items-center justify-center !gap-8">
                            <span>CANT: {item?.quantity}</span>{" "}
                            <span>
                              PRECIO.U:{" "}
                              {item?.price
                                ?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })
                                .replace("$", "$ ")}
                            </span>
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-[#0a7fec]">
                        {(item?.quantity * item?.price)
                          ?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                          .replace("$", "$ ")}
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
