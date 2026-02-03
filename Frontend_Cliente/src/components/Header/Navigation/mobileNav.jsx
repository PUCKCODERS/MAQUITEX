import { Button } from "@mui/material";
import React from "react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsFilePersonFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="mobileNav bg-white !p-1 !px-3 w-full grid grid-cols-5 fixed !bottom-0 !left-0 place-items-center !gap-5">
      <NavLink to="/" exact={true} activeClassName="isActive">
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <SiHomeassistantcommunitystore size={18} />
          <span className="text-[12px] ">INICIO</span>
        </Button>
      </NavLink>

      <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
        <ImSearch size={18} />
        <span className="text-[12px]">BUSCAR</span>
      </Button>

      <NavLink to="/my-list" exact={true} activeClassName="isActive">
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <FaHeart size={18} />
          <span className="text-[12px]">GUSTA</span>
        </Button>
      </NavLink>

      <NavLink to="/my-orders" exact={true} activeClassName="isActive">
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <FaShoppingCart size={18} />
          <span className="text-[12px]">PEDIDOS</span>
        </Button>
      </NavLink>

      <NavLink to="/my-account" exact={true} activeClassName="isActive">
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <BsFilePersonFill size={18} />
          <span className="text-[12px]">PERFIL</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default MobileNav;
