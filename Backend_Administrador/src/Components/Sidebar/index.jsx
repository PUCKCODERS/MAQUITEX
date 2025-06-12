import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillReconciliation } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { RiSlideshowFill } from "react-icons/ri";
import { GoTriangleDown } from "react-icons/go";
import { Collapse } from "react-collapse";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else setSubmenuIndex(index);
  };

  return (
    <>
      <div className="sidebar fixed !top-0 !left-0 !bg-[#fff] border-r border-[rgba(0,0,0,0.32)] w-[18%] h-full !py-2 !px-4">
        <div className="!py-2 !w-full">
          <Link to="/">
            <img
              src="../../../imagenes/logo.jpg"
              className="!w-full !h-[80px]"
            />
          </Link>
        </div>

        <ul className="!mt-4 ">
          <li className="">
            <Button className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
              <AiFillAppstore className="!text-[20px] " />
              <span>PANEL</span>
            </Button>
          </li>
          <li>
            <Button
              className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(1)}
            >
              <RiSlideshowFill className="!text-[20px] " />{" "}
              <span>ESTADISTICAS</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR BANNER
                  </Button>
                </li>
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    LISTA BANNERS
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
              <FaUsers className="!text-[20px]" /> <span>USUARIOS</span>
            </Button>
          </li>
          <li>
            <Button
              className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(2)}
            >
              <RiSlideshowFill className="!text-[20px] " />{" "}
              <span>PRODUCTOS</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 2 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 2 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR PRODUCTO
                  </Button>
                </li>
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    LISTA PRODUCTOS
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(3)}
            >
              <RiSlideshowFill className="!text-[20px] " />{" "}
              <span>CATEGORIAS</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR CATEGORIA
                  </Button>
                </li>
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    LISTA CATEGORIAS
                  </Button>
                </li>
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR SUBCATEGORIA
                  </Button>
                </li>
                <li className="!w-full">
                  <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    LISTA SUBCATEGORIAS
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
              <AiFillReconciliation className="!text-[20px] " />{" "}
              <span>PEDIDOS</span>
            </Button>
          </li>

          <li>
            <Button className="w-full !text-[#000] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
              <GiExitDoor className="!text-[20px] " />{" "}
              <span>CERRAR SESION</span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

{
  /*import { AiFillReconciliation } from "react-icons/ai"; pedidos */
}
