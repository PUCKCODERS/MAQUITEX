import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";

const CategoryPanel = (props) => {
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="!p-3 text-[16px] text-[#082c55] font-[bold] font-bold flex items-center justify-between">
        TODAS LAS CATEGORÍAS{" "}
        <IoClose
          onClick={toggleDrawer(false)}
          className="!w-[15px] !h-[15px] !min-w-[15px] !rounded-full !text-[#fff]  !bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] cursor-pointer"
        />
      </h3>

      <CategoryCollapse />
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
