import React, { useContext } from "react";
import MyListItems from "./myListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../App";
import { Button } from "@mui/material";

const MyList = () => {
  const context = useContext(MyContext);

  return (
    <section className="!py-3 lg:!py-5 w-full">
      <div className="container flex flex-col md:flex-row !gap-5">
        <div className="col1 w-full md:w-[25%] lg:w-[25%] hidden lg:block">
          <AccountSidebar />
        </div>

        <div className="col2 w-full sm:w-[100%] md:w-[100%] lg:w-[75%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold]  !text-[15px] sm:!text-[18px] md:!text-[20px] lg:!text-[25px] flex justify-center">
                MI LISTA
              </h2>
              <p className="!mt-2 !mb-2 text-[#556f8d] !text-[11px] sm:!text-[13px] md:!text-[15px] lg:!text-[20px] font-[600] flex justify-center">
                ESTOS SON
                <span className="font-bold text-[#ec370a]">
                  &nbsp;{context?.myListData?.length}&nbsp;
                </span>
                PRODUCTOS DE MI LISTA
              </p>
            </div>

            {context?.myListData?.length !== 0 ? (
              context?.myListData?.map((item, index) => {
                return <MyListItems key={index} item={item} />;
              })
            ) : (
              <div className="flex items-center justify-center flex-col !pt-[30px] !gap-1">
                <p className="!text-[#38597e] !text-[9px] !font-[600] !mb-1 !mt-4 !max-w-xs !p-0">
                  AÚN NO HAS GUARDADO NINGÚN FAVORITO, AGREGA PRODUCTOS QUE TE
                  ENCANTEN PARA GUARDARLOS AQUÍ Y VERLOS CUANDO QUIERAS
                </p>

                <img
                  src="../../../imagenes/wish-list.png"
                  className="w-[200px] !mb-2 !mt-2"
                />
                <Button className="btn-org btn-sm">
                  <a href="/">CONTINUAR EXPLORANDO</a>
                </Button>

                <div className="!mt-6 !mb-6 text-sm ">
                  <a
                    href="/favoritos"
                    className="text-blue-600 hover:text-blue-800 !mx-2"
                  >
                    IR A MIS FAVORITOS
                  </a>
                  <span className="text-gray-400">|</span>
                  <a
                    href="/vistos-recientemente"
                    className="text-blue-600 hover:text-blue-800 !mx-1"
                  >
                    COMPARTIDOS
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
