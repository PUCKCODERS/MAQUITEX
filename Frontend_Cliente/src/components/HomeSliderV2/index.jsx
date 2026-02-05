import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const HomeBannerV2 = (props) => {
  const context = useContext(MyContext);
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={context?.windowWidth < 992 ? false : true}
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
                  className="!left-0 !top-0 w-full h-[200px] lg:h-[400px] "
                />
                <div className="info absolute !top-0 -right-[100%] opacity-0 !w-[50%] !h-[100%] !z-50 !p-8 flex items-center flex-col justify-center transition-all duration-700">
                  <h4 className="text-[#000] text-[10px] lg:text-[20px] font-[bold] !w-full !text-left !mb-3 relative -right-[100%] opacity-0 hidden lg:block">
                    {item?.bannerTitlename}
                  </h4>
                  {context?.windowWidth < 992 && (
                    <h2 className="!text-gray-500 !text-[12px] sm:!text-[15px] md:!text-[20px]  lg:!text-[30px] font-[bold] !w-full relative -right-[100%] opacity-0">
                      {item?.name?.length > 40
                        ? item?.name?.substr(0, 40)
                        : item?.name}
                    </h2>
                  )}
                  {context?.windowWidth > 992 && (
                    <h2 className="!text-gray-500 !text-[12px] sm:!text-[15px] md:!text-[20px] lg:!text-[30px] font-[bold] !w-full relative -right-[100%] opacity-0">
                      {item?.name?.length > 70
                        ? item?.name?.substr(0, 70)
                        : item?.name}
                    </h2>
                  )}

                  <h3 className="text-gray-700 flex items-center !text-[10px] sm:!text-[12px] md:!text-[15px] lg:!text-[18px] font-[bold] !w-full !text-left !mt-3 !mb-2 lg:!mb-3 !gap-0 lg:!gap-3 relative -right-[100%] opacity-0 flex-col lg:flex-row">
                    <span className="block lg:inline !mt-0 lg:!mt-1  w-full lg:w-max">
                      A TAN DE SOLO
                    </span>
                    <span className="text-red-700 !text-[12px] sm:!text-[15px] md:!text-[20px] lg:!text-[30px] font-[700] block lg:inline w-full lg:w-max">
                      {item?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </h3>

                  <div className="w-full relative -bottom-[100%] opacity-0 btn_">
                    <Button className="btn-org !shadow-[1px_1px_1px_#000] lg:!shadow-[3px_3px_3px_#000] border !border-[transparent] !text-[8px] !w-[110px]  !h-[30px] lg:!text-[20px] lg:!w-[200px]  lg:!h-[50px] ">
                      <Link to={`/product/${item?._id}`}>VER PRODUCTO</Link>
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
