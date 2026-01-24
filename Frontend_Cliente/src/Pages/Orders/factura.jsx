import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Button } from "@mui/material";
import { FaPrint } from "react-icons/fa6";
import logo from "./images/logo.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RiMailSendLine } from "react-icons/ri";

const Factura = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const downloadPDF = () => {
    const input = document.querySelector(".invoice-card");
    if (!input) {
      alert("No se encontró el contenido de la factura para generar el PDF.");
      return Promise.resolve();
    }

    window.scrollTo(0, 0);

    return html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      ignoreElements: (element) => element.classList?.contains("hide-on-print"),
      onclone: (clonedDoc) => {
        let cssText = "";
        try {
          Array.from(document.styleSheets).forEach((sheet) => {
            try {
              if (sheet.cssRules) {
                Array.from(sheet.cssRules).forEach((rule) => {
                  cssText += rule.cssText + "\n";
                });
              }
            } catch {
              // Ignorar errores de CORS en hojas externas
            }
          });
        } catch (e) {
          console.warn("Error procesando CSS:", e);
        }

        const sanitizedCss = cssText.replace(/oklch\([^)]+\)/g, "#000000");

        clonedDoc
          .querySelectorAll("link[rel='stylesheet'], style")
          .forEach((el) => el.remove());

        const styleEl = clonedDoc.createElement("style");
        styleEl.textContent = sanitizedCss;
        clonedDoc.head.appendChild(styleEl);
        const clonedCard = clonedDoc.querySelector(".invoice-card");
        if (clonedCard) {
          clonedCard.style.width = "900px";
          clonedCard.style.maxWidth = "none";
          clonedCard.style.backgroundColor = "#ffffff";
          clonedCard.style.fontFamily = "bold";
          const allElements = clonedCard.querySelectorAll("*");
          allElements.forEach((el) => {
            el.style.fontFamily = "bold";
            el.style.letterSpacing = "normal";
          });
        }
      },
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`factura_${order?._id || id}.pdf`);
      })
      .catch((err) => {
        console.error("Error al generar el PDF:", err);
      });
  };

  const sendWhatsApp = () => {
    const phoneNumber = "593968873896";
    const message = `HOLA, ADJUNTO EL CODIGO DE MI PEDIDO: ${order?._id}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
    } else {
      setLoading(true);
      fetchDataFromApi("/api/order/order-list").then((res) => {
        if (res?.error === false) {
          const foundOrder = res?.data?.find((o) => o._id === id);
          setOrder(foundOrder);
        }
        setLoading(false);
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
    <section className="w-full !p-10 bg-[#f9f9f9] flex flex-col items-center justify-center gap-5">
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
          /* Forzar colores HEX para evitar error 'oklch' en html2canvas */
          .invoice-card .bg-white { background-color: #ffffff !important; }
          .invoice-card .text-white { color: #ffffff !important; }
        `}
      </style>
      <div
        className="invoice-card max-w-[900px] !mx-auto bg-white shadow-md !rounded-md !p-10 !border border-[#e0e0e0]"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex justify-between items-center !mb-8 !border-b !pb-4">
          <div>
            <img
              src={logo}
              width="250"
              height="500"
              alt=""
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
            <div className="flex justify-between !mb-2 !py-2 border-b">
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
            onClick={downloadPDF}
          >
            <FaPrint className="text-[18px]" /> DESCARGAR PEDIDO
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 hide-on-print">
        <span className="font-bold text-[#274a72]">
          AL ENVIAR ESTE PEDIDO PERMITIRA AL VENDEDOR EMPEZAR A PREPARARLO
        </span>
        <Button
          className="btn-org flex gap-2 items-center mx-auto !px-8 !py-2"
          onClick={sendWhatsApp}
        >
          <RiMailSendLine className="text-[18px]" /> ENVIAR PEDIDO
        </Button>
      </div>
    </section>
  );
};

export default Factura;
