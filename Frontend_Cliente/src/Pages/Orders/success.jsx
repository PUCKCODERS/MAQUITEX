import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const OrderSuccess = () => {
  const location = useLocation();
  // Guardamos el objeto de la orden completo para pasarlo a la factura y evitar una nueva llamada a la API
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Si no tenemos la orden (p. ej. al recargar la página), buscamos la última orden del usuario
    if (!order) {
      fetchDataFromApi("/api/order/order-list").then((res) => {
        if (res?.error === false && res?.data?.length > 0) {
          const sortedOrders = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          // Guardamos la orden más reciente completa
          setOrder(sortedOrders[0]);
        }
      });
    }
  }, []);

  return (
    <section className="w-full !p-10 !py-20 flex items-center justify-center flex-col !gap-2">
      <img src="../../../imagenes/checked.png" width="120" />
      <h3 className="!mb-0 text-[25]">SU PEDIDO ESTÁ REALIZADO</h3>
      <p className="!mt-0">GRACIAS POR SU PREFERENCIA</p>
      {/* Pasamos el objeto 'order' completo en el estado para que la página de factura no necesite volver a buscarlo */}
      <Link
        to={order ? `/factura/${order._id}` : "/my-orders"}
        state={{ order }}
      >
        <Button className="btn-org btn-border">VER FACTURA</Button>
      </Link>
    </section>
  );
};

export default OrderSuccess;
