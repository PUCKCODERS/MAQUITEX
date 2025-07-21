import React, { useContext } from "react";
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
  const [categoryFilterVal, setCategoryFilterVal] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const context = useContext(MyContext);

  const handleChangePageCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
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
              context.setIsOpentFullScreenPanel({
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
    </>
  );
};

export default Products;
