import { Button } from "@mui/material";
import React from "react";
import { GiSave } from "react-icons/gi";
import Checkbox from "@mui/material/Checkbox";
import { GrEdit } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddRams = () => {
  return (
    <>
      <div className="flex !bg-gray-700 items-center justify-between !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700 ">
        <h2 className="text-white text-[20px] !font-[500] ">
          AGREGAR COLORES DEL PRODUCTO
        </h2>
      </div>

      <div className="card !my-4 !pt-5 !pb-5  sm:rounded-lg bg-white !w-[65%] shadow-[3px_3px_3px_#082c55]">
        <form className="form !py-3 !p-6">
          <div className="col !mb-4">
            <h3 className="text-[#082c55] font-bold text-[16px] !mb-2">
              COLOR DEL PRODUCTO
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="name"
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
            <GiSave className="text-[25px] text-white" />
            PUBLICAR Y VER
          </Button>
        </form>
      </div>

      <div className="card sm:rounded-lg bg-white  !w-[65%] shadow-[3px_3px_3px_#082c55]">
        <div class="relative overflow-x-auto !mt-2  dark:!bg-gray-800 sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-950 text-white">
              <tr className="!text-[18px]">
                <th scope="col" class="!px-6 !pr-0 !py-3 " width="10%">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="!px-0 !py-3 whitespace-nowrap"
                  width="60%"
                >
                  COLOR
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
              <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-700 border-gray-200">
                <td className="!px-6 !pr-0 !py-2">
                  <div className="w-[60px]">
                    <Checkbox className="!text-white" {...label} size="small" />
                  </div>
                </td>
                <td className="!px-0 !py-2 text-white">BLANCO</td>
                <td className="!px-6 !py-2">
                  <div className="flex items-center !gap-2">
                    <Button className="!-[35px] !h-[35px]  !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600">
                      <GrEdit className=" !text-[20px] " />
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
      </div>
    </>
  );
};

export default AddRams;
