import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className="homeSlider !py-4 ">
      <div className="container">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="sliderHome"
        >
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://www.dismatex.com.ec/web/wp-content/uploads/slider/cache/519de47c7b20e75678b48c3194ab2abc/Copia-de-Portada-fb-4.webp"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://www.dismatex.com.ec/web/wp-content/uploads/slider/cache/62ee8d85a8329590d2f34abcc963162f/Chic-and-Elegant-New-Arrivals-Website-Homepage-Banner.jpg"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhtVg_RxXvaveysHjSsZqgIxXWaK4nuIrDg&s"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://www.dismatex.com.ec/web/wp-content/uploads/slider/cache/519de47c7b20e75678b48c3194ab2abc/Copia-de-Portada-fb-4.webp"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://www.dismatex.com.ec/web/wp-content/uploads/slider/cache/62ee8d85a8329590d2f34abcc963162f/Chic-and-Elegant-New-Arrivals-Website-Homepage-Banner.jpg"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] !overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhtVg_RxXvaveysHjSsZqgIxXWaK4nuIrDg&s"
                alt="Banner slide"
                className="!w-full !left-0 !top-0 !h-[300px]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
