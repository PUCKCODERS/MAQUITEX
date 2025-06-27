import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { ImMenu } from "react-icons/im";
import { ImMenu2 } from "react-icons/im";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { MyContext } from "../../App";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
    background: "black",
    color: "white",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  return (
    <header
      className={`!w-full !h-[auto] !py-2 ${
        context.isSidebarOpen === true ? "!pl-80" : "!pl-5"
      } shadow-md !pr-7 !bg-[#fff]  flex items-center justify-between transition-all duration-300`}
    >
      <div className="part1">
        <Button
          className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] text-[#082c55]"
          onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)}
        >
          {context.isSidebarOpen === true ? (
            <ImMenu className="text-[18px] text-[#082c55]" />
          ) : (
            <ImMenu2 className="!text-[25px] text-[#082c55] scale-x-[-1] " />
          )}
        </Button>
      </div>

      <div className="part2 w-[40%] flex items-center justify-end !gap-5">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaBell className="!text-gray-600" />
          </StyledBadge>
        </IconButton>

        <div className="relative">
          <div
            className="!rounded-full !w-[35px] !h-[35px] overflow-hidden cursor-pointer"
            onClick={handleClickMyAcc}
          >
            <img
              src="../../../imagenes/user.jpg"
              className="!w-full !h-full object-cover "
            />
          </div>

          <Menu
            anchorEl={anchorMyAcc}
            id="account-menu"
            open={openMyAcc}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleCloseMyAcc} className="!bg-[#fff]">
              <div className="flex items-center !gap-3">
                <div className="!rounded-full !w-[35px] !h-[35px] overflow-hidden cursor-pointer border border-[#082c55]">
                  <img
                    src="../../../imagenes/user.jpg"
                    className="!w-full !h-full object-cover "
                  />
                </div>

                <div className="info">
                  <h3 className="text-[15px] font-bold font-[bold] leading-5 text-[#082c55]">
                    JONATHAN RODRIGUEZ
                  </h3>
                  <p className="text-[12px] font-[400] text-[#082c55] opacity-70">
                    jlc.rodriguez@gmail.com.ec
                  </p>
                </div>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={handleCloseMyAcc}
              className="flex items-center !text-[#082c55] hover:!text-[#fff] hover:!bg-[#082c55] !gap-3 transition-all !duration-400"
            >
              <FaUser className="text-[25px] " />
              <span className="text-[15px]  font-bold font-[bold] ">
                PERFIL
              </span>
            </MenuItem>

            <MenuItem
              onClick={handleCloseMyAcc}
              className="flex items-center !text-[#082c55] hover:!text-[#fff] hover:!bg-[#082c55] !gap-3 transition-all !duration-400"
            >
              <GiExitDoor className="text-[25px] " />
              <span className="text-[15px]  font-bold font-[bold] ">
                CERRAR SESION
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
