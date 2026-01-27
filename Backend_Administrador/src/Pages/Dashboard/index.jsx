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
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";

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
  BarChart,
  Bar,
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

const columnsUser = [
  { id: "userImg", label: "IMAGEN ", minWidth: 80 },
  { id: "userName", label: "NOMBRE", minWidth: 100 },
  {
    id: "userEmail",
    label: "CORREO",
    minWidth: 150,
  },
  {
    id: "userPh",
    label: "TELEFONO",
    minWidth: 100,
  },
  {
    id: "verifyemail",
    label: "CORREO ESTADO",
    minWidth: 100,
  },
  {
    id: "createdDate",
    label: "CREADO",
    minWidth: 130,
  },
  {
    id: "action",
    label: "OPCIONES",
    minWidth: 100,
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
  const [pageUser, setPageUser] = React.useState(0);
  const [rowsPerPageUser, setRowsPerPageUser] = React.useState(10);

  const [isLoading, setIsloading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [sortedIdsUser, setSortedIdsUser] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);
  const [isMultiConfirmOpenUser, setIsMultiConfirmOpenUser] = useState(false);
  const [isConfirmOpenUser, setIsConfirmOpenUser] = useState(false);

  const context = useContext(MyContext);

  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pageOrder, setPageOrder] = React.useState(1);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [productTotalData, setProductTotalData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const [chartData, setChartData] = useState([]);
  /*const [, year setYear] = useState(new Date().getFullYear());*/
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);

  const [userData, setUserData] = useState([]);
  const [userTotalData, setUserTotalData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  useEffect(() => {
    if (productSearchQuery !== "") {
      const filteredOrders = productTotalData?.filter(
        (product) =>
          product._id
            ?.toLowerCase()
            .includes(productSearchQuery.toLowerCase()) ||
          product.name
            ?.toLowerCase()
            .includes(productSearchQuery.toLowerCase()) ||
          product.catName
            ?.toLowerCase()
            .includes(productSearchQuery.toLowerCase()) ||
          product.subCat?.includes(productSearchQuery),
      );
      setProductData(filteredOrders);
    } else {
      fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
        if (res?.error === false) {
          setProductData(res?.products?.reverse());
        }
      });
    }
  }, [productSearchQuery]);

  const getProducts = async () => {
    setIsloading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        res?.products?.reverse();
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setProductTotalData(res?.products);
          setIsloading(false);
        }, 300);
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?admin=true`).then((res) => {
      if (res?.error === false) {
        const all = res?.data || [];
        setTotalOrdersData(all);
        const totalPages = Math.max(1, Math.ceil(all.length / 6));
        const start = (pageOrder - 1) * 6;
        const pageData = all.slice(start, start + 6);
        setOrders({ totalPages });
        setOrdersData({ data: pageData });
      }
    });
  }, []);

  useEffect(() => {
    const dataArr = Array.isArray(totalOrdersData)
      ? totalOrdersData
      : totalOrdersData?.data || [];
    let filteredOrders = dataArr;
    if (orderSearchQuery !== "") {
      filteredOrders = dataArr.filter((order) =>
        (
          order?._id?.toString() +
          " " +
          (order?.userId?.name || "") +
          " " +
          (order?.userId?.email || "") +
          " " +
          (order?.createdAt || "")
        )
          .toLowerCase()
          .includes(orderSearchQuery.toLowerCase()),
      );
    }

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / 6));
    const start = (pageOrder - 1) * 6;
    const pageData = filteredOrders.slice(start, start + 6);
    setOrders({ totalPages });
    setOrdersData({ data: pageData });
    if (pageOrder > totalPages) setPageOrder(1);
  }, [pageOrder, totalOrdersData, orderSearchQuery]);

  useEffect(() => {
    getVENTASByYear();
    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false) {
        setUsers(res?.users);
        setTotalUsuarios(Array.isArray(res?.users) ? res.users.length : 0);
      }
    });
    fetchDataFromApi("/api/user/getAllReviews").then((res) => {
      if (res?.error === false) {
        setAllReviews(res?.reviews);
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
      item._id === id ? { ...item, checked: !item.checked } : item,
    );

    setProductData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    setIsloading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products?.reverse());
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
      `/api/product/getAllProductsBySubCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products?.reverse());
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
      `/api/product/getAllProductsByThirdLavelCat/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products?.reverse());
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

  const handleChangeRowsPerPageUser = (event) => {
    setRowsPerPageUser(+event.target.value);
    setPageUser(0);
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

  const handleChangePageUser = (event, newPage) => {
    setPageUser(newPage);
  };

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const getUSUARIOSByYear = () => {
    fetchDataFromApi(`/api/order/users`).then((res) => {
      const users = [];
      res?.USUARIOS?.length !== 0 &&
        res?.USUARIOS?.map((item) => {
          users.push({
            name: item?.name,
            USUARIOS: parseInt(item?.USUARIOS),
          });
        });
      const uniqueArr = users.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name),
      );
      setChartData(uniqueArr);
    });
  };

  const getVENTASByYear = () => {
    fetchDataFromApi(`/api/order/sales`).then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
        res?.monthlySales?.map((item) => {
          sales.push({
            name: item?.name,
            VENTAS: parseInt(item?.VENTAS),
          });
        });

      const uniqueArr = sales.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name),
      );
      setTotalVentas(
        res?.VENTAS
          ? parseInt(res.VENTAS)
          : uniqueArr.reduce((s, i) => s + (i.VENTAS || 0), 0),
      );
      setChartData(uniqueArr);
    });
  };

  {
    /* const handleChangeYear = (event) => {
    getVENTASByYear(event.target.value);
    setYear(event.target.value);
  };
*/
  }

  const getUsers = async () => {
    setIsloading(true);
    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      let userArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.users?.length; i++) {
          userArr[i] = res?.users[i];
          userArr[i].checked = false;
        }
        setTimeout(() => {
          setUserData(userArr);
          setUserTotalData(res?.users);
          setIsloading(false);
        }, 300);
      }
    });
  };

  useEffect(() => {
    getUsers();
    setIsloading(true);
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      setUserData(res?.users);
      setUserTotalData(res?.users);
      setIsloading(false);
    });
  }, []);

  const handleCheckboxChangeUser = (e, id /*, index*/) => {
    const updatedItems = userData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item,
    );

    setUserData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIdsUser(selectedIds);
  };

  const deleteUser = (id) => {
    setUserToDelete(id);
    setIsConfirmOpenUser(true);
  };

  const deleteMultipleUser = async () => {
    if (sortedIdsUser.length === 0) {
      context.alertBox("error", "SELECCIONE LOS ELEMENTOS QUE DESEA ELIMINAR");
      return;
    }
    setIsMultiConfirmOpenUser(true);
  };

  useEffect(() => {
    if (userSearchQuery !== "") {
      const filteredItems = userTotalData?.filter(
        (user) =>
          user._id?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.name?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          user.createdAt?.toLowerCase().includes(userSearchQuery.toLowerCase()),
      );
      setUserData(filteredItems);
    } else {
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res?.error === false) {
          setUserData(res?.users);
          setIsloading(false);
        }
      });
    }
  }, [userSearchQuery]);

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteData(`/api/user/${userToDelete}`).then(() => {
        getUsers();
        setIsConfirmOpenUser(false);
        setUserToDelete(null);
        context.alertBox("success", "USUARIO ELIMINADO EXITOSAMENTE");
      });
    }
  };

  const confirmDeleteMultipleUser = async () => {
    try {
      await deleteMultipleData(`/api/user/deleteMultiple`, {
        ids: sortedIdsUser,
      });
      getUsers();
      setSortedIdsUser([]);
      setIsMultiConfirmOpenUser(false);
      context.alertBox("success", "USUARIOS ELIMINADOS");
    } catch (error) {
      console.error(error);
      context.alertBox("error", "ERROR AL ELIMINAR ELEMENTOS");
    }
  };

  const handleSelectAllUser = (e) => {
    const isChecked = e.target.checked;

    const updatedItems = userData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUserData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);

      setSortedIdsUser(ids);
    } else {
      setSortedIdsUser([]);
    }
  };

  return (
    <>
      <div className="w-full !bg-white !py-5 !px-5 border border-[#082c55] flex items-center !gap-8 !mb-5 justify-between rounded-md !shadow-[5px_5px_5px_#082c55]">
        <div className="info ">
          <h1 className="text-[25px] sm:text-[35px] text-[#082c55] !font-bold !font-[bold] leading-10 mb-1 sm:mb-3">
            BUENOS DIAS,
            <br />
            <h1 className="text-[25px] sm:text-[35px] text-[#f1683a] !font-bold !font-[bold] leading-10 mb-0 sm:mb-3">
              {context?.user?.name?.toUpperCase() ||
                context?.userData?.name?.toUpperCase() ||
                "USUARIO"}
            </h1>
          </h1>
          <p className="!font-[500] text-[12px] sm:text-[16px] text-gray-700 ">
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

        <img
          src="../../../imagenes/Saludo/Saludo4.png"
          className="w-[250px] hidden lg:block"
        />
      </div>

      {productData?.length !== 0 &&
        users?.length !== 0 &&
        allReviews?.length !== 0 && (
          <DashboardBoxes
            orders={totalOrdersData?.length}
            products={productData?.length}
            users={users?.length}
            reviews={allReviews?.length}
            category={context?.catData?.length}
          />
        )}

      <div className="card !my-4  shadow-md sm:rounded-lg dark:bg-gray-800 ">
        <div className="flex !bg-gray-950 items-center justify-between  !px-5 !py-5 !mt-3 border-b dark:border-gray-700 ">
          <h2 className="text-white text-[15px] sm:text-[20px] !font-[500] ">
            PRODUCTOS
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
          </div>
        </div>

        <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg">
          <div className="flex items-center w-full !text-white !bg-gray-800 !pl-5 !pr-5 !py-4 !border-b !border-gray-500 justify-between !gap-4 dashboardFilters">
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

            <div className="col !w-[20%] ml-auto search_box">
              <SearchBox
                searchQuery={productSearchQuery}
                setSearchQuery={setProductSearchQuery}
              />
            </div>
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

      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-800">
        <div className="flex items-center w-full !text-white !bg-gray-800 !pl-5 !pr-5 !py-4 !border-b !border-gray-500 justify-between">
          <div className="col w-[50%]">
            <h2 className="text-white text-[20px] !font-[500] ">
              LISTA DE USUARIOS
              <span className="font-[400] text-[14px] !ml-3"></span>
            </h2>
          </div>

          <div className="col w-[40%]  !ml-auto flex items-center justify-end !gap-2">
            {sortedIdsUser?.length > 0 && (
              <Button
                variant="contained"
                className="btn btn-sm !bg-red-800 hover:!bg-red-950 !font-bold transition-all duration-300"
                onClick={deleteMultipleUser}
              >
                ELIMINAR
              </Button>
            )}

            <SearchBox
              searchQuery={userSearchQuery}
              setSearchQuery={setUserSearchQuery}
            />
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
                    onChange={handleSelectAllUser}
                    checked={
                      userData?.length > 0
                        ? userData.every((item) => item.checked)
                        : false
                    }
                  />
                </TableCell>

                {columnsUser.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <span className="whitespace-nowrap">{column.label}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading === false ? (
                userData?.length !== 0 &&
                userData
                  ?.slice(
                    pageUser * rowsPerPageUser,
                    pageUser * rowsPerPageUser + rowsPerPageUser,
                  )
                  ?.reverse()
                  .map((user, index) => {
                    return (
                      <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                        <TableCell style={{ minWidth: columnsUser.minWidth }}>
                          <Checkbox
                            {...label}
                            size="small"
                            className="!text-white"
                            checked={user.checked === true ? true : false}
                            onChange={(e) =>
                              handleCheckboxChangeUser(e, user._id, index)
                            }
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columnsUser.minWidth }}>
                          <div className="flex items-center !gap-4 w-[70px] ">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                              <Link to="/product/45745">
                                <img
                                  src={
                                    user?.avatar !== "" &&
                                    user?.avatar !== undefined
                                      ? user?.avatar
                                      : "/"
                                  }
                                  className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          {user?.name}
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          <span className="flex items-center !gap-2">
                            <MdEmail /> {user?.email}
                          </span>
                        </TableCell>

                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          <span className="flex items-center !gap-2">
                            <FaPhoneAlt />{" "}
                            {user?.mobile === null ? "NINGUNO" : user?.mobile}
                          </span>
                        </TableCell>

                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          {user?.verify_email === false ? (
                            <span
                              className={`inline-block !py-1 !px-4 rounded-full text-[12px] capitalize 
                                  bg-gray-600 text-white 
                                `}
                            >
                              NO VERIFICADO
                            </span>
                          ) : (
                            <span
                              className={`inline-block !py-1 !px-4 rounded-full text-[12px] capitalize 
                                  bg-green-800 text-white
                                `}
                            >
                              VERIFICADO
                            </span>
                          )}
                        </TableCell>

                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          <span className="flex items-center !gap-2">
                            <BsFillCalendar2DateFill />{" "}
                            {user?.updatedAt?.split("T")[0]}
                          </span>
                        </TableCell>
                        <TableCell
                          style={{ minWidth: columnsUser.minWidth }}
                          className="!text-white"
                        >
                          <div className="flex items-center justify-center !gap-1">
                            <Button
                              className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                              onClick={() => deleteUser(user?._id)}
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
          count={userData?.length}
          rowsPerPage={rowsPerPageUser}
          page={pageUser}
          onPageChange={handleChangePageUser}
          onRowsPerPageChange={handleChangeRowsPerPageUser}
          className="!bg-gray-100 !text-balck !border-t !border-gray-500"
        />
      </div>

      <Dialog
        open={isConfirmOpenUser}
        onClose={() => setIsConfirmOpenUser(false)}
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
            ¿DESEA ELIMINAR ESTE USUARIO?
          </DialogTitle>
          <p className="text-gray-800 text-[16px] !mb-4">
            ESTA ACCIÓN NO SE PUEDE DESHACER
          </p>
        </div>
        <div className="flex justify-center !gap-3 !pb-2">
          <Button
            onClick={confirmDeleteUser}
            className="!bg-[#1976d2] hover:!bg-[#0d47a1] !text-white !font-bold !px-4 !py-2"
          >
            Sí, eliminar
          </Button>
          <Button
            onClick={() => setIsConfirmOpenUser(false)}
            className="!bg-[#d32f2f] hover:!bg-[#9a0007] !text-white !font-bold !px-4 !py-2"
          >
            Cancelar
          </Button>
        </div>
      </Dialog>

      <Dialog
        open={isMultiConfirmOpenUser}
        onClose={() => setIsMultiConfirmOpenUser(false)}
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
            ¿DESEA ELIMINAR TODOS LOS USUARIOS SELECCIONADOS?
          </DialogTitle>
          <p className="text-gray-800 text-[16px] !mb-4">
            ESTA ACCIÓN NO SE PUEDE DESHACER
          </p>
        </div>
        <div className="flex justify-center !gap-3 !pb-2">
          <Button
            onClick={confirmDeleteMultipleUser}
            className="!bg-[#1976d2] hover:!bg-[#0d47a1] !text-white !font-bold !px-4 !py-2"
          >
            Sí, eliminar
          </Button>
          <Button
            onClick={() => setIsMultiConfirmOpenUser(false)}
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
          <div className="w-[25%]">
            <SearchBox
              searchQuery={orderSearchQuery}
              setSearchQuery={setOrderSearchQuery}
              setPageOrder={setPageOrder}
            />
          </div>
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
              {ordersData?.data?.length !== 0 &&
                ordersData?.data?.map((order, index) => {
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
                          +{order?.userId?.mobile}
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
                              order?.delivery_address?.country +
                              ", " +
                              "+" +
                              order?.delivery_address?.mobile}
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
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-xs font-semibold text-white
                             ${
                               order?.order_status === "CONFIRMADO"
                                 ? "bg-green-600"
                                 : order?.order_status === "PENDIENTE"
                                   ? "bg-red-500"
                                   : order?.order_status === "ENVIADO"
                                     ? "bg-orange-500"
                                     : "bg-gray-500"
                             }
                           `}
                          >
                            {order?.order_status}
                          </span>
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
                                            },
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

        {orders?.totalPages > 1 && (
          <div className="flex items-center justify-center  !mt-0 !pb-3 !bg-gray-100 !text-balck !border-t !border-gray-500">
            <Pagination
              showFirstButton
              showLastButton
              count={orders?.totalPages}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
            />
          </div>
        )}
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:!bg-gray-100">
        <div class="flex !bg-gray-950 items-center justify-between !px-5 !py-5 !mb-0 border-b dark:border-gray-700">
          <h2 class="text-white text-[12px] sm:text-[20px] !font-[500] ">
            TASA DE CLIENTES Y VENTAS DEL AÑO ACTUAL
          </h2>
        </div>

        <div class="flex items-center !px-5 !py-5 !mb-5 !pt-5 !gap-8 !bg-gray-800">
          <button
            className="flex items-center !text-white !text-[15px] !font-bold !gap-3 !cursor-pointer"
            onClick={getVENTASByYear}
          >
            <div className="flex flex-col items-center text-[12px] sm:text-[20px] ml-2">
              <span>TOTAL DE VENTAS</span>
              <span className="!font-[800] !text-[#16a34a]">
                $ {totalVentas ? totalVentas.toLocaleString() : 0}
              </span>
            </div>
          </button>

          <button
            className="flex items-center !text-white !text-[15px] !font-bold !gap-3 !cursor-pointer"
            onClick={getUSUARIOSByYear}
          >
            <div className="flex flex-col items-center text-[12px] sm:text-[20px] ml-2">
              <span>TOTAL DE USUARIOS</span>
              <span className="!font-[800] !text-[#4471ca]">
                {totalUsuarios ?? 0}
              </span>
            </div>
          </button>
        </div>

        {chartData?.length !== 0 && (
          <BarChart
            width={
              context?.windowWidth > 992
                ? context?.windowWidth - 300
                : context?.windowWidth - 100
            }
            height={500}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 35, right: 10 }}
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#071739",
                color: "white",
              }}
              labelStyle={{ color: "yellow" }}
              itemStyle={{ color: "cyan" }}
              cursor={{ fill: "white" }}
            />
            <Legend />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={false}
            />
            <Bar dataKey="VENTAS" stackId="a" fill="#16a34a" />
            <Bar dataKey="USUARIOS" stackId="b" fill="#0858f7" />
          </BarChart>
        )}
      </div>
    </>
  );
};

export default Dashboard;
