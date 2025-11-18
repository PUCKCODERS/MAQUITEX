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
import BannerBoxV2 from "../../components/bannerBoxV2";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
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

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductsData(res?.products);
    });

    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`
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
      {homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />}

      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}

      <section className="!py-8 bg-white">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[20px] font-bold">PRODUCTOS POPULARES</h2>
              <p className="text-[12px] font-[400] !mt-0 !mb-0">
                NO TE PIERDAS LAS OFERTAS VIGENTES HASTA FINALES DE AÑO
              </p>
            </div>

            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat /*, index*/) => {
                    return (
                      <Tab
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>

          {popularProductsData?.length === 0 && <ProductLoading />}

          {popularProductsData?.length !== 0 && (
            <ProductsSlider items={6} data={popularProductsData} />
          )}
        </div>
      </section>

      <section className="!py-6 bg-white">
        <div className="container flex !gap-3">
          <div className="part1 w-[70%]">
            {productsData?.length !== 0 && <HomeBannerV2 data={productsData} />}
          </div>

          <div className="part2 w-[30%] flex items-center !gap-2 justify-between flex-col ">
            <BannerBoxV2
              info="left"
              image={
                "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
              }
            />
            <BannerBoxV2
              info="right"
              image={
                "https://polipapel.vteximg.com.br/arquivos/ids/174453-1000-1000/O76237.png?v=638191796905070000igua.jpg"
              }
            />
          </div>
        </div>
      </section>

      <section className="!py-4 !pt-8 bg-white">
        <div className="container">
          <div className="freeShipping !w-[80%] !m-auto !py-4 !p-4 border-3 !border-gray-950 bg-gray-700 flex items-center justify-between !rounded-md !mb-7">
            <div className="!w-[100%] border-3 !border-white !m-auto !py-4 !p-4 bg-gray-950 flex items-center justify-between !rounded-md">
              <div className="col1 flex items-center gap-4">
                <FaTruckFast className="text-[50px] text-white" />
                <span className="text-[18px] font-bold text-white !text-uppercase">
                  ENVIO GRATIS
                </span>
              </div>

              <div className="col2">
                <p className="!mb-0 font-[500] text-white text-[13px]">
                  POR TU PRIMERA COMPRA Y SUPERIOR A $200
                </p>
              </div>

              <p className="font-bold text-[20px] text-white">- SOLO $200</p>
            </div>
          </div>

          <AdsBannerSliderV2 items={4} />
        </div>
      </section>
      <section className="!py-5 !pt-4 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-bold">NUEVOS PRODUCTOS</h2>

          {productsData?.length === 0 && <ProductLoading />}

          {productsData?.length !== 0 && (
            <ProductsSlider items={6} data={productsData} />
          )}

          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="!py-5 !pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-bold">PRODUCTOS RECOMENDADOS</h2>

          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <ProductsSlider items={6} data={featuredProducts} />
          )}
          <ProductsSlider items={6} />

          <AdsBannerSlider items={3} />
        </div>
      </section>
      <section className="!py-5 !pb-8 !pt-0 bg-white blogSection">
        <div className="container">
          <h2 className="text-[20px] font-bold !mb-4">ARTICULOS DE INTERES</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;
