import React from "react";
import { Button } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
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
    id: "createdDate",
    label: "CREADO",
    minWidth: 130,
  },
];

export const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-800">
        <div className="flex items-center w-full !text-white !bg-gray-800 !pl-5 !pr-5 !py-4 !border-b !border-gray-500 justify-between">
          <div className="col w-[50%]">
            <h2 className="text-white text-[20px] !font-[500] ">
              LISTA DE USUARIOS
              <span className="font-[400] text-[14px] !ml-3">
                (MATERIAL UI DESCRIPCION)
              </span>
            </h2>
          </div>

          <div className="col !w-[40%] ml-auto">
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
              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[70px] ">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="../../../imagenes/user.jpg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  JONATHAN RODRIGUEZ
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <MdEmail /> jlc.rodriguez316@gmail.com
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <FaPhoneAlt /> 0968873896
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <BsFillCalendar2DateFill /> 09-08-08
                  </span>
                </TableCell>
              </TableRow>

              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[70px] ">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="../../../imagenes/user.jpg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  JONATHAN RODRIGUEZ
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <MdEmail /> jlc.rodriguez316@gmail.com
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <FaPhoneAlt /> 0968873896
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <BsFillCalendar2DateFill /> 09-08-08
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[70px] ">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="../../../imagenes/user.jpg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  JONATHAN RODRIGUEZ
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <MdEmail /> jlc.rodriguez316@gmail.com
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <FaPhoneAlt /> 0968873896
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <BsFillCalendar2DateFill /> 09-08-08
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center !gap-4 w-[70px] ">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="../../../imagenes/user.jpg"
                          className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  JONATHAN RODRIGUEZ
                </TableCell>
                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <MdEmail /> jlc.rodriguez316@gmail.com
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <FaPhoneAlt /> 0968873896
                  </span>
                </TableCell>

                <TableCell
                  style={{ minWidth: columns.minWidth }}
                  className="!text-white"
                >
                  <span className="flex items-center !gap-2">
                    <BsFillCalendar2DateFill /> 09-08-08
                  </span>
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
    </>
  );
};

export default Users;
