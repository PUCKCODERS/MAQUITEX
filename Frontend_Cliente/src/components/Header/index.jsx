import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { useContext } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const context = useContext(MyContext);

  return (
    <header className="bg-white">
      <div className="top-strip !py-2 !bg-[#f1f1f1] border-t-[1px] border-b-[1px] border-[#b8b8b8]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 !w-[50%]">
              <p className="!text-[50%] font-bold text-[#082c55]">
                OBTÉN HASTA UN 50 % DE DESCUENTO EN ESTILOS DE LA NUEVA
                TEMPORADA, POR TIEMPO LIMITADO
              </p>
            </div>

            <div className="col2 flex items-center !justify-end">
              <ul className="flex items-center !gap-5 text-[#082c55]">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className=" !text-[60%] font-bold link"
                  >
                    CENTRO DE AYUDA
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className=" !text-[60%] font-bold link"
                  >
                    SEGUIMIENTO DE PEDIDOS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header !py-4 border-b-[1px] border-[#b8b8b8]">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"}>
              <img src="../../../imagenes/logo.jpg" />
            </Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3 w-[30%] flex items-center !pl-7">
            <ul className="flex items-center justify-end gap-3 !w-full">
              <li className="list-none">
                <Link
                  to="/login"
                  className="link transition text-[9px] font-[600] text-[#082c55]"
                >
                  INICIAR
                </Link>{" "}
                |&nbsp;
                <Link
                  to="/register"
                  className="link transition text-[9px] font-[600] text-[#082c55]"
                >
                  REGISTRARSE
                </Link>
              </li>

              <li>
                <Tooltip title="COMPARTIR">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoGitCompareSharp className="text-[#082c55]" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="ME GUSTA">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaHeart className="text-[#082c55]" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="CARRITO">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaShoppingCart className="text-[#082c55]" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
