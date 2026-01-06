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
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import AddProduct from "../../Pages/Products/addProduct";
import AddHomeSlide from "../../Pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "../../Pages/Category/addCategory";
import AddSubCategory from "../../Pages/Category/addSubCategory";
import AddAddress from "../../Pages/Address/addAddress";
import EditCategory from "../../Pages/Category/editCategory";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import EditProduct from "../../Pages/Products/editProduct";
import AddBannerV1 from "../../Pages/Banners/addBannerV1";
import EditBannerV1 from "../../Pages/Banners/editBannerV1";
import AddBlog from "../../Pages/Blog/addBlog";
import EditBlog from "../../Pages/Blog/editBlog";
import AddBannerV2 from "../../Pages/Banners/addBannerV2";
import EditBannerV2 from "../../Pages/Banners/editBannerV2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const history = useNavigate();
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  const logout = () => {
    setAnchorMyAcc(null);

    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
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
      <header
        className={`!w-full !h-[auto] !py-2 ${
          context.isSidebarOpen === true ? "!pl-[20%]" : "!pl-5"
        } shadow-md !pr-7 !bg-[#fff]  flex items-center justify-between transition-all duration-300 fixed !top-0 !left-0 z-[50]`}
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

          {context.isLogin === true ? (
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
                        {context?.userData?.name}
                      </h3>
                      <p className="text-[12px] font-[400] text-[#082c55] opacity-70">
                        {context?.userData?.email}
                      </p>
                    </div>
                  </div>
                </MenuItem>
                <Divider />

                <Link to="/profile">
                  <MenuItem
                    onClick={handleCloseMyAcc}
                    className="flex items-center !text-[#082c55] hover:!text-[#fff] hover:!bg-[#082c55] !gap-3 transition-all !duration-400"
                  >
                    <FaUser className="text-[25px] " />
                    <span className="text-[15px]  font-bold font-[bold] ">
                      PERFIL
                    </span>
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={logout}
                  className="flex items-center !text-[#082c55] hover:!text-[#fff] hover:!bg-[#082c55] !gap-3 transition-all !duration-400"
                >
                  <GiExitDoor className="text-[25px] " />
                  <span className="text-[15px]  font-bold font-[bold] ">
                    CERRAR SESION
                  </span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link
              className="btn-blue btn-sm !rounded-full !text-[14px] !font-bold !px-5 !py-2"
              to="/login"
            >
              INICIAR SESION
            </Link>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() =>
          context?.setIsOpenFullScreenPanel({
            open: false,
          })
        }
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                context?.setIsOpenFullScreenPanel({
                  open: false,
                })
              }
              aria-label="close"
            >
              <IoClose className="!w-[30px] !h-[30px] !min-w-[30px] !ml-3 !rounded-full  !text-[#fff] !absolute !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#fff] hover:!shadow-[0px_0px_0px_3px_#030712]" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-[#fff] !ml-4 font-bold font-[bold] text-[25px]">
                {context?.isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        {context?.isOpenFullScreenPanel?.model === "NUEVO PRODUCTO" && (
          <AddProduct />
        )}
        {context?.isOpenFullScreenPanel?.model === "NUEVO SLIDE DE INICIO" && (
          <AddHomeSlide />
        )}
        {context?.isOpenFullScreenPanel?.model === "NUEVA CATEGORÍA" && (
          <AddCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "NUEVA SUBCATEGORÍA" && (
          <AddSubCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "NUEVA DIRECCIÓN" && (
          <AddAddress />
        )}
        {context?.isOpenFullScreenPanel?.model === "EDITAR CATEGORÍA" && (
          <EditCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "EDITAR PRODUCTO" && (
          <EditProduct />
        )}
        {context?.isOpenFullScreenPanel?.model === "AGREGAR BANNER" && (
          <AddBannerV1 />
        )}
        {context?.isOpenFullScreenPanel?.model === "EDITAR BANNER" && (
          <EditBannerV1 />
        )}
        {context?.isOpenFullScreenPanel?.model === "AGREGAR BANNER PROMO" && (
          <AddBannerV2 />
        )}
        {context?.isOpenFullScreenPanel?.model === "EDITAR BANNER PROMO" && (
          <EditBannerV2 />
        )}
        {context?.isOpenFullScreenPanel?.model === "AGREGAR BLOG" && (
          <AddBlog />
        )}
        {context?.isOpenFullScreenPanel?.model === "EDITAR BLOG" && (
          <EditBlog />
        )}
      </Dialog>
    </>
  );
};

export default Header;
