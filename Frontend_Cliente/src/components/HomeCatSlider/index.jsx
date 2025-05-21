import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://png.pngtree.com/png-clipart/20241001/original/pngtree-vintage-sewing-machines-a-journey-through-time-png-image_16154405.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://png.pngtree.com/png-clipart/20241001/original/pngtree-vintage-sewing-machines-a-journey-through-time-png-image_16154405.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://png.pngtree.com/png-clipart/20241001/original/pngtree-vintage-sewing-machines-a-journey-through-time-png-image_16154405.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://png.pngtree.com/png-clipart/20241001/original/pngtree-vintage-sewing-machines-a-journey-through-time-png-image_16154405.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://latinamerica.brother.com/-/media/brother/product-catalog-media/images/2022/01/05/07/05/bm2800_2.png"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item !py-1 !px-3 bg-white !text-[#556f8d] shadow-[5px_4px_7px_#556f8d] !border-1 !border-[#b1cdee] rounded-lg text-center flex items-center justify-center flex-col">
                <img
                  src="https://marcimex.vtexassets.com/arquivos/ids/217717/48946.png?v=638741894549100000"
                  className="!w-[200px] transition-all !duration-500"
                />
                <h3 className="text-[13px] font-bold font-[bold] !mt-3 !mb-3">
                  PLANCHADO
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
