import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { FcSearch } from "react-icons/fc";

const Search = () => {
  return (
    <div className="searchBox !w-[100%] !h-[50px] bg-[#e5e5e5] !rounded-[5px] shadow-[5px_5px_3px_#274a72] !relative !p-2">
      <input
        type="text"
        placeholder="BUSCAR PRODUCTO . . . . "
        className="!w-full !h-[35px] focus:outline-none !bg-inherit !p-2 !text-[15px] !text-[#082c55] !font-[500]"
      />
      <Button className="!absolute !top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black">
        <FcSearch className="!text-[#082c55] !text-[25px]" />
      </Button>
    </div>
  );
};

export default Search;
