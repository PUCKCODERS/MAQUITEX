import React, { useState, useContext, useEffect } from "react";
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
import ProductLoadingGrid from "../../components/ProductLoading/productLoadingGrid";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedSortVal, setSelectedSortVal] = useState("POR NOMBRE, A....Z");

  const context = useContext(MyContext);
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    context?.setIsFilterBtnShow(true);

    const queryParameters = new URLSearchParams(location.search);
    const catId = queryParameters.get("catId");
    const subCatId = queryParameters.get("subCatId");
    const thirdLevelCatId = queryParameters.get("thirdLavelCatId");

    const nestedCats = context?.catData;

    if (!nestedCats || nestedCats.length === 0) {
      setBreadcrumbs([]);
      return;
    }

    const allCats = [];
    const flatten = (categories) => {
      categories.forEach((category) => {
        const { children, ...rest } = category;
        allCats.push(rest);
        if (children && children.length > 0) {
          flatten(children);
        }
      });
    };
    flatten(nestedCats);

    const path = [];

    const findCategoryById = (id) => {
      if (!id) return null;
      return allCats.find((cat) => cat._id === id);
    };

    let currentId = null;
    if (thirdLevelCatId) {
      currentId = thirdLevelCatId;
    } else if (subCatId) {
      currentId = subCatId;
    } else if (catId) {
      currentId = catId;
    }

    if (currentId) {
      let currentCat = findCategoryById(currentId);
      while (currentCat) {
        path.unshift(currentCat);
        currentCat = findCategoryById(currentCat.parentId);
      }
    }

    setBreadcrumbs(path);
  }, [location.search, context?.catData, context?.isFilterBtnShow]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, value) => {
    setSelectedSortVal(value);
    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    }).then((res) => {
      setProductsData(res);
      setAnchorEl(null);
    });
  };

  return (
    <section className="!py-5 !pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            let href = "/productListing?";

            if (index === 0) {
              href += `catId=${crumb._id}`;
            } else if (index === 1) {
              href += `subCatId=${crumb._id}`;
            } else if (index === 2) {
              href += `thirdLavelCatId=${crumb._id}`;
            }

            if (isLast) {
              return (
                <Typography
                  color="text.primary"
                  key={crumb._id}
                  className="!font-[bold] !text-[#082c55]"
                  sx={{ fontSize: "16px" }}
                >
                  {crumb.name}
                </Typography>
              );
            }

            return (
              <Link
                key={crumb._id}
                underline="none"
                color="inherit"
                href={href}
                className="link transition !font-[bold] !text-[#082c55] hover:!text-[#0a7fec]"
                sx={{ fontSize: "16px" }}
              >
                {crumb.name}
              </Link>
            );
          })}
        </Breadcrumbs>{" "}
      </div>
      <div className="bg-white !p-2 !mt-4">
        <div className="container flex !gap-3">
          <div
            className={`sidebarWrapper fixed -bottom-[100%] !left-0 !w-full  
               lg:!h-full lg:!static lg:!w-[20%] !z-[102] lg:!z-[99] !p-3 lg:!p-0 bg-white  transition-all lg:!opacity-100 !opacity-0 ${context?.openFilter === true ? "!bottom-0 !opacity-100" : ""}`}
          >
            <Sidebar
              productsData={productsData}
              setProductsData={setProductsData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>

          {context?.windowWidth < 992 && (
            <div
              className={`filter_overlay w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-[101]  ${context?.openFilter === true ? "block" : "hidden"}`}
              onClick={() => context?.setOpenFilter(false)}
            ></div>
          )}

          <div className="rightContent w-full lg:w-[80%] !py-3">
            <div className="bg-[#d6e7f8] !p-2 w-full !mb-4 rounded-md flex items-center justify-between ">
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

                <span className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] hidden sm:block md:block lg:block font-[600] !pl-3 !text-[#082c55]">
                  CONTINE{" "}
                  {productsData?.length !== 0
                    ? productsData?.products?.length
                    : 0}{" "}
                  PRODUCTOS
                </span>
              </div>

              <div className="col2 !ml-auto flex items-center justify-end !gap-3 !pr-4">
                <span className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] font-[600] !pl-3 !text-[#082c55]">
                  ORDENAR POR
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !font-[bold] !text-[9px] sm:!text-[11px] md:!text-[13px] lg:!text-[14px] !capitalize hover:!text-[#082c55] !border !border-[#9ab8da]"
                >
                  {selectedSortVal}
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
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "asc",
                        productsData,
                        "POR NOMBRE, A....Z",
                      )
                    }
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    POR NOMBRE, A....Z
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "desc",
                        productsData,
                        "POR NOMBRE, Z....A",
                      )
                    }
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    POR NOMBRE, Z....A
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "asc",
                        productsData,
                        "PRECIO, DE MENOR A MAYOR",
                      )
                    }
                    className="!text-[#556f8d] !font-[bold] hover:!text-[white] hover:!bg-[#274a72] w-full !text-left !justify-start !rounded-none"
                  >
                    PRECIO, DE MENOR A MAYOR
                  </MenuItem>

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "desc",
                        productsData,
                        "PRECIO, DE MAYOR A MENOR",
                      )
                    }
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
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1"
              } !gap-4`}
            >
              {itemView === "grid" ? (
                <>
                  {isLoading === true ? (
                    <ProductLoadingGrid view={itemView} />
                  ) : (
                    productsData?.products?.length !== 0 &&
                    productsData?.products?.map((item, index) => {
                      return <ProductItem key={index} item={item} />;
                    })
                  )}
                </>
              ) : (
                <>
                  {isLoading === true ? (
                    <ProductItemListView view={itemView} />
                  ) : (
                    productsData?.products?.length !== 0 &&
                    productsData?.products?.map((item, index) => {
                      return <ProductItemListView key={index} item={item} />;
                    })
                  )}
                </>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center !mt-10">
                <Pagination
                  showFirstButton
                  showLastButton
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
