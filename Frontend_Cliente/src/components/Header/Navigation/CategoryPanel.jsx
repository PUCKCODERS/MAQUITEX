import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";
import { Button, MenuItem } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../../../App";
import { Link, useNavigate } from "react-router-dom";

import { fetchDataFromApi } from "../../../utils/api";

const CategoryPanel = (props) => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen);
  };

  const logout = () => {
    props.setIsOpenCatPanel(false);
    props.propsSetIsOpenCatPanel(false);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true },
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.setUserData(null);
        context?.setCartData([]);
        context?.setMyListData([]);
        navigate("/");
      }
    });
  };

  const DrawerList = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      className="categoryPanel h-full !bg-white/10 backdrop-blur-sm"
    >
      <div className="!p-0 relative">
        <img src="../../../imagenes/logo.jpg" className="w-full h-[75px]" />
        <IoClose
          onClick={toggleDrawer(false)}
          className="absolute top-[9px] right-[9px] !w-[20px] !h-[20px] !min-w-[20px] !rounded-full !text-[#fff]  !bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] cursor-pointer"
        />
      </div>

      <h3 className="!p-3 text-[16px] text-[#fff] font-[bold] font-bold flex items-center justify-between ">
        TODAS LAS CATEGORÍAS{" "}
      </h3>

      {props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />}

      {context?.windowWidth < 992 &&
        (context.isLogin === false ? (
          <Link
            to="/login"
            className="!p-3 block"
            onClick={() => {
              props.setIsOpenCatPanel(false);
              props.propsSetIsOpenCatPanel(false);
            }}
          >
            <Button className="btn-org btn-lg w-full">INICIAR SESSION</Button>
          </Link>
        ) : (
          <MenuItem onClick={logout} className="!p-3 block">
            <Button className=" btn-org btn-lg w-full !bg-[#082c55] hover:!bg-[#1d4572]">
              CERRAR SESIÓN
            </Button>
          </MenuItem>
        ))}
    </Box>
  );

  return (
    <>
      <Drawer
        open={props.isOpenCatPanel}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
