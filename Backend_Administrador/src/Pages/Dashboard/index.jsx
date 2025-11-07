import React, { useState, PureComponent, useContext } from "react";
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

/*function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}*/

const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categoryFilterVal, setcategoryFilterVal] = React.useState("");
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

  const context = useContext(MyContext);

  const handleChangePageCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="!text-white text-[20px] font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">
              (PEQUEÑA DESCRIPCION)
            </span>
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

          <div className="col !w-[37%] !ml-auto flex items-center !gap-3">
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

        <div class="relative overflow-x-auto !mt-2  dark:!bg-gray-800">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
              <tr>
                <th scope="col" class="!px-6 !pr-0 !py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="!px-0 !py-3 whitespace-nowrap">
                  PRODUCTO
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  CATEGORIA
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  SUB CATEGORIA
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  MARCA
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  PRECIO
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  VENTAS
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  OPCIONES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="!px-6 !pr-0 !py-2">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </td>
                <td className="!px-0 !py-2">
                  <div className="flex items-center !gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-bold font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] !mt-1">MÁQUINA</p>
                    </div>
                  </div>
                </td>
                <td className="!px-6 !py-2">ELECTRONICO</td>
                <td className="!px-6 !py-2">MAQUINA</td>
                <td className="!px-6 !py-2">SINGER</td>
                <td className="!px-6 !py-2 ">
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </td>
                <td className="!px-6 !py-2">
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="warning" />
                </td>

                <td className="!px-6 !py-2">
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
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="!px-6 !pr-0 !py-2">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </td>
                <td className="!px-0 !py-2">
                  <div className="flex items-center !gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-bold font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] !mt-1">MÁQUINA</p>
                    </div>
                  </div>
                </td>
                <td className="!px-6 !py-2">ELECTRONICO</td>
                <td className="!px-6 !py-2">MAQUINA</td>
                <td className="!px-6 !py-2">SINGER</td>
                <td className="!px-6 !py-2 ">
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </td>
                <td className="!px-6 !py-2">
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="warning" />
                </td>

                <td className="!px-6 !py-2">
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
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="!px-6 !pr-0 !py-2">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </td>
                <td className="!px-0 !py-2">
                  <div className="flex items-center !gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <h3 className="font-bold font-[bold] text-[12px] leading-4">
                        <Link
                          to="/product/45745"
                          className="!text-white hover:!text-[white] !cursor-pointer"
                        >
                          MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ
                          9610SA-D3-M-3 MÁQUINA DE COSER INDUSTRIAL
                        </Link>
                      </h3>

                      <p className="text-[12px] !mt-1">MÁQUINA</p>
                    </div>
                  </div>
                </td>
                <td className="!px-6 !py-2">ELECTRONICO</td>
                <td className="!px-6 !py-2">MAQUINA</td>
                <td className="!px-6 !py-2">SINGER</td>
                <td className="!px-6 !py-2 ">
                  <div class="flex !gap-1 flex-col">
                    <span class="oldPrice line-through leading-3 text-[15px] font-[500]">
                      $69.99
                    </span>
                    <span class="price text-[white] text-[15px] font-[600]">
                      $99.00
                    </span>
                  </div>
                </td>
                <td className="!px-6 !py-2">
                  <p className="text-[15px] w-[100px]">
                    <span className="font-[600]">369 </span>
                    VENTAS
                  </p>
                  <Progress value={40} type="warning" />
                </td>

                <td className="!px-6 !py-2">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end !pt-5 !pb-5 !px-4 !bg-gray-100 !border-t !border-gray-500">
          <Pagination count={10} className="custom-pagination" />
        </div>
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] !font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">
              (MATERIAL UI DESCRIPCION)
            </span>
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

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] font-[500] ">
            PEDIDOS RECIENTES
          </h2>
        </div>
        <div class="relative overflow-x-auto !mt-1  dark:!bg-gray-800">
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
                  ID PAGO
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
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="!px-6 !py-4 font-[700] text-white">
                  <Button
                    className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] transition-all duration-300"
                    onClick={() => isShowOrderdProduct(0)}
                  >
                    {isOpenOrderdProduct === 0 ? (
                      <FaAnglesUp className="text-[20px]" />
                    ) : (
                      <FaAnglesDown className="text-[20px]" />
                    )}
                  </Button>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                  SILVER SILVER
                </td>
                <td class="!px-6 !py-4 font-[500] ">0968873896</td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-[#bfc3cc] block w-[400px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam, possimus quis neque sunt molestias illum dolor
                    adipisci assumenda laboriosam impedit?
                  </span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">0316</td>
                <td class="!px-6 !py-4 font-[500] ">$369,99</td>
                <td class="!px-6 !py-4 font-[500] ">
                  jlc.rodriguez316@hotmail.com
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <Badge status="ENTREGADO" />
                </td>
                <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                  07 / 05 / 2025
                </td>
              </tr>

              {isOpenOrderdProduct === 0 && (
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
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <img
                                src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                              6
                            </td>
                            <td class="!px-6 !py-4 font-[500]">0968873896</td>
                            <td class="!px-6 !py-4 font-[500] ">$369.99</td>
                          </tr>

                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <img
                                src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                              6
                            </td>
                            <td class="!px-6 !py-4 font-[500]">0968873896</td>
                            <td class="!px-6 !py-4 font-[500] ">$369.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="!px-6 !py-4 font-[700] text-white">
                  <Button
                    className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] transition-all duration-300"
                    onClick={() => isShowOrderdProduct(1)}
                  >
                    {isOpenOrderdProduct === 1 ? (
                      <FaAnglesUp className="text-[20px]" />
                    ) : (
                      <FaAnglesDown className="text-[20px]" />
                    )}
                  </Button>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                  SILVER SILVER
                </td>
                <td class="!px-6 !py-4 font-[500] ">0968873896</td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-[#bfc3cc] block w-[400px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam, possimus quis neque sunt molestias illum dolor
                    adipisci assumenda laboriosam impedit?
                  </span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">0316</td>
                <td class="!px-6 !py-4 font-[500] ">$369,99</td>
                <td class="!px-6 !py-4 font-[500] ">
                  jlc.rodriguez316@hotmail.com
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <span className="text-white">SILVER</span>
                </td>
                <td class="!px-6 !py-4 font-[500] ">
                  <Badge status="ENTREGADO" />
                </td>
                <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                  07 / 05 / 2025
                </td>
              </tr>

              {isOpenOrderdProduct === 1 && (
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
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <img
                                src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                              6
                            </td>
                            <td class="!px-6 !py-4 font-[500]">0968873896</td>
                            <td class="!px-6 !py-4 font-[500] ">$369.99</td>
                          </tr>

                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <span className="text-white">SILVER</span>
                            </td>
                            <td class="!px-6 !py-4 font-[500] ">
                              <img
                                src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                              6
                            </td>
                            <td class="!px-6 !py-4 font-[500]">0968873896</td>
                            <td class="!px-6 !py-4 font-[500] ">$369.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
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
