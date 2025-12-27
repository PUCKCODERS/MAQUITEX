import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  window.scrollTo(0, 0);
  return (
    <section className="w-full !p-10 !py-20 flex items-center justify-center flex-col !gap-2">
      <img src="../../../imagenes/orderFalied.png" width="120" />
      <h3 className="!mb-0 text-[25]">SU PEDIDO HA FALLADO</h3>
      <p className="!mt-0">SU PEDIDO FALLÓ DEBIDO A ALGUNA RAZÓN</p>
      <Link to="/">
        <Button className="btn-org btn-border">REGRESAR AL INICIO</Button>
      </Link>
    </section>
  );
};

export default OrderFailed;
