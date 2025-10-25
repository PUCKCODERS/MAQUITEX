import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";

import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { GrEdit } from "react-icons/gr";
import { ImEye } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MyContext } from "../../App";
import Chip from "@mui/material/Chip";
import { fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGEN CATEGORÍA", minWidth: 250 },
  { id: "catName", label: "CATEGORÍA", minWidth: 250 },
  { id: "subCatName", label: "SUBCATEGORÍA", minWidth: 400 },
  { id: "action", label: "OPCIONES", minWidth: 100 },
];

export const SubCategoryList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanel]);

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
          LISTA DE SUBCATEGORÍAS
          <span className="font-[400] text-[14px] !ml-3">
            (MATERIAL UI DESCRIPCION)
          </span>
        </h2>

        <div className="col !w-[45%] !ml-auto flex items-center justify-end !gap-3">
          <Button className="btn btn-sm flex items-center ">EXPORTAR</Button>
          <Button
            className="btn btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVA SUBCATEGORÍA",
              })
            }
          >
            AÑADIR NUEVA SUBCATEGORÍA
          </Button>
        </div>
      </div>

      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-800">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="!bg-gray-950">
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" className="!text-white" />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                      <TableCell>
                        <Checkbox
                          {...label}
                          size="small"
                          className="!text-white"
                        />
                      </TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center !gap-4 w-[80px]">
                          <div className="img w-full rounded-md overflow-hidden border border-[#fff] !bg-white group">
                            <Link to="/product/45745">
                              <img
                                src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
                                className="w-full group-hover:scale-105 transition-all duration-300 !cursor-pointer"
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label="MAQUINAS"
                          className="!text-[15px] !font-bold !font-[bold] !inline-block !rounded-md !p-1 !px-2 !bg-gray-100"
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center !gap-3">
                          <Chip
                            label="SINGER"
                            className="!text-[12px] !text-white !font-bold !font-[bold] !border !border-white !rounded-md !p-1 !px-1 !bg-[#082c55]"
                          />
                          <Chip
                            label="OVERLOCK"
                            className="!text-[12px] !text-white !font-bold !font-[bold] !border !border-white !rounded-md !p-1 !px-1 !bg-[#082c55]"
                          />
                          <Chip
                            label="OTROS"
                            className="!text-[12px] !text-white !font-bold !font-[bold] !border !border-white !rounded-md !p-1 !px-1 !bg-[#082c55]"
                          />
                        </div>
                      </TableCell>

                      <TableCell width={100} className="!text-white">
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
                  );
                })}
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

export default SubCategoryList;
