import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";

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

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FcDeleteDatabase } from "react-icons/fc";
import { BiPlusMedical } from "react-icons/bi";

import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const columns = [
  { id: "image", label: "IMAGEN", minWidth: 150 },
  { id: "catName", label: "NOMBRE", minWidth: 150 },
  { id: "action", label: "OPCIONES", minWidth: 100 },
];

export const CategoryList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanel]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteCat = (id) => {
    setCatToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (catToDelete) {
      deleteData(`/api/category/${catToDelete}`).then(() => {
        fetchDataFromApi("/api/category").then((res) => {
          context?.setCatData(res?.data);
          setIsConfirmOpen(false);
          setCatToDelete(null);
          context.alertBox("success", "CATEGORÍA ELIMINADA CORRECTAMENTE");
        });
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 !bg-gray-700  !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] !font-[500] mb-2 sm:mb-0 ">
          LISTA DE CATEGORÍAS
        </h2>

        <div className="col  flex items-center justify-start md:justify-end !gap-3">
          <Button
            className="btn btn-sm !gap-3"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVA CATEGORÍA",
              })
            }
          >
            <BiPlusMedical />
            AÑADIR NUEVA CATEGORÍA
          </Button>
        </div>
      </div>

      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-950">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="!bg-gray-950">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                    className="!font-[bold]"
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
                    <TableRow
                      key={index}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200"
                    >
                      <TableCell width={100}>
                        <div className="flex items-center !gap-4 w-[40px] sm:w-[300px]">
                          <div className="img w-full rounded-md overflow-hidden !bg-Transparent group">
                            <Link to="/product/45745" data-discover="true">
                              <LazyLoadImage
                                alt={"image"}
                                effect="blur"
                                className=" group-hover:scale-105 transition-all duration-300 !cursor-pointer w-[40px] h-[25px] sm:w-[300px] sm:h-[200px]"
                                src={item.images[0]}
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell width={100}>
                        <span className="text-[14px] sm:text-[18px] !font-bold !font-[bold] !inline-block !rounded-md !p-1 !px-2 text-white">
                          {item?.name}
                        </span>
                      </TableCell>

                      <TableCell width={100} className="!text-white">
                        <div className="flex items-center !gap-3">
                          <Button
                            className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "EDITAR CATEGORÍA",
                                id: item?._id,
                              })
                            }
                          >
                            <GrEdit className=" !text-[20px] " />
                          </Button>

                          <Button
                            className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() => deleteCat(item?._id)}
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
            ¿DESEA ELIMINAR ESTA CATEGORÍA ?
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

export default CategoryList;
