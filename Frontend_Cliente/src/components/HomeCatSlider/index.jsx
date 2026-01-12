import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

const HomeCatSlider = (props) => {
  return (
    <div className="homeCatSlider !pt-4 !py-8 ">
      <div className="container">
        <Swiper
          loop={true}
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {props?.data?.map((cat, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to="/">
                  <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                    <img
                      src={cat?.images[0]}
                      className="!w-full !left-0 !top-0 !h-[94px] transition-all !duration-500"
                    />
                    <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                      {cat?.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

          <SwiperSlide>
            <Link to="/s.tecnico">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 !h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  S.TECNICO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/nosotros">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 !h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  NOSOTROS
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/contacto">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 !h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  CONTACTO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
