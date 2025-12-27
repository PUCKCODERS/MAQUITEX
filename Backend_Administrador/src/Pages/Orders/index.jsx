import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import SearchBox from "../../Components/SearchBox";
import { editData, fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import { MyContext } from "../../App";

const Orders = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const context = useContext(MyContext);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const handleChange = (event, id) => {
    setOrderStatus(event.target.value);

    const obj = {
      id: id,
      order_status: event.target.value,
    };

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context.alertBox("success", res?.data?.message);
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, [orderStatus]);

  return (
    <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
      <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] font-[500] ">
          PEDIDOS RECIENTES
        </h2>
        <div className="w-[40%]">
          <SearchBox />
        </div>
      </div>
      <div class="relative overflow-x-auto dark:!bg-gray-800 ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white ">
            <tr>
              <th scope="col" class="!px-6 !py-3 !mb-3">
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
                        <span className="text-white">{order?.userId?._id}</span>
                      </td>
                      <td class="!px-6 !py-4 font-[500] text-white">
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={
                            order?.order_status !== null
                              ? order?.order_status
                              : orderStatus
                          }
                          label="Status"
                          size="small"
                          onChange={(e) => handleChange(e, order?._id)}
                          className="!w-full !bg-white !text-[#274a72]"
                        >
                          <MenuItem value={"PENDIENTE"}>PENDIENTE</MenuItem>
                          <MenuItem value={"CONFIRMADO"}>CONFIRMADO</MenuItem>
                          <MenuItem value={"ENVIADO"}>ENVIADO</MenuItem>
                        </Select>
                      </td>
                      <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                        {order?.createdAt?.split("T")[0]}
                      </td>
                    </tr>

                    {isOpenOrderdProduct === index && (
                      <tr>
                        <td className="dark:bg-gray-800 !pl-20" colSpan="6">
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
                                        {item?.price?.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "USD",
                                        })}
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
  );
};

export default Orders;
