import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
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
import { FaClipboardList } from "react-icons/fa";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else setSubmenuIndex(index);
  };

  const context = useContext(MyContext);

  return (
    <>
      <div
        className={`sidebar fixed !top-0 !left-0 !bg-[#fff] border-r border-[rgba(0,0,0,0.32)]  h-full !py-2 !px-4 !w-[${
          context.isSidebarOpen === true ? "20%" : "0px"
        }]`}
      >
        <div className="!py-2 !w-full">
          <Link to="/">
            <img
              src="../../../imagenes/logo.jpg"
              className="!w-full !h-[80px]"
            />
          </Link>
        </div>

        <ul className="!mt-4 ">
          <li>
            <Link to="/">
              <Button className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300 ">
                <AiFillAppstore className="!text-[20px] " />
                <span>PANEL</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link>
              <Button
                className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
                onClick={() => isOpenSubMenu(1)}
              >
                <RiSlideshowFill className="!text-[20px] " />
                <span>SLIDES DE INICIO</span>
                <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                  <GoTriangleDown
                    className={`transition-all ${
                      submenuIndex === 1 ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </Button>
            </Link>

            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() =>
                      context.setIsOpentFullScreenPanel({
                        open: true,
                        model: "NUEVO SLIDE DE INICIO",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR SLIDE
                  </Button>
                </li>
                <li className="!w-full">
                  <Link to="/homeSlider/list">
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA SLIDES
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
              <Button className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
                <FaUsers className="!text-[20px]" /> <span>USUARIOS</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(2)}
            >
              <GiSewingMachine className="!text-[20px] " />{" "}
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
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() =>
                      context.setIsOpentFullScreenPanel({
                        open: true,
                        model: "NUEVO PRODUCTO",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR PRODUCTO
                  </Button>
                </li>
                <li className="!w-full">
                  <Link to="/products">
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA PRODUCTOS
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(3)}
            >
              <AiFillDatabase className="!text-[20px] " />{" "}
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
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() =>
                      context.setIsOpentFullScreenPanel({
                        open: true,
                        model: "NUEVA CATEGORÍA",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR CATEGORIA
                  </Button>
                </li>
                <li className="!w-full">
                  <Link to="/category/list">
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA CATEGORIAS
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() =>
                      context.setIsOpentFullScreenPanel({
                        open: true,
                        model: "NUEVA SUBCATEGORÍA",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR SUBCATEGORIA
                  </Button>
                </li>
                <li className="!w-full">
                  <Link to="/subCategory/List">
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA SUBCATEGORIAS
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
                <FaClipboardList className="!text-[20px] " />{" "}
                <span>PEDIDOS</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
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
