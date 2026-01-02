import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { IoStatsChart } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { GiSewingMachine } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

const DashboardBoxes = (props) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55] hover:!bg-[#000]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <FaUsers className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px] flex items-center justify-center">
                  TOTAL USUARIOS
                </h3>
                <b className="text-white text-[20px] flex items-center justify-center">
                  {props?.users}
                </b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <FaCartArrowDown className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px] flex items-center justify-center">
                  TOTAL PEDIDOS
                </h3>
                <b className="text-white text-[20px] flex items-center justify-center">
                  {props?.orders}
                </b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <AiFillDatabase className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px] flex items-center justify-center">
                  CATEGORIAS
                </h3>
                <b className="text-white text-[20px] flex items-center justify-center">
                  {props?.category}
                </b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <GiSewingMachine className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px] flex items-center justify-center">
                  PRODUCTOS TOTAL
                </h3>
                <b className="text-white text-[20px] flex items-center justify-center">
                  {props?.products}
                </b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
