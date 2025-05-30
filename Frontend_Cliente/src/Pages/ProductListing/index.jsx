import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/ProductItem";
import ProductItemListView from "../../components/ProductItemListView";
import Button from "@mui/material/Button";
import { ImMenu } from "react-icons/im";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <div className="bg-white !p-2 !mt-4">
        <div className="container flex !gap-3">
          <div className="sidebarWrapper !w-[20%] !h-full bg-white ">
            <Sidebar />
          </div>

          <div className="rightContent w-[80%] !py-3">
            <div className="bg-[#d6e7f8] !p-2 w-full !mb-4 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center itemViewActions">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#000] hover:!bg-white
                     ${itemView === "list" && "active"}`}
                  onClick={() => setItemView("list")}
                >
                  <ImMenu />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#000] hover:!bg-white
                    ${itemView === "grid" && "active"}`}
                  onClick={() => setItemView("grid")}
                >
                  <TfiLayoutGrid3Alt />
                </Button>

                <span className="text-[14px] font-[600] !pl-3 !text-[#082c55]">
                  EXISTEN 369 PRODUCTOS
                </span>
              </div>

              <div className="col2 !ml-auto flex items-center justify-end !gap-3 !pr-4">
                <span className="text-[14px] font-[600] !pl-3 !text-[#082c55]">
                  ORDENAR POR
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !font-[bold] !text-[14px] !capitalize hover:!text-[#082c55] !border !border-[#9ab8da]"
                >
                  VENTAS DE MAYOR A MENOR
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    VENTAS DE MAYOR A MENOR
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    RELEVANCIA
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    POR NOMBRE, A....Z
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    POR NOMBRE, Z....A
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    PRECIO, DE MENOR A MAYOR
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    PRECIO, DE MAYOR A MENOR
                  </MenuItem>
                </Menu>
              </div>
            </div>

            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-4 md:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-1"
              } !gap-4`}
            >
              {itemView === "grid" ? (
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>
              ) : (
                <>
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                </>
              )}
            </div>
            <div className="flex items-center justify-center !mt-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
