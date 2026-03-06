import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GrEdit } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import Dialog from "@mui/material/Dialog";
import { FcDeleteDatabase } from "react-icons/fc";
import DialogTitle from "@mui/material/DialogTitle";

const columns = [
  { id: "image", label: "IMAGEN", minWidth: 250 },
  { id: "title", label: "TITULO", minWidth: 250 },
  { id: "description", label: "DESCRIPCIÓN", minWidth: 300 },
  { id: "action", label: "OPCIONES", minWidth: 100 },
];

export const BlogList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [blogData, setBlogData] = useState([]);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteSlide = (id) => {
    setSlideToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (slideToDelete) {
      deleteData(`/api/blog/${slideToDelete}`).then(() => {
        getData();
        setIsConfirmOpen(false);
        setSlideToDelete(null);
        context.alertBox("success", "BLOG ELIMINADA EXITOSAMENTE");
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 !bg-gray-700  !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] !font-[500] mb-2 sm:mb-0">
          LISTA DE BLOGS
        </h2>

        <div className="col flex items-center justify-start md:justify-end !gap-3">
          <Button
            className="btn btn-blue !gap-3"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "AGREGAR BLOG",
              })
            }
          >
            AÑADIR BLOG
          </Button>
        </div>
      </div>

      <div className="card !my-4 !pt-5 shadow-md sm:rounded-lg dark:bg-gray-800">
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
              {blogData?.length !== 0 &&
                blogData?.map((item, index) => {
                  return (
                    <TableRow className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 border-gray-200">
                      <TableCell width={300}>
                        <div
                          className="flex items-center !gap-4 w-[150px] sm:w-[400px]"
                          key={index}
                        >
                          <div className="img w-full rounded-md overflow-hidden border border-[#fff] group">
                            <img
                              src={item?.images[0]}
                              className=" group-hover:scale-105 transition-all duration-300 !cursor-pointer w-[150px]  sm:w-[400px] h-[75px] sm:h-[200px]"
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell width={200} className="!text-white">
                        <span
                          className="!text-white text-[15px] !font-[bold]
                        inline-block w-[200px] sm:w-[200px] md:w-[300px] whitespace-normal break-words"
                        >
                          {item?.title}
                        </span>
                      </TableCell>

                      <TableCell width={300} className="!text-white">
                        <div
                          className="w-[250px] sm:w-[200px] md:w-[300px] whitespace-normal break-words"
                          dangerouslySetInnerHTML={{
                            __html: item?.description?.substr(0, 100) + "...",
                          }}
                        />
                      </TableCell>

                      <TableCell width={100} className="!text-white">
                        <div className="flex items-center !gap-3">
                          <Button
                            className="!w-[35px] !h-[35px] !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "EDITAR BLOG",
                                id: item?._id,
                              })
                            }
                          >
                            <GrEdit className=" !text-[20px] " />
                          </Button>
                          <Button
                            className="!w-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() => deleteSlide(item?._id)}
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
            ¿DESEA ELIMINAR ESTE BLOG?
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

export default BlogList;
