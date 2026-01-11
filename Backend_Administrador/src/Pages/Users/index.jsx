import React, { /*useContext,*/ useContext, useEffect, useState } from "react";
import { Badge, Button, Dialog, DialogTitle } from "@mui/material";
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
import { FaTrashAlt } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";

import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

export const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [userTotalData, setUserTotalData] = useState([]);

  const [sortedIdsUser, setSortedIdsUser] = useState([]);

  const [isMultiConfirmOpenUser, setIsMultiConfirmOpenUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isConfirmOpenUser, setIsConfirmOpenUser] = useState(false);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredItems = userTotalData?.filter(
        (user) =>
          user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.createdAt?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery]);

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

  const handleCheckboxChangeUser = (e, id /*, index*/) => {
    const updatedItems = userData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );

    setUserData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIdsUser(selectedIds);
  };

  const deleteMultipleUser = async () => {
    if (sortedIdsUser.length === 0) {
      context.alertBox("error", "SELECCIONE LOS ELEMENTOS QUE DESEA ELIMINAR");
      return;
    }
    setIsMultiConfirmOpenUser(true);
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

  const deleteUser = (id) => {
    setUserToDelete(id);
    setIsConfirmOpenUser(true);
  };

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

  return (
    <>
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
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
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
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
    </>
  );
};

export default Users;
