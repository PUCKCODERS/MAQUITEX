import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiSewingMachine } from "react-icons/gi";
import { AiFillDatabase } from "react-icons/ai";
import { TfiLayoutSlider } from "react-icons/tfi";
import { AiFillReconciliation } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { RiSlideshowFill } from "react-icons/ri";
import { GoTriangleDown } from "react-icons/go";
import { Collapse } from "react-collapse";
import { FaClipboardList } from "react-icons/fa";
import { PiSlideshowFill } from "react-icons/pi";
import { ImNewspaper } from "react-icons/im";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else setSubmenuIndex(index);
  };

  const context = useContext(MyContext);
  const logout = () => {
    context?.windowWidth < 992 && context?.setisSidebarOpen(false);
    setSubmenuIndex(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true },
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/login");
      }
    });
  };

  return (
    <>
      <div
        className={`sidebar fixed !top-0 !left-0 z-[52] !bg-[#fff] border-r border-[rgba(0,0,0,0.32)] h-full !py-2 !px-4 !w-[${
          context.isSidebarOpen === true
            ? `${context?.sidebarWidth / 1.5}%`
            : "0px"
        }]`}
      >
        <div
          className="!py-2 !w-full"
          onClick={() => {
            context?.windowWidth < 992 && context?.setisSidebarOpen(false);
            setSubmenuIndex(null);
          }}
        >
          <Link to="/">
            <img src="/imagenes/logo1.png" className="!w-full !h-[60px]" />
          </Link>
        </div>

        <ul className="!mt-4 overflow-y-scroll max-h-[80vh]">
          <li>
            <Link
              to="/"
              onClick={() => {
                context?.windowWidth < 992 && context?.setisSidebarOpen(false);
                setSubmenuIndex(null);
              }}
            >
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
                  <Link
                    to="/homeSlider/list"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA SLIDES
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "NUEVO SLIDE DE INICIO",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR SLIDE
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link
              to="/users"
              onClick={() => {
                context?.windowWidth < 992 && context?.setisSidebarOpen(false);
                setSubmenuIndex(null);
              }}
            >
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
                  <Link
                    to="/products"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA PRODUCTOS
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "NUEVO PRODUCTO",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR PRODUCTO
                  </Button>
                </li>

                <li className="!w-full">
                  <Link
                    to="/product/addRams"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      AÑADIR COLOR DE PRODUCTO
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Link
                    to="/product/addWeight"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      AÑADIR PESO DE PRODUCTO
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Link
                    to="/product/addSize"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      AÑADIR TAMAÑO DE PRODUCTO
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
                  <Link
                    to="/category/list"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA CATEGORIAS
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "NUEVA CATEGORÍA",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR CATEGORIA
                  </Button>
                </li>

                <li className="!w-full">
                  <Link
                    to="/subCategory/List"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA SUBCATEGORIAS
                    </Button>
                  </Link>
                </li>

                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "NUEVA SUBCATEGORÍA",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR SUBCATEGORIA
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={() => {
                context?.windowWidth < 992 && context?.setisSidebarOpen(false);
                setSubmenuIndex(null);
              }}
            >
              <Button className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300">
                <FaClipboardList className="!text-[20px] " />{" "}
                <span>PEDIDOS</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(5)}
            >
              <TfiLayoutSlider className="!text-[20px] " />{" "}
              <span>BANNERS 3ER SUB</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 5 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 5 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Link
                    to="/bannerV1/list"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA DE BANNER
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "AGREGAR BANNER 3ER SUB CATEGORIA ",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR BANNER
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(6)}
            >
              <PiSlideshowFill className="!text-[20px] " />{" "}
              <span>BANNERS SUB</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 6 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 6 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Link
                    to="/bannerV2/list"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA DE BANNER
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "AGREGAR BANNER SUB CATEGORIA",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR BANNER
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={() => isOpenSubMenu(7)}
            >
              <ImNewspaper className="!text-[20px] " /> <span>BLOGS</span>
              <span className="!ml-auto !text-[20px] !w-[30px] !h-[30px] flex items-center justify-center">
                <GoTriangleDown
                  className={`transition-all ${
                    submenuIndex === 7 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 7 ? true : false}>
              <ul className="!w-full">
                <li className="!w-full">
                  <Link
                    to="/blog/list"
                    onClick={() => {
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <Button className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                      LISTA DE BLOGS
                    </Button>
                  </Link>
                </li>
                <li className="!w-full">
                  <Button
                    className="!text-gray-500 !text-[10px] !font-[600] !capitalize !justify-start !w-full !pl-9 flex !gap-3"
                    onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "AGREGAR BLOG",
                      });
                      context?.windowWidth < 992 &&
                        context?.setisSidebarOpen(false);
                      setSubmenuIndex(null);
                    }}
                  >
                    <span className="block w-[5px] h-[5px] rounded-full !bg-gray-600 "></span>
                    AÑADIR BLOG
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              className="w-full !text-[#082c55] hover:!bg-[#082c55] hover:!text-[#fff] !font-[600] !text-[15px] !capitalize !justify-start !gap-3 items-center !py-2 transition-all !duration-300"
              onClick={logout}
            >
              <GiExitDoor className="!text-[20px] " />{" "}
              <span>CERRAR SESION</span>
            </Button>
          </li>
        </ul>
      </div>

      {context?.windowWidth < 920 && context?.isSidebarOpen === true && (
        <div
          className="sidebarOverlay pointer-events-auto sm:pointer-events-none block lg:hidden w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-51"
          onClick={() => {
            context?.setisSidebarOpen(false);
            setSubmenuIndex(null);
          }}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
