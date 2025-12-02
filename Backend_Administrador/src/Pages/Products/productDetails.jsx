import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { MdBrandingWatermark } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import { IoIosColorPalette } from "react-icons/io";
import { RxRulerSquare } from "react-icons/rx";
import { FaWeightScale } from "react-icons/fa6";
import { BiSolidMessageEdit } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import { GiMoneyStack } from "react-icons/gi";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [product, setProduct] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setProduct(res?.product);
        }, 1000);
      }
    });
  }, []);

  return (
    <>
      <div className="flex !bg-white items-center justify-between !px-5 !py-5 !mt-3 !mb-5 sm:rounded-lg border-b dark:!border-gray-700 shadow-[5px_4px_7px_#082c55]">
        <h2 className="text-[#082c55] text-[20px] !font-[800] ">
          DETALLES DE PRODUCTO
        </h2>
      </div>

      {product?._id !== "" &&
      product?._id !== undefined &&
      product?._id !== null ? (
        <>
          <div className="productDetails flex !gap-8 !mb-3">
            <div className="!w-[40%]">
              {product?.images?.length !== 0 && (
                <div className="flex !gap-3">
                  <div className={`slider !w-[15%]`}>
                    <Swiper
                      ref={zoomSliderSml}
                      direction={"vertical"}
                      slidesPerView={5}
                      spaceBetween={10}
                      navigation={true}
                      modules={[Navigation]}
                      className={`zoomProductSliderThumbs !w-[100%] !h-[500px] overflow-hidden ${
                        product?.images?.length > 5 && "space"
                      }`}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group transition-opacity duration-300  ${
                                slideIndex === index
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                              onClick={() => goto(index)}
                            >
                              <img
                                src={item}
                                className="!w-[100%] !h-[75px] transition-all group-hover:scale-105 "
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <div className="zoomContainer !w-[85%]  overflow-hidden rounded-md">
                    <Swiper
                      ref={zoomSliderBig}
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <InnerImageZoom
                              zoomType="hover"
                              zoomScale={1}
                              src={item}
                              className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475] "
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="!w-[60%]">
              <h1 className="text-[25px] text-[#000] !font-bold !mb-4">
                {product?.name}
              </h1>

              <div className="flex items-center !py-2">
                <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <GiMoneyStack className="text-[20px] text-[#082c55]" />
                  PRECIO :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  &#36; {product?.price}
                </span>
              </div>
              <div className="flex items-center !py-2">
                <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <MdBrandingWatermark className="text-[20px] text-[#082c55]" />
                  MARCA :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.brand}
                </span>
              </div>
              <div className="flex items-center !py-2">
                <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <AiFillDatabase className="text-[20px] text-[#082c55]" />
                  CATEGORÍA :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.catName}
                </span>
              </div>

              {product?.productRams?.length !== 0 && (
                <div className="flex items-center !py-2">
                  <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <IoIosColorPalette className="text-[20px] text-[#082c55]" />
                    COLOR :
                  </span>

                  <div className="flex items-center !gap-2">
                    {product?.productRams?.map((ram, index) => {
                      return (
                        <span
                          className="!font-bold text-[#fff] text-[12px] inline-block bg-[#082c55] !px-1 !py-1 sm:rounded-lg"
                          key={index}
                        >
                          {ram}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {product?.productWeight?.length !== 0 && (
                <div className="flex items-center !py-2">
                  <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <FaWeightScale className="text-[20px] text-[#082c55]" />
                    PESO :
                  </span>

                  <div className="flex items-center !gap-2">
                    {product?.productWeight?.map((weight, index) => {
                      return (
                        <span
                          className="!font-bold text-[#fff] text-[12px] inline-block bg-[#082c55] !px-1 !py-1 sm:rounded-lg"
                          key={index}
                        >
                          {weight}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {product?.size?.length !== 0 && (
                <div className="flex items-center !py-2">
                  <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <RxRulerSquare className="text-[20px] text-[#082c55]" />
                    TAMAÑO :
                  </span>

                  <div className="flex items-center !gap-2">
                    {product?.size?.map((size, index) => {
                      return (
                        <span
                          className="!font-bold text-[#fff] text-[12px] inline-block bg-[#082c55] !px-1 !py-1 sm:rounded-lg"
                          key={index}
                        >
                          {size}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center !py-2">
                <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <BiSolidMessageEdit className="text-[20px] text-[#082c55]" />
                  RESEÑAS :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  ({product?.reviews?.length > 0 ? product?.reviews?.length : 0}
                  ) RESEÑAS
                </span>
              </div>

              <div className="flex items-center !py-2 !mb-3">
                <span className="w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <BsPatchCheckFill className="text-[20px] text-[#082c55]" />
                  PUBLICADO :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.dateCreated?.split("T")[0]}
                </span>
              </div>

              <h2 className="text-[25px] font-bold !mb-2">
                DESCRIPCIÓN DEL PRODUCTO
              </h2>

              {product?.description && (
                <p className="text-[14px]  text-[#4e4e4e]">
                  {product?.description}
                </p>
              )}
            </div>
          </div>

          <h2 className="text-[20px] font-bold">RESEÑAS DE CLIENTES</h2>

          <div className="reviewsWrap !mt-3">
            <div className="reviews w-full h-auto !mb-3 !p-4 bg-white sm:rounded-lg border-b dark:!border-gray-700 shadow-[5px_4px_7px_#082c55] flex items-center justify-between">
              <div className="flex items-center !gap-8">
                <div className="img !w-[85px] !h-[85px] rounded-full overflow-hidden border-2 border-[#082c55]">
                  <img
                    src="https://res.cloudinary.com/dkzbtz2rz/image/upload/v1761977733/1761977731463_ProductZoom1_-_copia_2.jpg"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-bold">
                      JONATHAN RODRIGUEZ
                    </h4>
                    <Rating name="read-only" value={5} readOnly size="small" />
                  </div>

                  <span className="text-[13px] font-bold">2025-11-01</span>
                  <p className="text-[13px] text-[#4e4e4e] !mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam delectus dolorum cumque recusandae facere
                    temporibus, facilis laborum perferendis impedit unde
                    incidunt eius quod, inventore veniam iure maiores adipisci
                    explicabo nam minima tenetur culpa reiciendis. Sit aperiam
                    quam harum ex possimus neque officiis. Eligendi illo
                    voluptas officia, iusto ea eveniet cupiditate!
                  </p>
                </div>
              </div>
            </div>
            <div className="reviews w-full h-auto !mb-3 !p-4 bg-white sm:rounded-lg border-b dark:!border-gray-700 shadow-[5px_4px_7px_#082c55] flex items-center justify-between">
              <div className="flex items-center !gap-8">
                <div className="img !w-[85px] !h-[85px] rounded-full overflow-hidden border-2 border-[#082c55]">
                  <img
                    src="https://res.cloudinary.com/dkzbtz2rz/image/upload/v1761977733/1761977731463_ProductZoom1_-_copia_2.jpg"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-bold">
                      JONATHAN RODRIGUEZ
                    </h4>
                    <Rating name="read-only" value={5} readOnly size="small" />
                  </div>

                  <span className="text-[13px] font-bold">2025-11-01</span>
                  <p className="text-[13px] text-[#4e4e4e] !mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam delectus dolorum cumque recusandae facere
                    temporibus, facilis laborum perferendis impedit unde
                    incidunt eius quod, inventore veniam iure maiores adipisci
                    explicabo nam minima tenetur culpa reiciendis. Sit aperiam
                    quam harum ex possimus neque officiis. Eligendi illo
                    voluptas officia, iusto ea eveniet cupiditate!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
