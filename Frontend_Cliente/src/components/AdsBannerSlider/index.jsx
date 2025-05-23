import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="!py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm18lLHBKIs8ZYGHLHu6wESp4xyiT7rC0dQA&s"
            }
            liink={"/"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
