import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../bannerBoxV2";

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
        <SwiperSlide className="!rounded-md !mb-4 !mr-2 !overflow-hidden  shadow-[3px_3px_3px_#274a72] !bg-gray-100">
          <BannerBoxV2
            info="right"
            image={
              "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide className="!rounded-md !mb-4 !mr-2 !overflow-hidden  shadow-[3px_3px_3px_#274a72] !bg-gray-100">
          <BannerBoxV2
            info="right"
            image={
              "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide className="!rounded-md !mb-4 !mr-2 !overflow-hidden  shadow-[3px_3px_3px_#274a72] !bg-gray-100">
          <BannerBoxV2
            info="right"
            image={
              "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide className="!rounded-md !mb-4 !mr-2 !overflow-hidden shadow-[3px_3px_3px_#274a72] !bg-gray-100">
          <BannerBoxV2
            info="right"
            image={
              "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSliderV2;
