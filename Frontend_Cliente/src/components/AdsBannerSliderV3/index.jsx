import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV3 from "../bannerBoxV3";

const AdsBannerSliderV3 = (props) => {
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
              className="!rounded-md !mb-4  !overflow-hidden   !bg-gray-100"
            >
              <BannerBoxV3
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

export default AdsBannerSliderV3;
