import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";
import { Button } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";

const CategoryPanel = (props) => {
  const context = useContext(MyContext);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" className="categoryPanel">
      <div className="!p-0 relative">
        <img src="../../../imagenes/logo.jpg" className="w-full h-[75px]" />
        <IoClose
          onClick={toggleDrawer(false)}
          className="absolute top-[9px] right-[9px] !w-[20px] !h-[20px] !min-w-[20px] !rounded-full !text-[#fff]  !bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] cursor-pointer"
        />
      </div>

      <h3 className="!p-3 text-[16px] text-[#082c55] font-[bold] font-bold flex items-center justify-between ">
        TODAS LAS CATEGORÍAS{" "}
      </h3>

      {props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />}

      {context?.windowWidth < 992 && (
        <Link
          to="/login"
          className="!p-3 block"
          onClick={() => {
            props.setIsOpenCatPanel(false);
            props.propsSetIsOpenCatPanel(false);
          }}
        >
          <Button className="btn-org w-full ">INICIAR SESSION</Button>
        </Link>
      )}
    </Box>
  );

  return (
    <>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
