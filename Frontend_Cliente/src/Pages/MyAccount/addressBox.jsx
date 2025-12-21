import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { BiDotsVertical } from "react-icons/bi";
import { MyContext } from "../../App";

const ITEM_HEIGHT = 48;

const AddressBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeAddress = (id) => {
    setAnchorEl(null);
    props.removeAddress(id);
  };

  const editAddress = (id) => {
    setAnchorEl(null);
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
    //context.editAddress(id);
  };

  return (
    <div className="group !relative addressBox w-full justify-center  border-1 border-[#bdbdbd] bg-[#f1f1f1] !p-4 rounded-md cursor-pointer shadow-[3px_3px_3px_#000]">
      <span className="inline-block !p-2 !bg-[#082c55] !text-white !font-[700]  !text-[12px] !rounded-sm">
        {props?.address?.addressType}
      </span>

      <h4 className="!pt-2 flex items-center !gap-4 !text-[14px]">
        <span>{context?.userData?.name}</span>
        <span>+{props?.address?.mobile}</span>
      </h4>

      <span className="text-[12px] !font-[600] block !pt-0 ">
        {props?.address?.address_line1 +
          ", " +
          props?.address?.city +
          ", " +
          props?.address?.country +
          ", " +
          props?.address?.state +
          ", " +
          props?.address?.pincode}
      </span>

      <div className="absolute !top-[20px] !right-[20px]">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <BiDotsVertical />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "15ch",
              },
            },
            list: {
              "aria-labelledby": "long-button",
            },
          }}
        >
          <MenuItem
            className="!text-[#082c55] !bg-[#fff] hover:!text-white hover:!bg-[#082c55] !font-bold"
            onClick={() => editAddress(props?.address?._id)}
          >
            EDITAR
          </MenuItem>
          <MenuItem
            className="!text-[#082c55] !bg-[#fff] hover:!text-white hover:!bg-[#082c55] !font-bold"
            onClick={() => removeAddress(props?.address?._id)}
          >
            ELIMINAR
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AddressBox;
