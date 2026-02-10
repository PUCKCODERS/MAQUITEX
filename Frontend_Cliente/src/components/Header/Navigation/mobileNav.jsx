import { Button } from "@mui/material";
import React from "react";
import { BsFilePersonFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";
import { NavLink, useLocation } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { FcFilledFilter } from "react-icons/fc";

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="mobileNav bg-white !p-1 !px-3 !w-full fixed !bottom-0 !left-0 flex items-center justify-between !gap-0 z-[51] border-t-1">
      <NavLink to="/" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FcShop size={25} />
          <span className="text-[10px] lg:text-[12px] ">INICIO</span>
        </Button>
      </NavLink>

      <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-500">
        <FcFilledFilter size={25} />
        <span className="text-[10px] lg:text-[12px]">FILTROS</span>
      </Button>

      <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-500">
        <FcSearch size={25} />
        <span className="text-[10px] lg:text-[12px]">BUSCAR</span>
      </Button>

      <NavLink to="/my-list" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-list" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FcLike size={25} />
          <span className="text-[10px] lg:text-[12px]">GUSTA</span>
        </Button>
      </NavLink>

      <NavLink to="/my-orders" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-orders" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <GiShoppingCart size={25} color="#111827" />
          <span className="text-[10px] lg:text-[12px]">PEDIDOS</span>
        </Button>
      </NavLink>

      <NavLink to="/my-account" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-account" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <BsFilePersonFill size={25} color="#16a34a" />
          <span className="text-[10px] lg:text-[12px]">PERFIL</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
