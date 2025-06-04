import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const ProductZoom = () => {
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
            className="zoomProductSliderThumbs !h-[500px] overflow-hidden"
          >
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 0 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(0)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 1 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(1)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 2 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(2)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 3 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(3)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 4 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(4)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 5 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(5)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 6 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(6)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 7 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(7)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300 ${
                  slideIndex === 8 ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(8)}
              >
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="zoomContainer !w-[85%] overflow-hidden rounded-md">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
          >
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
