import React, { useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { fetchDataFromApi } from "../../utils/api";

const Orders = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, []);

  return (
    <section className="!py-5 w-full ">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[75%] ">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold]  !text-[25px] flex justify-center">
                MIS PEDIDOS
              </h2>
              <p className="!mt-2 !mb-2 text-[#556f8d] !text-[20px] font-[600] flex justify-center">
                CONTIENE{" "}
                <span className="font-bold text-[#ec370a]">
                  &nbsp;{orders?.length}&nbsp;
                </span>
                PEDIDOS
              </p>

              <div class="relative overflow-x-auto !mt-5  dark:!bg-gray-800">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                    <tr>
                      <th scope="col" class="!px-6 !py-3">
                        &nbsp;
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ID PEDIDO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        FORMA
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        NOMBRE
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CELULAR
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        DIRECCIÓN
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CÓDIGO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        PRECIO TOTAL
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CORREO ELECTRONICO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ID USUARIO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ESTADO PEDIDO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        FECHA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length !== 0 &&
                      orders?.map((order, index) => {
                        return (
                          <>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <td class="!px-6 !py-4 font-[700] text-white">
                                <Button
                                  className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] transition-all duration-300"
                                  onClick={() => isShowOrderdProduct(index)}
                                >
                                  {isOpenOrderdProduct === index ? (
                                    <FaAnglesUp className="text-[20px]" />
                                  ) : (
                                    <FaAnglesDown className="text-[20px]" />
                                  )}
                                </Button>
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                <span className="text-white">{order?._id}</span>
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                <span className="text-white">
                                  {order?.paymentId
                                    ? order?.paymentId
                                    : "PAGO CONTRA REMBOLSO"}
                                </span>
                              </td>
                              <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                                {order?.userId?.name}
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                {order?.userId?.mobile}
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                <span className="text-[#bfc3cc] block w-[400px]">
                                  {order?.delivery_address?.address_line1 +
                                    ", " +
                                    order?.delivery_address?.city +
                                    ", " +
                                    order?.delivery_address?.landmark +
                                    ", " +
                                    order?.delivery_address?.state +
                                    ", " +
                                    order?.delivery_address?.country}
                                </span>
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                {order?.delivery_address?.pincode}
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                {order?.totalAmt?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                {order?.userId?.email}
                              </td>
                              <td class="!px-6 !py-4 font-[500] ">
                                <span className="text-white">
                                  {order?.userId?._id}
                                </span>
                              </td>
                              <td class="!px-6 !py-4 font-[500] text-white">
                                <Badge status={order?.order_status} />
                              </td>
                              <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                                {order?.createdAt?.split("T")[0]}
                              </td>
                            </tr>

                            {isOpenOrderdProduct === index && (
                              <tr>
                                <td
                                  className="dark:bg-gray-800 !pl-20"
                                  colSpan="6"
                                >
                                  <div class="relative overflow-x-auto">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            ID PRODUCTO
                                          </th>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            NOMBRE PRODUCTO
                                          </th>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            IMAGEN
                                          </th>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            CANTIDAD
                                          </th>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            PRECIO
                                          </th>
                                          <th
                                            scope="col"
                                            className="!px-6 !py-3 whitespace-nowrap"
                                          >
                                            SUB TOTAL
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order?.products?.map((item, index) => {
                                          return (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                              <td class="!px-6 !py-4 font-[500] ">
                                                <span
                                                  key={index}
                                                  className="text-white"
                                                >
                                                  {item?._id}
                                                </span>
                                              </td>
                                              <td class="!px-6 !py-4 font-[500] ">
                                                <span className="text-white">
                                                  <div className="w-[200px]">
                                                    {item?.productTitle}
                                                  </div>
                                                </span>
                                              </td>
                                              <td class="!px-6 !py-4 font-[500] ">
                                                <img
                                                  src={item?.image}
                                                  className="w-[40px] h-[40px] object-cover rounded-md"
                                                />
                                              </td>
                                              <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                                                {item?.quantity}
                                              </td>
                                              <td class="!px-6 !py-4 font-[500]">
                                                {item?.price?.toLocaleString(
                                                  "en-US",
                                                  {
                                                    style: "currency",
                                                    currency: "USD",
                                                  }
                                                )}
                                              </td>
                                              <td class="!px-6 !py-4 font-[500] ">
                                                {(
                                                  item?.price * item?.quantity
                                                )?.toLocaleString("en-US", {
                                                  style: "currency",
                                                  currency: "USD",
                                                })}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
