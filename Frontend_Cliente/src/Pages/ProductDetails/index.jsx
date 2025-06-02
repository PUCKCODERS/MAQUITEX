import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const ProductDetails = () => {
  return (
    <section className="!py-5 !pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition !font-[bold] !text-[#082c55] hover:!text-[#0a7fec]"
            sx={{ fontSize: "16px" }}
          >
            INICIO
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition !font-[bold] !text-[#274a72] hover:!text-[#0a7fec]"
            sx={{ fontSize: "16px" }}
          >
            MAQUINAS
          </Link>
        </Breadcrumbs>
      </div>

      <div className="container flex !gap-4">
        <div className="productZoomContainer"></div>
      </div>
    </section>
  );
};

export default ProductDetails;
