import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const ProductZoom = () => {
  return (
    <>
      <div className="flex !gap-3">
        <div className="slider !w-[15%]">
          <Swiper
            direction={"vertical"}
            slidesPerView={7}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs !h-[500px] overflow-hidden"
          >
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group">
                <img
                  src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="zoomContainer !w-[85%] !h-[500px] overflow-hidden">
          <Swiper slidesPerView={1} spaceBetween={10} navigation={false}>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1}
                src="../../../imagenes/ProductZoom/ProductZoom3.jpg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
