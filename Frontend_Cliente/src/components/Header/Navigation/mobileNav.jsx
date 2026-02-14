import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { BsFilePersonFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";
import { NavLink, useLocation } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { FaSlidersH } from "react-icons/fa";
import { MyContext } from "../../../App";

const MobileNav = () => {
  const location = useLocation();

  const context = useContext(MyContext);

  useEffect(() => {
    if (location.pathname === "/products") {
      context?.setIsFilterBtnShow(true);
    } else {
      context?.setIsFilterBtnShow(false);
    }
  }, [location]);

  const openFilters = () => {
    context?.setOpenFilter(true);
  };

  return (
    <div className="mobileNav bg-white !p-1 !px-3 !w-full fixed !bottom-0 !left-0 flex items-center justify-between !gap-0 z-[51] border-t-1 border-[#b1cdee] shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      <NavLink
        to="/"
        exact={true}
        activeClassName="isActive"
        onClick={() => context?.setOpenSearchPanel(false)}
      >
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FcShop size={25} />
          <span className="text-[10px] lg:text-[12px] ">INICIO</span>
        </Button>
      </NavLink>

      {context?.isFilterBtnShow === true && (
        <Button
          className="flex-col !w-[40px] !h-[40px] !min-w-[40px] !capitalize !text-gray-500 !bg-gray-100 !border-1 !border-[#f97316] !rounded-full"
          onClick={openFilters}
        >
          <FaSlidersH size={25} color="#f97316" />
        </Button>
      )}

      <Button
        className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-500"
        onClick={() => context?.setOpenSearchPanel(true)}
      >
        <FcSearch size={25} />
        <span className="text-[10px] lg:text-[12px]">BUSCAR</span>
      </Button>

      <NavLink
        to="/my-list"
        exact={true}
        activeClassName="isActive"
        onClick={() => context?.setOpenSearchPanel(false)}
      >
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-list" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FcLike size={25} />
          <span className="text-[10px] lg:text-[12px]">GUSTA</span>
        </Button>
      </NavLink>

      <NavLink
        to="/my-orders"
        exact={true}
        activeClassName="isActive"
        onClick={() => context?.setOpenSearchPanel(false)}
      >
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-orders" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <GiShoppingCart size={25} color="#0ea5e9" />
          <span className="text-[10px] lg:text-[12px]">PEDIDOS</span>
        </Button>
      </NavLink>

      <NavLink
        to="/my-account"
        exact={true}
        activeClassName="isActive"
        onClick={() => context?.setOpenSearchPanel(false)}
      >
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-account" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <BsFilePersonFill size={25} color="#143253" />
          <span className="text-[10px] lg:text-[12px]">PERFIL</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
