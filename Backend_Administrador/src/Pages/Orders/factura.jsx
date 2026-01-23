import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Button } from "@mui/material";
import { FaPrint } from "react-icons/fa6";
import logo from "./images/logo.jpg";

const Factura = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
    } else {
      setLoading(true);
      // Intentamos buscar la orden por ID. Es más eficiente.
      fetchDataFromApi(`/api/orders/${id}`).then((res) => {
        if (res && !res.error && (res._id === id || res.id === id)) {
          setOrder(res);
          setLoading(false);
        } else {
          // Si falla, buscamos en la lista completa de órdenes del admin.
          fetchDataFromApi("/api/order/order-list?admin=true").then(
            (resList) => {
              if (resList?.error === false) {
                const foundOrder = resList?.data?.find((o) => o._id === id);
                setOrder(foundOrder);
              }
              setLoading(false);
            },
          );
        }
      });
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[50vh]">
        <p className="text-[20px] font-bold text-[#274a72]">
          Cargando factura...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center w-full h-[50vh]">
        <p className="text-[20px] font-bold text-red-500">
          Orden no encontrada.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full !p-10 bg-[#f9f9f9]">
      <style>
        {`
          @media print {
            @page {
              margin: 0;
              size: auto;
            }
            body * {
              visibility: hidden;
            }
            .invoice-card, .invoice-card * {
              visibility: visible;
            }
            .invoice-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0 !important;
              padding: 20px !important;
              box-shadow: none !important;
              border: none !important;
              background: white !important;
              z-index: 9999;
            }
            .hide-on-print {
              display: none !important;
            }
          }
        `}
      </style>
      <div className="invoice-card max-w-[900px] mx-auto bg-white shadow-md rounded-md !p-10 border border-[#e0e0e0]">
        <div className="flex justify-between items-center !mb-8 border-b pb-4">
          <div>
            <img
              src={logo}
              width="250"
              height="500"
              alt="Logo"
              className="img-cover"
            />
            <h2 className="text-[20px] font-[bold] text-[#274a72]">
              FACTURA DE PEDIDO
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-[bold] text-[#274a72]">
              ID PEDIDO:{" "}
              <span className="font-normal text-[#666]">
                &nbsp;{order?._id}
              </span>
            </p>
            <p className="text-[16px] font-[bold] text-[#274a72]">
              FECHA:{" "}
              <span className="font-normal text-[#666]">
                &nbsp;{order?.createdAt?.split("T")[0]}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between !mb-8">
          <div className="w-[48%]">
            <h3 className="text-[18px] font-[bold] text-[#555] !mb-3">
              INFORMACION
            </h3>
            <p className="text-[15px] text-[#555]">
              <span className="font-[bold] text-[#274a72]">USUARIO:&nbsp;</span>
              &nbsp;
              {order?.userId?.name}
            </p>
            <p className="text-[15px] text-[#555]">
              <span className="font-[bold] text-[#274a72]">
                DIRECCION:&nbsp;
              </span>
              &nbsp;
              {order?.delivery_address?.address_line1}{" "}
              {order?.delivery_address?.city}, {order?.delivery_address?.state},{" "}
              {order?.delivery_address?.country}
            </p>

            <p className="text-[15px] text-[#555]">
              <span className="font-[bold] text-[#274a72]">
                TELEFONO:&nbsp;
              </span>
              &nbsp;
              {order?.userId?.mobile}
            </p>

            <p className="text-[15px] text-[#555]">
              <span className="font-[bold] text-[#274a72]">CORREO:&nbsp;</span>
              &nbsp;
              {order?.userId?.email}
            </p>
          </div>
        </div>

        <div className="w-full overflow-x-auto !mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#274a72] text-white">
                <th className="!p-3 text-[14px] font-bold rounded-tl-md">
                  PRODUCTO
                </th>
                <th className="!p-3 text-[14px] font-bold">PRECIO</th>
                <th className="!p-3 text-[14px] font-bold text-center">
                  CANTIDAD
                </th>
                <th className="!p-3 text-[14px] font-bold text-right rounded-tr-md">
                  SUBTOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((item, index) => (
                <tr key={index} className="border-b border-[#eee]">
                  <td className="!p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-medium text-[#274a72]">
                        {item?.productTitle}
                      </span>
                    </div>
                  </td>
                  <td className="!p-3 text-[14px] text-[#555]">
                    {item?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td className="!p-3 text-[14px] text-[#555] text-center">
                    {item?.quantity}
                  </td>
                  <td className="!p-3 text-[14px] font-bold text-[#333] text-right">
                    {item?.subTotal?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end !mb-10">
          <div className="w-[300px]">
            <div className="flex justify-between !mb-2 py-2 border-b">
              <span className="text-[16px] font-bold text-[#333]">TOTAL:</span>
              <span className="text-[20px] font-bold text-[#ec370a]">
                {order?.totalAmt?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center hide-on-print">
          <Button
            className="btn-org flex gap-2 items-center mx-auto !px-8 !py-2"
            onClick={() => window.print()}
          >
            <FaPrint className="text-[18px]" /> IMPRIMIR FACTURA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Factura;
