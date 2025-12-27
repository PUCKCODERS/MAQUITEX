import React, { useState, PureComponent, useContext, useEffect } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { FaRegSmileWink } from "react-icons/fa";
import Button from "@mui/material/Button";
import { BiPlusMedical } from "react-icons/bi";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { ImEye } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import Badge from "../../components/Badge";
import { PiExportFill } from "react-icons/pi";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Progress from "../../Components/ProgressBar";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBox from "../../Components/SearchBox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FcDeleteDatabase } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Rating from "@mui/material/Rating";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MyContext } from "../../App";
import {
  fetchDataFromApi,
  deleteMultipleData,
  deleteData,
} from "../../utils/api";

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
    minWidth: 130,
  },
  {
    id: "sales",
    label: "VENTAS",
    minWidth: 100,
  },
  {
    id: "rating",
    label: "CALIFICACIÓN",
    minWidth: 100,
  },
  {
    id: "action",
    label: "OPCIONES",
    minWidth: 120,
  },
];

/*function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}*/

const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const [productCat, setProductCat] = React.useState("");
  const [productSubCat, setProductSubCat] = React.useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categoryFilterVal, setcategoryFilterVal] = React.useState("");
  const [isLoading, setIsloading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const context = useContext(MyContext);

  const [orders, setOrders] = useState([]);

  const [chart1Data /*{setChart1Data}*/] = useState([
    {
      name: "ENERO",
      USUARIOS: 4000,
      VENTAS: 2400,
      amt: 2400,
    },
    {
      name: "FEBRERO",
      USUARIOS: 3000,
      VENTAS: 1398,
      amt: 2210,
    },
    {
      name: "MARZO",
      USUARIOS: 2000,
      VENTAS: 9800,
      amt: 2290,
    },
    {
      name: "ABRIL",
      USUARIOS: 2780,
      VENTAS: 3908,
      amt: 2000,
    },
    {
      name: "MAYO",
      USUARIOS: 1890,
      VENTAS: 4800,
      amt: 2181,
    },
    {
      name: "JUNIO",
      USUARIOS: 2390,
      VENTAS: 3800,
      amt: 2500,
    },
    {
      name: "JULIO",
      USUARIOS: 3490,
      VENTAS: 4300,
      amt: 2100,
    },
    {
      name: "AGOSTO",
      USUARIOS: 2000,
      VENTAS: 2400,
      amt: 2400,
    },
    {
      name: "SEPTIEMBRE",
      USUARIOS: 2780,
      VENTAS: 3908,
      amt: 2000,
    },
    {
      name: "OCTUBRE",
      USUARIOS: 1890,
      VENTAS: 4800,
      amt: 2181,
    },
    {
      name: "NOVIEMBRE",
      USUARIOS: 2390,
      VENTAS: 3800,
      amt: 2500,
    },
    {
      name: "DICIEMBRE",
      USUARIOS: 3490,
      VENTAS: 4300,
      amt: 2100,
    },
  ]);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, []);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);

      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const handleCheckboxChange = (e, id /*, index*/) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );

    setProductData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const getProducts = async () => {
    setIsloading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsloading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    setIsloading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsloading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirdLavelCat("");
    setIsloading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsloading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductThirdLavelSubCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    setProductCat("");
    setProductSubCat("");
    setIsloading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLavelCat/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsloading(false);
        }, 300);
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const deleteMultipleProduct = async () => {
    if (sortedIds.length === 0) {
      context.alertBox("error", "SELECCIONE LOS ELEMENTOS QUE DESEA ELIMINAR");
      return;
    }
    setIsMultiConfirmOpen(true);
  };

  const confirmDeleteMultiple = async () => {
    try {
      await deleteMultipleData(`/api/product/deleteMultiple`, {
        ids: sortedIds,
      });
      getProducts();
      setSortedIds([]);
      setIsMultiConfirmOpen(false);
      context.alertBox("success", "PRODUCTOS ELIMINADOS");
    } catch (error) {
      console.error(error);
      context.alertBox("error", "ERROR AL ELIMINAR ELEMENTOS");
    }
  };

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

  const handleChangePageCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  return (
    <>
      <div className="w-full !bg-white !py-2 !px-5 border border-[#082c55] flex items-center !gap-8 !mb-5 justify-between rounded-md !shadow-[5px_5px_5px_#082c55]">
        <div className="info ">
          <h1 className="text-[35px] !font-bold !font-[bold] leading-10 !mb-3 ">
            BUENOS DIAS,
            <br /> JONATHAN
          </h1>
          <p className="!font-[500">
            ESTO ES LO QUE PASA HOY EN TU TIENDA. CONSULTA LAS ESTADÍSTICAS
            INMEDIATAMENTE.
          </p>
          <br />
          <Button
            className="btn-blue !gap-3"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVO PRODUCTO",
              })
            }
          >
            <BiPlusMedical /> AGREGAR PRODUCTO
          </Button>
        </div>

        <img src="../../../imagenes/Saludo/Saludo4.png" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card !my-4  shadow-md sm:rounded-lg dark:bg-gray-800 ">
        <div className="flex !bg-gray-950 items-center justify-between  !px-5 !py-5 !mt-3 border-b dark:border-gray-700 ">
          <h2 className="text-white text-[20px] !font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">
              (MATERIAL UI DESCRIPCION)
            </span>
          </h2>

          <div className="col !w-[55%] !ml-auto flex items-center justify-end !gap-2">
            {sortedIds?.length > 0 && (
              <Button
                variant="contained"
                className="btn btn-sm !bg-red-800 hover:!bg-red-950 !font-bold transition-all duration-300"
                onClick={deleteMultipleProduct}
              >
                ELIMINAR
              </Button>
            )}
            <Button className="btn btn-sm flex items-center">EXPORTAR</Button>
            <Button
              className="btn btn-sm "
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
                  <Checkbox
                    {...label}
                    size="small"
                    className="!text-white"
                    onChange={handleSelectAll}
                    checked={
                      productData?.length > 0
                        ? productData.every((item) => item.checked)
                        : false
                    }
                  />
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
              {isLoading === false ? (
                productData?.length !== 0 &&
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
                            checked={product.checked === true ? true : false}
                            onChange={(e) =>
                              handleCheckboxChange(e, product._id, index)
                            }
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
                          <p className="text-[15px] !w-[100px] ">
                            <Rating
                              name="half-rating"
                              size="small"
                              defaultValue={product?.rating}
                            />
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
                            <Link href={`/product/${product?._id}`} passHref>
                              <Button className="!-[35px] !h-[35px] !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
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
                  })
              ) : (
                <>
                  <TableRow>
                    <TableCell colspan={8}>
                      <div className="flex items-center justify-center w-full min-h-[400px]">
                        <CircularProgress className="!text-white" />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
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

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] !font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">()</span>
          </h2>
        </div>

        <div className="flex items-center w-full !text-white !bg-gray-800 !pl-5 !pr-5 !py-4 !border-b !border-gray-500 justify-between">
          <div className="col !w-[20%]">
            <h4 className="font-[bold] !text-[15px] !mb-2">CATEGORIA</h4>
            <Select
              className="w-full !text-white !font-[bold] !font-bold !bg-gray-600 !border-0 !rounded-md !shadow-none !border-b !border-gray-500"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangePageCatFilter}
              label="CATEGORIA"
            >
              <MenuItem
                value=""
                className="hover:!bg-gray-700 hover:!text-white !font-[bold] !font-bold"
              >
                <em>NINGUNO</em>
              </MenuItem>
              <MenuItem
                value={10}
                className="hover:!bg-gray-700 hover:!text-white !font-[bold] !font-bold"
              >
                MAQUINAS
              </MenuItem>
              <MenuItem
                value={20}
                className="hover:!bg-gray-700 hover:!text-white !font-[bold] !font-bold"
              >
                REPUESTOS
              </MenuItem>
              <MenuItem
                value={30}
                className="hover:!bg-gray-700 hover:!text-white !font-[bold] !font-bold"
              >
                ACCESORIOS
              </MenuItem>
            </Select>
          </div>

          <div className="!w-[35%] !ml-auto flex items-center !gap-3">
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
              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="!font-bold !font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] font-[bold] !text-white !mt-1">
                        MÁQUINA
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  ELECTRONICO
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  MAQUINA
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div className="flex items-center !gap-1">
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <GrEdit className=" !text-[20px] " />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <ImEye className="!text-[20px]" />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <FaTrashAlt className="!text-[20px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="!font-bold !font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] font-[bold] !text-white !mt-1">
                        MÁQUINA
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  ELECTRONICO
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  MAQUINA
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div className="flex items-center !gap-1">
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <GrEdit className=" !text-[20px] " />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <ImEye className="!text-[20px]" />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <FaTrashAlt className="!text-[20px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="!font-bold !font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] font-[bold] !text-white !mt-1">
                        MÁQUINA
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  ELECTRONICO
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  MAQUINA
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <div className="flex items-center !gap-1">
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <GrEdit className=" !text-[20px] " />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <ImEye className="!text-[20px]" />
                    </Button>
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <FaTrashAlt className="!text-[20px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="!bg-gray-100 !text-balck !border-t !border-gray-500"
        />
      </div>

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

      <Dialog
        open={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
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
            ¿DESEA ELIMINAR TODOS LOS PRODUCTOS SELECCIONADOS?
          </DialogTitle>
          <p className="text-gray-800 text-[16px] !mb-4">
            ESTA ACCIÓN NO SE PUEDE DESHACER
          </p>
        </div>
        <div className="flex justify-center !gap-3 !pb-2">
          <Button
            onClick={confirmDeleteMultiple}
            className="!bg-[#1976d2] hover:!bg-[#0d47a1] !text-white !font-bold !px-4 !py-2"
          >
            Sí, eliminar
          </Button>
          <Button
            onClick={() => setIsMultiConfirmOpen(false)}
            className="!bg-[#d32f2f] hover:!bg-[#9a0007] !text-white !font-bold !px-4 !py-2"
          >
            Cancelar
          </Button>
        </div>
      </Dialog>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] font-[500] ">
            PEDIDOS RECIENTES
          </h2>
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
                  FECHA
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length !== 0 &&
                orders?.map((order, index) => {
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
                          {order?.userId?.mobile}
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
                              order?.delivery_address?.country}
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
                          <span className="text-white">
                            {order?.userId?._id}
                          </span>
                        </td>
                        <td class="!px-6 !py-4 font-[500] text-white">
                          <Badge status={order?.order_status} />
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
                                          {item?.price?.toLocaleString(
                                            "en-US",
                                            {
                                              style: "currency",
                                              currency: "USD",
                                            }
                                          )}
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
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:!bg-gray-800">
        <div class="flex !bg-gray-950 items-center justify-between !px-5 !py-5 !mb-5 border-b dark:border-gray-700">
          <h2 class="text-white text-[20px] !font-[500] ">
            TASA DE CLIENTES REPETIDOS
          </h2>
        </div>

        <div class="flex items-center !px-5 !py-5 !mb-5 !pt-0 !gap-8">
          <span className="flex items-center !text-white !text-[15px] !font-bold !gap-3">
            <span className="block w-[10px] h-[10px] rounded-full !bg-[#8884d8]"></span>
            TOTAL DE USUARIOS
          </span>

          <span className="flex items-center !text-white !text-[15px] !font-bold !gap-3">
            <span className="block w-[10px] h-[10px] rounded-full !bg-[#82ca9d] "></span>
            TOTAL DE VENTAS
          </span>
        </div>

        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="USUARIOS"
            strokeWidth={3}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="VENTAS"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
