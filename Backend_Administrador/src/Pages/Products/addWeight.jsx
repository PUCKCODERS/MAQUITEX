import { Button } from "@mui/material";
import React from "react";
import { GiSave } from "react-icons/gi";
import { GrEdit } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const AddWeight = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productWeight/get").then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || name.trim() === "") {
      setIsLoading(false);
      context.alertBox("error", "PORFAVOR INGRESE EL PESO");
      return;
    }

    if (editId === "") {
      postData(`/api/product/productWeight/create`, { name })
        .then((res) => {
          if (res?.error === false) {
            context.alertBox("success", res?.message);
            setTimeout(() => {
              setIsLoading(false);
              getData();
              setName("");
            }, 300);
          } else {
            setIsLoading(false);
            context.alertBox("error", res?.message);
          }
        })
        .catch(() => setIsLoading(false));
    } else {
      editData(`/api/product/productWeight/${editId}`, { name })
        .then((res) => {
          if (res?.data?.error === false) {
            context.alertBox("success", res?.data?.message);
            setTimeout(() => {
              setIsLoading(false);
              getData();
              setName("");
              setEditId("");
            }, 300);
          } else {
            setIsLoading(false);
            context.alertBox("error", res?.data?.message);
          }
        })
        .catch(() => setIsLoading(false));
    }
  };
  const deleteItem = (id) => {
    deleteData(`/api/product/productWeight/${id}`).then(() => {
      getData();
      setName("");
      setEditId("");
      context.alertBox("success", "PESO ELIMINADO");
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productWeight/${id}`).then((res) => {
      console.log(res);
      setName(res?.data?.name);
      setEditId(res?.data?._id);
    });
  };

  return (
    <>
      <div className="flex !bg-gray-950 items-center justify-center !px-5 !py-5 !mt-3 sm:rounded-lg border-b w-[100%] sm:w-[50%] dark:border-gray-700 ">
        <h2 className="text-white text-[20px] !font-[500] ">
          AGREGAR PESO DEL PRODUCTO
        </h2>
      </div>

      <div className="card !my-4 !pt-2 sm:rounded-lg bg-gray-600 w-[100%] sm:w-[50%] shadow-[3px_3px_3px_#082c55]">
        <form className="form !py-3 !p-6" onSubmit={handleSubmit}>
          <div className="col !mb-4">
            <h3 className="flex items-center justify-center text-white font-bold text-[18px] sm:text-[20px] !mb-2">
              PESO DEL PRODUCTO
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <GiSave className="text-[25px] text-white" />
                PUBLICAR Y VER
              </>
            )}
          </Button>
        </form>
      </div>

      {data?.length !== 0 && (
        <div className="card !my-4 sm:rounded-lg bg-white w-[100%] sm:w-[50%] shadow-[3px_3px_3px_#082c55]">
          <div class="relative overflow-x-auto !mt-2  dark:!bg-gray-800 sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-950 text-white">
                <tr className="!text-[18px]">
                  <th scope="col" class="!px-6 !pr-0 !py-3 " width="10%"></th>
                  <th
                    scope="col"
                    className="!px-0 !py-3 whitespace-nowrap"
                    width="60%"
                  >
                    PESO
                  </th>
                  <th
                    scope="col"
                    className="!px-6 !py-3 whitespace-nowrap"
                    width="30%"
                  >
                    OPCIÓN
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr
                      class="bg-white border-b dark:bg-gray-700 dark:border-gray-700 border-gray-200"
                      key={index}
                    >
                      <td className="!px-6 !pr-0 !py-2"></td>
                      <td className="!px-0 !py-2 text-white">
                        <span className="text-bold text-[20px]">
                          {item?.name}
                        </span>
                      </td>
                      <td className="!px-6 !py-2">
                        <div className="flex items-center !gap-2">
                          <Button
                            className="!w-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() => editItem(item?._id)}
                          >
                            <GrEdit className=" !text-[20px] " />
                          </Button>
                          <Button
                            className="!w-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                            onClick={() => deleteItem(item?._id)}
                          >
                            <FaTrashAlt className="!text-[20px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWeight;
