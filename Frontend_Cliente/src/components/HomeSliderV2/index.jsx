import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";

const HomeBannerV2 = () => {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="homeSliderV2 !shadow-lg"
    >
      <SwiperSlide>
        <div className="item w-full  rounded-md overflow-hidden">
          <img
            src="https://topesdegama.com/app/uploads-topesdegama.com/2022/08/maquina-coser-portada.jpg"
            className="!left-0 !top-0 !w-full !h-[400px] !rounded-md"
          />
          <div className="info absolute !top-0 -right-[100%] opacity-0 !w-[50%] !h-[100%] !z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
            <h4 className="text-[#000] text-[20px] font-[700] !w-full !text-left !mb-3 relative -right-[100%] opacity-0">
              VENTA DE DÍAS DE GRANDES AHORROS
            </h4>
            <h2 className="!text-[#082c55] text-[34px] font-[700] !w-full relative -right-[100%] opacity-0">
              MAQUINA SINGER COLOR SILVER
            </h2>

            <h3 className="text-[#000] flex items-center text-[18px] font-[600] !w-full !text-left !mt-3 !mb-3 !gap-3 relative -right-[100%] opacity-0">
              A PARTIR DE SOLO{" "}
              <span className="text-[#082c55] text-[30px] font-[700]">
                $69.99
              </span>
            </h3>

            <div className="w-full relative -bottom-[100%] opacity-0 btn_">
              <Button className="btn-org !shadow-[4px_4px_2px_#000] border !border-[transparent]">
                COMPRAR AHORA
              </Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img
            src="https://www.artefacta.com/media/amasty/blog/cache/P/o/1280/400/Portada2095907956.jpg"
            className="!left-0 !top-0 !w-full !h-[400px] !rounded-md"
          />
          <div className="info absolute !top-0 -right-[100%] opacity-0 !w-[50%] !h-[100%] !z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
            <h4 className="text-[#000] text-[20px] font-[700] !w-full !text-left !mb-3 relative -right-[100%] opacity-0">
              VENTA DE DÍAS DE GRANDES AHORROS
            </h4>
            <h2 className="!text-[#082c55] text-[34px] font-[700] !w-full relative -right-[100%] opacity-0">
              MAQUINA SINGER COLOR SILVER
            </h2>

            <h3 className="text-[#000] flex items-center text-[18px] font-[600] !w-full !text-left !mt-3 !mb-3 !gap-3 relative -right-[100%] opacity-0">
              A PARTIR DE SOLO{" "}
              <span className="text-[#082c55] text-[30px] font-[700]">
                $69.99
              </span>
            </h3>

            <div className="w-full relative -bottom-[100%] opacity-0 btn_">
              <Button className="btn-org !shadow-[4px_4px_2px_#000] border !border-[transparent]">
                COMPRAR AHORA
              </Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBannerV2;
