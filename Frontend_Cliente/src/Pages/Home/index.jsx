import React, { useContext } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { FaTruckFast } from "react-icons/fa6";
import AdsBannerSlider from "../../components/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductsSlider from "../../components/ProductsSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BlogItem from "../../components/BlogItem";
import HomeBannerV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/BannerBoxV2";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
import AdsBannerSliderV3 from "../../components/AdsBannerSliderV3";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { MyContext } from "../../App";
import ProductLoading from "../../components/ProductLoading";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [bannerV2Data, setBannerV2Data] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductsData(res?.products);
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products);
    });

    fetchDataFromApi("/api/bannerV1").then((res) => {
      setBannerV1Data(res?.data);
    });

    fetchDataFromApi("/api/bannerV2").then((res) => {
      setBannerV2Data(res?.data);
    });

    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`,
    ).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      }
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductsData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      }
    });
  };

  return (
    <>
      <div className="!min-h-max lg:!min-h-[65vh] relative">
        {homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />}
      </div>

      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}

      <section id="productos-populares" className="!py-4 lg:!py-8 bg-white">
        <div className="container">
          <div className="flex items-center justify-between  !flex-col lg:!flex-row">
            <div className="leftSec w-full lg:w-[40%]">
              <h2 className="!text-[12px] sm:!text-[16px] md:!text-[16px] lg:!text-[20px] font-bold">
                PRODUCTOS POPULARES
              </h2>
              <p className="!text-[9px] sm:!text-[12px] md:!text-[12px] lg:!text-[12px] font-[400] !mt-0 !mb-0">
                NO TE PIERDAS LAS OFERTAS VIGENTES HASTA FIN DE AÑO
              </p>
            </div>

            <div className="rightSec w-full lg:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        key={index}
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>

          <div className="min-h-[60vh]">
            {popularProductsData?.length === 0 && <ProductLoading />}

            {popularProductsData?.length !== 0 && (
              <ProductsSlider items={6} data={popularProductsData} />
            )}
          </div>
        </div>
      </section>

      <section className="!py-6 bg-white">
        <div className="container flex flex-col lg:flex-row !gap-3">
          <div className="part1 w-full lg:w-[70%] ">
            {productsData?.length !== 0 && <HomeBannerV2 data={productsData} />}
          </div>

          {bannerV1Data.length >= 2 && (
            <div className="part2 scrollableBox w-full lg:w-[30%] flex items-center !gap-2 justify-between flex-row lg:flex-col">
              <BannerBoxV2
                info="left"
                item={bannerV1Data[0]}
                image={bannerV1Data[0]?.images?.[0]}
              />

              <BannerBoxV2
                info="right"
                item={bannerV1Data[1]}
                image={bannerV1Data[1]?.images?.[0]}
              />
            </div>
          )}
        </div>
      </section>

      <section className="!py-0 lg:!py-4 !pt-0 lg:!pt-8 bg-white">
        <div className="container">
          <div className="freeShipping !w-full sm:!w-[80%] md:!w-[80%] lg:!w-[80%] !m-auto !pb-0 !py-0 !p-0 lg:!py-1 lg:!p-1 border-3 !border-gray-950 bg-gray-700 flex items-center justify-between  !rounded-md !mb-7">
            <div className="!w-[100%] lg: border-3 !border-white !m-auto !py-1 !p-0 lg:!py-4 lg:!p-4 bg-gray-950 flex items-center !justify-center lg:!justify-between !flex-col lg:!flex-row !rounded-md">
              <div className="col1 flex items-center gap-4">
                <FaTruckFast className="text-[30px] sm:!text-[35px] md:!text-[40px] lg:text-[50px] text-white" />
                <span className="text-[15px] sm:!text-[16px] md:!text-[17px] lg:text-[18px] font-bold text-white !text-uppercase">
                  ENVIO GRATIS
                </span>
              </div>

              <div className="col2">
                <p className="!mb-0 font-[500] text-white !text-[10px] sm:!text-[11px] md:!text-[12px] lg:!text-[13px] text-center">
                  POR TU PRIMERA COMPRA O SUPERIOR A $200
                </p>
              </div>

              <p className="font-bold text-[20px] sm:!text-[20px] md:!text-[20px] lg:text-[20px] text-white">
                {" "}
                SOLO $200
              </p>
            </div>
          </div>

          {bannerV1Data?.length !== 0 && (
            <AdsBannerSliderV2 items={4} data={bannerV1Data} />
          )}
        </div>
      </section>
      <section id="nuevos-productos" className="!py-5 !pt-4 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-bold">NUEVOS PRODUCTOS</h2>

          {productsData?.length === 0 && <ProductLoading />}

          {productsData?.length !== 0 && (
            <ProductsSlider items={6} data={productsData} />
          )}

          {bannerV2Data?.length !== 0 && (
            <AdsBannerSliderV3 items={3} data={bannerV2Data} />
          )}
        </div>
      </section>
      <section
        id="productos-recomendados"
        className="!py-2 lg:!py-5 !pt-0 bg-white"
      >
        <div className="container">
          <h2 className="text-[20px] font-bold">PRODUCTOS RECOMENDADOS</h2>

          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <ProductsSlider items={6} data={featuredProducts} />
          )}
          <ProductsSlider items={6} />

          {bannerV1Data?.length !== 0 && (
            <AdsBannerSliderV2 items={4} data={bannerV1Data} />
          )}

          {bannerV2Data?.length !== 0 && (
            <AdsBannerSliderV3 items={3} data={bannerV2Data} />
          )}
        </div>
      </section>

      {blogData?.length !== 0 && (
        <section
          id="articulos-interes"
          className="!py-5 !pb-8 !pt-0 bg-white blogSection"
        >
          <div className="container">
            <h2 className="text-[20px] font-bold !mb-4">
              ARTICULOS DE INTERES
            </h2>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="blogSlider"
            >
              {blogData?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <BlogItem item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
