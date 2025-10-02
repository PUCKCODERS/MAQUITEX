import React, { useContext, useState } from "react";
import { RiFileUploadFill } from "react-icons/ri";
import { BsFilePersonFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { editData } from "../../utils/api";

const AccountSidebar = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        if (
          (files[i] &&
            (files[i].type === "image/jpeg" ||
              files[i].type === "image/png" ||
              files[i].type === "image/jpg")) ||
          files[i].type === "image/webp"
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.alertBox(
            "error",
            "Por favor, seleccione un archivo de imagen válido en formato JPG, JPEG, WEBP o PNG."
          );
          setUploading(false);
          return false;
        }
      }

      console.log(formdata);
      editData("/api/user/user-avatar", formdata).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full !p-3 flex items-center justify-center flex-col">
        <div
          className="w-[110px] h-[110px] rounded-full overflow-hidden !mb-4 relative group
            flex items-center justify-center bg-[#f5f4f4]"
        >
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIvGIB9KQ40pD-BLWPOEVi68LpBpe7pT0GQ&s"
              className="w-full h-full object-cover"
            />
          )}

          <div
            className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-150 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer
                opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <RiFileUploadFill className="text-[#fff] text-[30px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>
        <h3 className="font-bold font-[bold] text-[15px]">
          JONATHAN RODRIGUEZ
        </h3>
        <h6 className="text-[12px] font-[500] text-[#979797]">
          jlc.rodriguez316@gmail.com
        </h6>
      </div>

      <ul className="list-none !pb-5 bg-[#f5f4f4] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" exact={true} activeClassName="isActive">
            <Button className="w-full !text-left !justify-start !py-2 !px-5 !capitalize !text-[#274a72] hover:!text-[#fff] hover:!bg-[#274a72] !rounded-none flex items-center !gap-2">
              <BsFilePersonFill className="text-[25px]" />
              MI PERFIL
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-list" exact={true} activeClassName="isActive">
            <Button className="w-full !text-left !justify-start !py-2 !px-5 !capitalize !text-[#274a72] hover:!text-[#fff] hover:!bg-[#274a72] !rounded-none flex items-center !gap-2">
              <FaHeart className="text-[25px]" />
              MI LISTA
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders" exact={true} activeClassName="isActive">
            <Button className="w-full !text-left !justify-start !py-2 !px-5 !capitalize !text-[#274a72] hover:!text-[#fff] hover:!bg-[#274a72] !rounded-none flex items-center !gap-2">
              <FaShoppingCart className="text-[25px]" />
              PEDIDOS
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <Button className="w-full !text-left !justify-start !py-2 !px-5 !capitalize !text-[#274a72] hover:!text-[#fff] hover:!bg-[#274a72] !rounded-none flex items-center !gap-2">
            <GiExitDoor className="text-[25px]" />
            CERRAR SESION
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
