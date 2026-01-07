import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const HomeBannerV2 = (props) => {
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
      className="homeSliderV2 !shadow-[3px_6px_9px_#082c55] rounded-md "
    >
      {props?.data?.map((item, index) => {
        if (item?.isDisplayOnHomeBanner === true) {
          return (
            <SwiperSlide key={index}>
              <div className="item w-full overflow-hidden ">
                <img
                  src={item?.bannerimages[0]}
                  className="!left-0 !top-0 !w-full !h-[400px] "
                />
                <div className="info absolute !top-0 -right-[100%] opacity-0 !w-[50%] !h-[100%] !z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
                  <h4 className="text-[#000] text-[20px] font-[bold] !w-full !text-left !mb-3 relative -right-[100%] opacity-0">
                    {item?.bannerTitlename}
                  </h4>
                  <h2 className="!text-[#082c55] text-[30px] font-[bold] !w-full relative -right-[100%] opacity-0">
                    {item?.name?.substr(0, 40)}
                  </h2>

                  <h3 className="text-[#000] flex items-center text-[18px] font-[bold] !w-full !text-left !mt-3 !mb-3 !gap-3 relative -right-[100%] opacity-0">
                    A TAN DE SOLO{" "}
                    <span className="text-[#082c55] text-[30px] font-[700]">
                      &#36; {item?.price}
                    </span>
                  </h3>

                  <div className="w-full relative -bottom-[100%] opacity-0 btn_">
                    <Button className="btn-org !shadow-[4px_4px_2px_#000] border !border-[transparent]">
                      <Link to={`/product/${item?._id}`}>COMPRAR AHORA</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default HomeBannerV2;
