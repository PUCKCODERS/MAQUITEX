import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Link } from "react-router-dom";
import { Navigation, FreeMode } from "swiper/modules";
import { useContext } from "react";
import { MyContext } from "../../App";

const HomeCatSlider = (props) => {
  const context = useContext(MyContext);

  return (
    <div className="homeCatSlider !pt-3 lg:!pt-4 !py-3 lg:!py-8 ">
      <div className="container">
        <Swiper
          loop={true}
          slidesPerView={8}
          spaceBetween={10}
          navigation={context?.windowWidth < 992 ? false : true}
          modules={[Navigation, FreeMode]}
          freeMode={true}
          breakpoints={{
            300: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            550: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1100: {
              slidesPerView: 8,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {props?.data?.map((cat, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/productListing?catId=${cat?._id}`}>
                  <div className="item !py-3 !px-3 bg-white !text-[#556f8d] shadow-[3px_3px_3px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                    <img
                      src={cat?.images[0]}
                      className="!w-full !left-0 !top-0 h-[50px] sm:h-[80px] lg:h-[94px] transition-all !duration-500"
                    />
                    <h3 className="text-[9px] lg:text-[13px] font-bold font-[bold] !mt-3 !mb-0 lg:!mt-3 lg:!mb-0">
                      {cat?.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

          <SwiperSlide>
            <Link to="/s.tecnico">
              <div className="item !py-3 !px-3 bg-white !text-[#556f8d] shadow-[3px_3px_3px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 h-[50px] sm:h-[80px] lg:h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[9px] lg:text-[13px] font-bold font-[bold] !mt-3 !mb-0 lg:!mt-3 lg:!mb-0">
                  S.TECNICO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/nosotros">
              <div className="item !py-3 !px-3 bg-white !text-[#556f8d] shadow-[3px_3px_3px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 h-[50px] sm:h-[80px] lg:h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[9px] lg:text-[13px] font-bold font-[bold] !mt-3 !mb-0 lg:!mt-3 lg:!mb-0">
                  NOSOTROS
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/contacto">
              <div className="item !py-3 !px-3 bg-white !text-[#556f8d] shadow-[3px_3px_3px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-full !left-0 !top-0 h-[50px] sm:h-[80px] lg:h-[94px] transition-all !duration-500"
                />
                <h3 className="text-[9px] lg:text-[13px] font-bold font-[bold] !mt-3 !mb-0 lg:!mt-3 lg:!mb-0">
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
