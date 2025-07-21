import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="w-full h-auto relative overflow-hidden">
      <FaSearch className="absolute top-[12px] left-[10px] z-50 pointer-events-none opacity-50" />
      <input
        type="text"
        className="w-full h-[40px] border !border-gray-400 !bg-gray-600 !p-2 !pl-9 focus:outline-none focus:!border-white rounded-md text-[14px]"
        placeholder="BUSCAR . . . "
      />
    </div>
  );
};

export default SearchBox;
