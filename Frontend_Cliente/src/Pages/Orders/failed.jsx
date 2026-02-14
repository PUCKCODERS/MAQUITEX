import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  window.scrollTo(0, 0);
  return (
    <section className="w-full !p-10 !py-5 sm:!py-10 md:!py-15 lg:!py-20 flex items-center justify-center flex-col !gap-2">
      <img src="../../../imagenes/orderFalied.png" width="200" />
      <h3 className="!mt-0 text-center !text-[15px] sm:!text-[20px] md:!text-[25px] lg:!text-[25px] !text-gray-600">
        SU PEDIDO HA FALLADO
      </h3>
      <p className="!mt-0 text-center !text-[15px] sm:!text-[20px] md:!text-[25px] lg:!text-[25px] !text-gray-500">
        SU PEDIDO FALLÓ DEBIDO A ALGUNA RAZÓN
      </p>
      <Link to="/">
        <Button className="btn-org btn-border">REGRESAR AL INICIO</Button>
      </Link>
    </section>
  );
};

export default OrderFailed;
