import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { FaAnglesDown, FaAnglesUp, FaFileInvoice } from "react-icons/fa6";
import SearchBox from "../../Components/SearchBox";
import { editData, fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import { MenuItem, Pagination, Select, Tooltip } from "@mui/material";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const Orders = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [orderStatus] = useState("");

  const [ordersData, setOrdersData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState([]);
  const [pageOrder, setPageOrder] = React.useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const context = useContext(MyContext);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const handleChange = (event, id) => {
    const newStatus = event.target.value;

    const obj = {
      id: id,
      order_status: newStatus,
    };

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context.alertBox("success", res?.data?.message);

        setOrdersData((prevOrdersData) => ({
          ...prevOrdersData,
          data: prevOrdersData.data.map((order) =>
            order._id === id ? { ...order, order_status: newStatus } : order,
          ),
        }));

        setTotalOrdersData((prevTotal) =>
          prevTotal.map((order) =>
            order._id === id ? { ...order, order_status: newStatus } : order,
          ),
        );
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list?admin=true").then((res) => {
      if (res?.error === false) {
        setPaginationInfo(res?.data);
      }
    });
  }, [orderStatus]);

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?admin=true`).then((res) => {
      if (res?.error === false) {
        const all = res?.data || [];
        setTotalOrdersData(all);
        const totalPages = Math.max(1, Math.ceil(all.length / 25));
        const start = (pageOrder - 1) * 25;
        const pageData = all.slice(start, start + 25);
        setPaginationInfo({ totalPages });
        setOrdersData({ data: pageData });
      }
    });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      const all = totalOrdersData || [];
      const totalPages = Math.max(1, Math.ceil(all.length / 25));
      const start = (pageOrder - 1) * 25;
      const pageData = all.slice(start, start + 25);
      setPaginationInfo({ totalPages });
      setOrdersData({ data: pageData });
    }
  }, [pageOrder, totalOrdersData, searchQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      const dataArr = Array.isArray(totalOrdersData)
        ? totalOrdersData
        : totalOrdersData?.data || [];
      const filteredOrders = dataArr.filter((order) =>
        (
          order?._id?.toString() +
          " " +
          (order?.userId?.name || "") +
          " " +
          (order?.userId?.email || "") +
          " " +
          (order?.createdAt || "")
        )
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );

      const totalPages = Math.max(1, Math.ceil(filteredOrders.length / 25));
      const start = (pageOrder - 1) * 25;
      const pageData = filteredOrders.slice(start, start + 25);
      setPaginationInfo({ totalPages });
      setOrdersData({ data: pageData });
      if (pageOrder > totalPages) setPageOrder(1);
    } else {
      // ())
    }
  }, [searchQuery]);

  return (
    <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
      <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] font-[500] ">
          PEDIDOS RECIENTES
        </h2>
        <div className="w-[25%]">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPageOrder={setPageOrder}
          />
        </div>
      </div>
      <div class="relative overflow-x-auto !mt-0  dark:!bg-gray-800">
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
                ACCIÓN
              </th>
              <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                FECHA
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersData?.data?.length !== 0 &&
              ordersData?.data?.map((order, index) => {
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
                        +{order?.userId?.mobile}
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
                            order?.delivery_address?.country +
                            ", " +
                            "+" +
                            order?.delivery_address?.mobile}
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
                        <Tooltip title="Ver Factura">
                          <Link
                            to={`/factura/${order._id}`}
                            state={{ order: order }}
                          >
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] transition-all duration-300">
                              <FaFileInvoice className="text-[18px]" />
                            </Button>
                          </Link>
                        </Tooltip>
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

      {paginationInfo?.totalPages > 0 && (
        <div className="flex items-center justify-center  !mt-0 !pb-3 !bg-gray-100 !text-balck !border-t !border-gray-500">
          <Pagination
            showFirstButton
            showLastButton
            count={paginationInfo?.totalPages}
            page={pageOrder}
            onChange={(e, value) => setPageOrder(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
