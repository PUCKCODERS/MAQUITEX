import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoStatsChart } from "react-icons/io5";
import { FaCashRegister } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GiSewingMachine } from "react-icons/gi";

const DashboardBoxes = () => {
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
              <HiClipboardDocumentList className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px]">NUEVOS PEDIDOS</h3>
                <b>1,369</b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <FaCashRegister className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px]">VENTAS</h3>
                <b>$ 699,99</b>
              </div>
              <IoStatsChart className="text-[50px] text-[#fff]" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!mt-1">
          <div className="transition-transform duration-300 hover:-translate-y-1 box !p-0 w-full rounded-md border border-[#082c55]">
            <div className="box !bg-[#082c55] !text-[#fff] hover:!bg-[#000] !p-5 !cursor-pointer rounded-md border-2 border-white flex items-center !gap-4">
              <GiMoneyStack className="text-[40px]" />
              <div className="info w-[70%]">
                <h3 className="text-[10px]">GANANCIAS</h3>
                <b>$ 369</b>
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
                <h3 className="text-[9px]">PRODUCTOS TOTALES</h3>
                <b>10.000</b>
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
