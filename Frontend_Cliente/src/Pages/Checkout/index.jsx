import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from "../../App";
import { FaPlus } from "react-icons/fa";
import Radio from "@mui/material/Radio";
import { deleteData, postData } from "../../utils/api";
import { BsFillBagCheckFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env
  .VITE_APP_RAZORPAY_KEY_SECRET;

const VITE_API_PAYPAL_CLIENT_ID = import.meta.env.VITE_API_PAYPAL_CLIENT_ID;
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Checkout = () => {
  window.scrollTo(0, 0);
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const context = useContext(MyContext);

  const history = useNavigate();

  useEffect(() => {
    setUserData(context?.userData);
    setSelectedAddress(context?.userData?.address_details[0]?._id);
  }, [context?.userData, userData]);

  useEffect(() => {
    setTotalAmount(
      context.cartData?.length !== 0
        ? context.cartData
            ?.map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0
    )?.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }, [context.cartData]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_API_PAYPAL_CLIENT_ID}&disable-funding=card`;
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: async () => {
            const resp = await fetch(
              "https://v6.exchangerate-api.com/v6/8f3b6f4d1d3c1f5e1f8b6c9e/pair/USD/USD"
            );

            const respData = await resp.json();
            var convertedAmount = 0;

            if (respData.result === "success") {
              const usdToInrRate = respData.conversion_rates.USD;
              convertedAmount = (totalAmount * usdToInrRate).toFixed(2);
            }

            const headers = {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            };

            const data = {
              userId: context?.userData?._id,
              totalAmount: convertedAmount,
            };

            const response = await axios.get(
              VITE_API_URL +
                `/api/order/create-order-paypal?userId=${data?.userId}&
                totalAmount=${data?.totalAmount}`,
              { headers }
            );

            return response?.data?.id;
          },

          onApprove: async (data) => {
            onApprovePayment(data);
          },
          onError: (err) => {
            history("/order/failed");
            console.error("ERROR DE PAGO", err);
          },
        })
        .render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [context?.cartData, context?.userData, selectedAddress]);

  const onApprovePayment = async (data) => {
    const user = context?.userData;

    const info = {
      userId: user?._id,
      products: context?.cartData,
      payment_status: "COMPLETADO",
      delivery_address: selectedAddress,
      totalAmount: totalAmount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-type": "application/json",
    };

    const response = await axios
      .post(
        VITE_API_URL + "/api/order/capture-order-paypal",
        {
          ...info,
          paymentId: data.orderID,
        },
        { headers }
      )
      .then((res) => {
        context.alertBox("success", res?.data?.message);
        history("/order/success");
        deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
          context?.getCartItems();
        });
      });

    if (response.data.success) {
      context.alertBox(
        "success",
        "ORDEN REALIZADA Y GUARDADA EN BASE DE DATOS"
      );
    }
  };

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  const checkout = (e) => {
    e.preventDefault();

    var options = {
      key: VITE_APP_RAZORPAY_KEY_ID,
      key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmount * 100),
      currency: "USD",
      order_receipt: context?.userData?.name,
      name: "MAQUITEXT",
      description: "PARA FINES DE PRUEBA",
      handler: function (response) {
        console.log(response);

        const paymentId = response.razorpay_payment_id;
        const user = context?.userData;
        const payLoad = {
          userId: user?._id,
          products: context?.cartData,
          paymentId: paymentId,
          payment_status: "COMPLETADO",
          delivery_address: selectedAddress,
          totalAmt: totalAmount,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };

        postData(`/api/order/create`, payLoad).then((res) => {
          context.alertBox("success", res?.message);
          if (res?.error === false) {
            deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
              context?.getCartItems();
            });
            history("/order/success");
          } else {
            history("/order/failed");
            context.alertBox("error", res?.message);
          }
        });
      },
      theme: {
        color: "#082c55",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const cashOnDelivery = () => {
    const user = context?.userData;

    const payLoad = {
      userId: user?._id,
      products: context?.cartData,
      paymentId: "",
      payment_status: "PAGO CONTRA REMBOLSO COMPLETADO",
      delivery_address: selectedAddress,
      totalAmt: totalAmount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    postData(`/api/order/create`, payLoad).then((res) => {
      context.alertBox("success", res?.message);
      if (res?.error === false) {
        deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
          context?.getCartItems();
        });
      } else {
        context.alertBox("error", res?.message);
      }
      history("/order/success");
    });
  };

  return (
    <section className="!py-5">
      <form onSubmit={checkout}>
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
                            value={address?._id}
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

              <div className="flex items-center flex-col !gap-3 !mb-2">
                {/*<Button
                  type="submit"
                  className="btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
                >
                  <IoBagCheck className="text-[25px]" />
                  CONFIRMAR
                </Button>

                <div id="paypal-button-container"></div>*/}

                <Button
                  type="button"
                  className="btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
                  onClick={cashOnDelivery}
                >
                  <BsFillBagCheckFill className="text-[25px]" />
                  PAGO CONTRA ENTREGA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
