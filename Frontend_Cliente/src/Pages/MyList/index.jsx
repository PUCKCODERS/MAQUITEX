import React from "react";
import Button from "@mui/material/Button";
import { FaCashRegister } from "react-icons/fa6";
import MyListItems from "./myListItems";
import AccountSidebar from "../../components/AccountSidebar";

const MyList = () => {
  return (
    <section className="!py-5 w-full">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[75%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold] font-bold text-[20px]">TU LISTA</h2>
              <p className="!mt-2 !mb-2 text-[#000] font-[600]">
                ESTOS SON <span className="font-bold text-[#ec370a]"> 2 </span>
                PRODUCTOS DE TU LISTA
              </p>
            </div>
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
