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
  const [reviews, setReviews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { id } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const getReviews = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviews(res.reviews);
      }
    });
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setProduct(res?.product);
        }, 1000);
      }
    });

    getReviews();
  }, [id]);

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
          <div className="productDetails flex flex-col lg:flex-row  lg:!gap-8 !mb-3">
            <div className="!w-full lg:!w-[40%]">
              {product?.images?.length !== 0 && (
                <div className="flex flex-col lg:flex-row !gap-3 !mb-3 lg:!mb-0">
                  <div className="slider !w-full lg:!w-[15%] order-2 lg:order-1">
                    <Swiper
                      ref={zoomSliderSml}
                      direction={windowWidth < 992 ? "horizontal" : "vertical"}
                      slidesPerView={5}
                      spaceBetween={5}
                      navigation={windowWidth < 992 ? false : true}
                      modules={[Navigation]}
                      className={`zoomProductSliderThumbs !h-auto lg:!h-[500px] overflow-hidden ${
                        product?.images?.length > 5 && "space"
                      }`}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`item rounded-md !shadow-lg !border-1 border-[#737475] overflow-hidden cursor-pointer group !h-full transition-opacity duration-300 ${
                                slideIndex === index
                                  ? "opacity-100"
                                  : "opacity-50"
                              }`}
                              onClick={() => goto(index)}
                            >
                              <img
                                src={item}
                                className="w-full h-full object-cover transition-all group-hover:scale-105"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <div className="zoomContainer !w-full lg:!w-[85%] !h-auto lg:!h-[500px] overflow-hidden rounded-md order-1 lg:order-2">
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
                              className="!w-full !h-full !rounded-md !shadow-lg !border-1 border-[#737475]"
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="!w-full lg:!w-[60%]">
              <h1 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-[bold] font-bold text-[#082c55] !mb-2">
                {product?.name}
              </h1>

              <div className="flex flex-wrap items-center !py-2">
                <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <GiMoneyStack className="text-[20px] text-[#082c55]" />
                  PRECIO :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  &#36; {product?.price}
                </span>
              </div>
              <div className="flex flex-wrap items-center !py-2">
                <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <MdBrandingWatermark className="text-[20px] text-[#082c55]" />
                  MARCA :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.brand}
                </span>
              </div>
              <div className="flex flex-wrap items-center !py-2">
                <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <AiFillDatabase className="text-[20px] text-[#082c55]" />
                  CATEGORÍA :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.catName}
                </span>
              </div>

              {product?.productRams?.length !== 0 && (
                <div className="flex flex-wrap items-center !py-2">
                  <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <IoIosColorPalette className="text-[20px] text-[#082c55]" />
                    COLOR :
                  </span>

                  <div className="flex flex-wrap items-center !gap-2">
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
                <div className="flex flex-wrap items-center !py-2">
                  <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <FaWeightScale className="text-[20px] text-[#082c55]" />
                    PESO :
                  </span>

                  <div className="flex flex-wrap items-center !gap-2">
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
                <div className="flex flex-wrap items-center !py-2">
                  <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                    <RxRulerSquare className="text-[20px] text-[#082c55]" />
                    TAMAÑO :
                  </span>

                  <div className="flex flex-wrap items-center !gap-2">
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

              <div className="flex flex-wrap items-center !py-2">
                <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <BiSolidMessageEdit className="text-[20px] text-[#082c55]" />
                  RESEÑAS :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  ({reviews.length}) RESEÑAS
                </span>
              </div>

              <div className="flex flex-wrap items-center !py-2 !mb-3">
                <span className="w-[50%] md:w-[25%] text-[#000] !font-bold flex items-center !gap-2 text-[14px]">
                  <BsPatchCheckFill className="text-[20px] text-[#082c55]" />
                  PUBLICADO :
                </span>
                <span className="!font-bold text-[#082c55] text-[14px]">
                  {product?.dateCreated?.split("T")[0]}
                </span>
              </div>

              <h2 className="text-[20px] lg:text-[25px] font-bold !mb-2">
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

          <div className="!mt-3 max-h-[300px] overflow-y-scroll overflow-x-hidden !pr-5">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full !mb-3 !p-4 bg-white rounded-lg shadow-[3px_3px_3px_#082c55] !border-1"
                >
                  <div className="flex gap-3 sm:gap-4 w-full mb-3">
                    <div className="img w-[50px] min-w-[50px] h-[50px] sm:w-[80px] sm:min-w-[80px] sm:h-[80px] overflow-hidden rounded-full border-1 border-[#082c55]">
                      <img
                        src={review.image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row w-full sm:items-start justify-between mb-1">
                        <h4 className="text-[14px] sm:text-[16px] font-bold text-[#082c55] mb-1 sm:mb-0">
                          {review.userName}
                        </h4>

                        <div className="flex items-center gap-1">
                          <Rating value={review.rating} readOnly size="small" />
                        </div>
                      </div>

                      <span className="text-[12px] sm:text-[13px] font-bold text-gray-500 block">
                        {review.createdAt?.split("T")[0]}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#4e4e4e] break-words whitespace-pre-wrap">
                    {review.review}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[14px] text-[#4e4e4e]">
                ESTE PRODUCTO NO TIENE RESEÑAS
              </p>
            )}
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
