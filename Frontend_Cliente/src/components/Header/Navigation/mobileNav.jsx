import { Button } from "@mui/material";
import React from "react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsFilePersonFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { NavLink, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="mobileNav bg-white !p-1 !px-3 w-full grid grid-cols-5 fixed !bottom-0 !left-0 place-items-center !gap-5 z-[51]">
      <NavLink to="/" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <SiHomeassistantcommunitystore size={18} />
          <span className="text-[12px] ">INICIO</span>
        </Button>
      </NavLink>

      <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
        <ImSearch size={18} />
        <span className="text-[12px]">BUSCAR</span>
      </Button>

      <NavLink to="/my-list" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-list" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FaHeart size={18} />
          <span className="text-[12px]">GUSTA</span>
        </Button>
      </NavLink>

      <NavLink to="/my-orders" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-orders" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <FaShoppingCart size={18} />
          <span className="text-[12px]">PEDIDOS</span>
        </Button>
      </NavLink>

      <NavLink to="/my-account" exact={true} activeClassName="isActive">
        <Button
          className={`flex-col !w-[40px] !min-w-[40px] !capitalize ${location.pathname === "/my-account" ? "!text-[#143253]" : "!text-gray-500"}`}
        >
          <BsFilePersonFill size={18} />
          <span className="text-[12px]">PERFIL</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
