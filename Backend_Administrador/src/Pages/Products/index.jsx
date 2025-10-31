import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Progress from "../../Components/ProgressBar";
import { GrEdit } from "react-icons/gr";
import { ImEye } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FcDeleteDatabase } from "react-icons/fc";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCTO", minWidth: 150 },
  { id: "category", label: "CATEGORIA", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORIA",
    minWidth: 150,
  },
  {
    id: "price",
    label: "PRECIO",
    minWidth: 100,
  },
  {
    id: "sales",
    label: "VENTAS",
    minWidth: 80,
  },
  {
    id: "action",
    label: "OPCIONES",
    minWidth: 120,
  },
];

export const Products = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = useState([]);
  const [productCat, setProductCat] = React.useState("");
  const [productSubCat, setProductSubCat] = React.useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");

  // 👇 NUEVOS ESTADOS para confirmación
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const getProducts = () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeProductThirdLavelSubCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLavelCat/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // 👇 NUEVO: Abre confirmación antes de eliminar
  const deleteProduct = (id) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  // 👇 NUEVO: Confirmación real
  const confirmDelete = () => {
    if (productToDelete) {
      deleteData(`/api/product/${productToDelete}`).then(() => {
        getProducts();
        setIsConfirmOpen(false);
        setProductToDelete(null);
        context.alertBox("success", "PRODUCTO ELIMINADO EXITOSAMENTE");
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="flex !bg-gray-700 items-center justify-between !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] !font-[500] ">
          PRODUCTOS
          <span className="font-[400] text-[14px] !ml-3">
            (MATERIAL UI DESCRIPCION)
          </span>
        </h2>

        <div className="col !w-[35%] !ml-auto flex items-center justify-end !gap-3">
          <Button className="btn btn-sm flex items-center ">EXPORTAR</Button>
          <Button
            className="btn btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVO PRODUCTO",
              })
            }
          >
            AGREGAR PRODUCTO
          </Button>
        </div>
      </div>

      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-800">
        <div className="flex items-center w-full !text-white !bg-gray-800 !pl-5 !pr-5 !py-4 !border-b !border-gray-500 justify-between !gap-4">
          <div className="col !w-[25%]">
            <h4 className="font-[bold] !text-[15px] !mb-2">CATEGORÍA</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat /*, index*/) => {
                  return (
                    <MenuItem
                      value={cat?._id}
                      className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                    >
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col !w-[25%]">
            <h4 className="font-[bold] !text-[15px] !mb-2">SUBCATEGORÍA</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.map((cat /*, index*/) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat /*, index*/) => {
                      return (
                        <MenuItem
                          value={subCat?._id}
                          className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                        >
                          {subCat?.name}
                        </MenuItem>
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col !w-[25%]">
            <h4 className="font-[bold] !text-[15px] !mb-2">
              CATEGORÍA TERCER NIVEL
            </h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productThirdLavelCat}
                label="Sub Category"
                onChange={handleChangeProductThirdLavelSubCat}
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLavelCat, index) => {
                          return (
                            <MenuItem
                              value={thirdLavelCat?._id}
                              key={index}
                              className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                            >
                              {thirdLavelCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col !w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="!bg-gray-950">
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((product, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200"
                      >
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            {...label}
                            size="small"
                            className="!text-white"
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center !gap-4 w-[300px] ">
                            <div className="img !w-[85px] !h-[85px] rounded-md overflow-hidden group !min-w-[85px]">
                              <Link
                                to={`/product/${product?._id}`}
                                data-discover="true"
                              >
                                <LazyLoadImage
                                  alt={"image"}
                                  effect="blur"
                                  src={product?.images[0]}
                                  className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                                />
                              </Link>
                            </div>

                            <div className="info w-[75%]">
                              <h3 className=" !font-[600] text-[12px] leading-4">
                                <Link
                                  to={`/product/${product?._id}`}
                                  data-discover="true"
                                  className="!text-white hover:!text-[white] !cursor-pointer"
                                >
                                  {product?.name}
                                </Link>
                              </h3>

                              <p className="!text-[15px] !font-[bold] !text-white !mt-1">
                                {product?.brand}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columns.minWidth }}
                          className="!text-white"
                        >
                          {product?.catName}
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columns.minWidth }}
                          className="!text-white"
                        >
                          {product?.subCat}
                        </TableCell>

                        <TableCell
                          style={{ minWidth: columns.minWidth }}
                          className="!text-white"
                        >
                          <div class="flex !gap-1 flex-col">
                            <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                              &#36; {product?.oldPrice}
                            </span>
                            <span class="price text-[white] text-[15px] font-[600]">
                              &#36; {product?.price}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columns.minWidth }}
                          className="!text-white"
                        >
                          <p className="text-[15px] !w-[100px] ">
                            <span className="font-[600]">{product?.sale}</span>
                            <span> VENTAS</span>
                          </p>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columns.minWidth }}
                          className="!text-white"
                        >
                          <div className="flex items-center !gap-1">
                            <Button
                              className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "EDITAR PRODUCTO",
                                  id: product?._id,
                                })
                              }
                            >
                              <GrEdit className=" !text-[20px] " />
                            </Button>
                            <Link to={`/product/${product?._id}`}>
                              <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                                <ImEye className="!text-[20px]" />
                              </Button>
                            </Link>
                            <Button
                              className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                              onClick={() => deleteProduct(product?._id)}
                            >
                              <FaTrashAlt className="!text-[20px]" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="!bg-gray-100 !text-balck !border-t !border-gray-500"
        />
      </div>

      {/* 👇 MISMO DIALOG DE CONFIRMACIÓN */}
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            width: "!360px",
          },
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <FcDeleteDatabase className="text-[120px] !mb-2" />
          <DialogTitle
            className="!text-[20px] text-[#082c55] !font-bold !pb-1 !text-center"
            sx={{ lineHeight: 1.2 }}
          >
            ¿DESEA ELIMINAR ESTE PRODUCTO?
          </DialogTitle>
          <p className="text-gray-800 text-[16px] !mb-4">
            ESTA ACCIÓN NO SE PUEDE DESHACER
          </p>
        </div>
        <div className="flex justify-center !gap-3 !pb-2">
          <Button
            onClick={confirmDelete}
            className="!bg-[#1976d2] hover:!bg-[#0d47a1] !text-white !font-bold !px-4 !py-2"
          >
            Sí, eliminar
          </Button>
          <Button
            onClick={() => setIsConfirmOpen(false)}
            className="!bg-[#d32f2f] hover:!bg-[#9a0007] !text-white !font-bold !px-4 !py-2"
          >
            Cancelar
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default Products;
