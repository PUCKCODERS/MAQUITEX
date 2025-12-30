import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props.setSearchQuery(e.target.value);
    if (searchInput.current.value === "") {
      props.setPageOrder(1);
    }
  };

  return (
    <div className="w-full h-auto relative overflow-hidden">
      <FaSearch className="absolute top-[12px] left-[10px] z-50 pointer-events-none opacity-50 !text-white" />
      <input
        type="text"
        className="w-full h-[40px] !text-white border !border-gray-400 !bg-gray-600 !p-2 !pl-9 focus:outline-none focus:!border-white rounded-md text-[14px]"
        placeholder="BUSCAR . . . "
        value={searchQuery}
        ref={searchInput}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default SearchBox;
