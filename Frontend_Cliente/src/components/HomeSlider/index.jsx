import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { useContext } from "react";
import { MyContext } from "../../App";

const HomeSlider = (props) => {
  const context = useContext(MyContext);

  return (
    <div className="homeSlider !pb-0 !pt-3 lg:!pt-4 lg:!pb-2  relative z-[99]">
      <div className="container">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={context?.windowWidth < 992 ? false : true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="sliderHome"
        >
          {props?.data?.length !== 0 &&
            props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item rounded-[10px] overflow-hidden shadow-[3px_3px_3px_#082c55]">
                    <img
                      src={item?.images[0]}
                      alt="Banner slide"
                      className="!w-full !left-0 !top-0 h-[200px] sm:h-[300px] md:h-[300px] lg:h-[500px] "
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
