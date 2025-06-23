import React, { useState } from "react";
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

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Progress from "../../Components/ProgressBar";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

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
        <div className="info">
          <h1 className="text-[35px] !font-bold !font-[bold] leading-10 !mb-3">
            BUENOS DIAS,
            <br /> JONATHAN
          </h1>
          <p className="!font-[500">
            ESTO ES LO QUE PASA HOY EN TU TIENDA. CONSULTA LAS ESTADÍSTICAS
            INMEDIATAMENTE.
          </p>
          <br />
          <Button className="btn-blue !gap-3 ">
            <BiPlusMedical /> AGREGAR PRODUCTO
          </Button>
        </div>

        <img src="../../../imagenes/Saludo/Saludo4.png" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">
              (PEQUEÑA DESCRIPCION)
            </span>
          </h2>
        </div>
        <div class="relative overflow-x-auto !mt-5  dark:!bg-gray-800">
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
                  ACCION
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
                    <Tooltip title="EDITAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <GrEdit className=" !text-[20px] " />
                      </Button>
                    </Tooltip>
                    <Tooltip title="VER DETALLES" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <ImEye className="!text-[20px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="ELIMINAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <FaTrashAlt className="!text-[20px]" />
                      </Button>
                    </Tooltip>
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
                    <Tooltip title="EDITAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <GrEdit className=" !text-[20px] " />
                      </Button>
                    </Tooltip>
                    <Tooltip title="VER DETALLES" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <ImEye className="!text-[20px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="ELIMINAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <FaTrashAlt className="!text-[20px]" />
                      </Button>
                    </Tooltip>
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
                    <Tooltip title="EDITAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <GrEdit className=" !text-[20px] " />
                      </Button>
                    </Tooltip>
                    <Tooltip title="VER DETALLES" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <ImEye className="!text-[20px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="ELIMINAR PRODUCTO" placement="top">
                      <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                        <FaTrashAlt className="!text-[20px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end !pt-5 !pb-5 !px-4 !bg-gray-950 !border-t !border-gray-500">
          <Pagination count={10} className="custom-pagination" />
        </div>
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] font-[500] ">
            PRODUCTOS
            <span className="font-[400] text-[14px] !ml-3">
              (MATERIAL UI DESCRIPCION)
            </span>
          </h2>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg dark:bg-gray-700">
        <div className="flex !bg-gray-950 items-center justify-between !px-5 !py-5 border-b dark:border-gray-700">
          <h2 className="text-white text-[20px] font-[500] ">
            PEDIDOS RECIENTES
          </h2>
        </div>
        <div class="relative overflow-x-auto !mt-5  dark:!bg-gray-800">
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
    </>
  );
};

export default Dashboard;
