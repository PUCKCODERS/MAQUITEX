import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../BannerBoxV2";

const AdsBannerSliderV2 = (props) => {
  return (
    <div className="!py-5 w-full ">
      <Swiper
        loop={true}
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" !mb-4 !mr-1 !ml-1 !overflow-hidden  shadow-[3px_3px_3px_#274a72] !bg-gray-100"
            >
              <BannerBoxV2
                info={item?.alignInfo}
                item={item}
                image={item?.images[0]}
                liink={"/"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AdsBannerSliderV2;
