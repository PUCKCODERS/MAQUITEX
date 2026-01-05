import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);

  const history = useNavigate();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);

    const obj = {
      page: 1,
      limit: 3,
      query: e.target.value,
    };

    if (e.target.value !== "") {
      postData(`/api/product/search/get`, obj).then((res) => {
        context?.setSearchData(res);
      });
    }
  };

  const search = () => {
    history("/search");
  };

  return (
    <div className="searchBox !w-[100%] !h-[50px] bg-[#e5e5e5] !rounded-[5px] shadow-[5px_5px_3px_#274a72] !relative !p-2">
      <input
        type="text"
        placeholder="BUSCAR PRODUCTO . . . . "
        className="!w-full !h-[35px] focus:outline-none !bg-inherit !p-2 !text-[15px] !text-[#082c55] !font-[500]"
        value={searchQuery}
        onChange={onChangeInput}
      />
      <Button
        className="!absolute !top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
        onClick={search}
      >
        <FcSearch className="!text-[#082c55] !text-[25px]" />
      </Button>
    </div>
  );
};

export default Search;
