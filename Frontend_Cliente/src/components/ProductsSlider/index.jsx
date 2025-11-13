import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";

const ProductsSlider = (props) => {
  return (
    <div className="productsSlider !py-3">
      <Swiper
        loop={true}
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="sliderHome"
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductItem item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
