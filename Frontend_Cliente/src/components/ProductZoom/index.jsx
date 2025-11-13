import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="flex !gap-3">
        <div className="slider !w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction={"vertical"}
            slidesPerView={5}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className={`zoomProductSliderThumbs !h-[500px] overflow-hidden ${
              props?.images?.length > 5 && "space"
            }`}
          >
            {props?.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                      slideIndex === index ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => goto(index)}
                  >
                    <img
                      src={item}
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="zoomContainer !w-[85%] overflow-hidden rounded-md">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
          >
            {props?.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={item}
                    className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
