import React, { useContext } from "react";
import MyListItems from "./myListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";

const MyList = () => {
  const context = useContext(MyContext);

  return (
    <section className="!py-5 w-full">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[75%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold]  !text-[25px] flex justify-center">
                MI LISTA
              </h2>
              <p className="!mt-2 !mb-2 text-[#556f8d] !text-[20px] font-[600] flex justify-center">
                ESTOS SON
                <span className="font-bold text-[#ec370a]">
                  &nbsp;{context?.myListData?.length}&nbsp;
                </span>
                PRODUCTOS DE MI LISTA
              </p>
            </div>

            {context?.myListData?.length !== 0 &&
              context?.myListData?.map((item, index) => {
                return <MyListItems key={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
