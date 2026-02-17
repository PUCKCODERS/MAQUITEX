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
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import { Navigation, FreeMode, Autoplay } from "swiper/modules";
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
import { getOptimizedUrl } from "../../utils/cloudinaryHelper";

const Home = () => {
  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productsData, setAllProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [bannerV2Data, setBannerV2Data] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [allTabs, setAllTabs] = useState([]);

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

    fetchDataFromApi("/api/bannerV1").then((res) => {
      const shuffled = res?.data?.sort(() => 0.5 - Math.random());
      setBannerV1Data(shuffled);
    });

    fetchDataFromApi("/api/bannerV2").then((res) => {
      const shuffled = res?.data?.sort(() => 0.5 - Math.random());
      setBannerV2Data(shuffled);
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

  useEffect(() => {
    const tabs = [];
    context?.catData?.forEach((cat) => {
      tabs.push({ ...cat, type: "cat" });
      if (cat.children?.length !== 0) {
        cat.children?.forEach((subCat) => {
          tabs.push({ ...subCat, type: "subCat" });
        });
      }
    });
    setAllTabs(tabs);
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id, type) => {
    setPopularProductsData([]);
    let url = `/api/product/getAllProductsByCatId/${id}`;
    if (type === "subCat") {
      url = `/api/product/getAllProductsBySubCatId/${id}`;
    }
    fetchDataFromApi(url).then((res) => {
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
              <h2 className="!text-[16px] sm:!text-[16px] md:!text-[16px] lg:!text-[20px] ">
                PRODUCTOS POPULARESSSSSS
              </h2>
              <p className="!text-[10px] sm:!text-[12px] md:!text-[12px] lg:!text-[12px] font-[400] !mt-0 !mb-0">
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
                {allTabs?.length !== 0 &&
                  allTabs?.map((cat, index) => {
                    return (
                      <Tab
                        key={index}
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id, cat?.type)}
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

      <section className="!py-2 bg-gradient-to-b bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            speed={500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, FreeMode, Autoplay]}
            className="brandsSlider !pb-0 !px-4 !-mt-10 !-mb-10 lg:!-mb-5"
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              300: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              400: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              550: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              700: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              900: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
              1100: {
                slidesPerView: 7,
                spaceBetween: 0,
              },
              1300: {
                slidesPerView: 8,
                spaceBetween: 0,
              },
            }}
          >
            {[
              {
                name: "Singer",
                logo: "https://cdn.worldvectorlogo.com/logos/singer-2.svg",
              },
              {
                name: "Brother",
                logo: "https://cdn.worldvectorlogo.com/logos/brother-1.svg",
              },
              {
                name: "Janome",
                logo: "https://cdn.worldvectorlogo.com/logos/janome.svg",
              },
              {
                name: "Juki",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/JUKI_2021_logo.svg/3840px-JUKI_2021_logo.svg.png",
              },
              {
                name: "Bernina",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/BERNINA_International_Logo.png?20100601090650",
              },
              {
                name: "Pfaff",
                logo: "https://cdn.worldvectorlogo.com/logos/pfaff.svg",
              },
              {
                name: "Husqvarna",
                logo: "https://cdn.worldvectorlogo.com/logos/husqvarna.svg",
              },
              {
                name: "Elna",
                logo: "https://cdn.worldvectorlogo.com/logos/elna.svg",
              },
            ].map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="group w-[100px] bg-transparent  h-[140px] flex items-center justify-center p-4 ">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    width="100"
                    height="140"
                    className="w-[100px] h-[140px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
                image={getOptimizedUrl(bannerV1Data[0]?.images?.[0], 600)}
              />

              <BannerBoxV2
                info="right"
                item={bannerV1Data[1]}
                image={getOptimizedUrl(bannerV1Data[1]?.images?.[0], 600)}
              />
            </div>
          )}
        </div>
      </section>

      <section className="!py-0 lg:!py-4 !pt-0 lg:!pt-0 bg-white">
        <div className="container">
          <div className="freeShipping !w-full sm:!w-[80%] md:!w-[80%] lg:!w-[80%] !m-auto !pb-0 !py-0 !p-0 lg:!py-1 lg:!p-1 border-3 !border-[#082c55]/60 backdrop-blur-sm !bg-[#082c55]/40 flex items-center justify-between  !rounded-md !mb-7">
            <div className="!w-[100%] lg: border-3 !border-white !m-auto !py-1 !p-0 lg:!py-4 lg:!p-4 !bg-[#082c55]/50 backdrop-blur-sm flex items-center !justify-center lg:!justify-between !flex-col lg:!flex-row !rounded-md">
              <div className="col1 flex items-center gap-4">
                <FaTruckFast className="text-[30px] sm:!text-[35px] md:!text-[40px] lg:text-[50px] text-white" />
                <span className="text-[15px] sm:!text-[16px] md:!text-[17px] lg:text-[18px] font-bold text-white !text-uppercase">
                  ENVIO GRATIS
                </span>
              </div>

              <div className="col2">
                <p className="!mb-0 font-[500] text-white !text-[10px] sm:!text-[11px] md:!text-[12px] lg:!text-[13px] text-center">
                  POR TU PRIMER PEDIDO ONLINE O SUPEIOR A $200
                </p>
              </div>

              <p className="font-bold text-[20px] sm:!text-[20px] md:!text-[20px] lg:text-[20px] text-white">
                {" "}
                SOLO $200
              </p>
            </div>
          </div>

          {bannerV1Data?.length !== 0 && (
            <AdsBannerSliderV2
              items={4}
              data={bannerV1Data}
              imageClass="!h-[100px] min-[300px]:!h-[150px] lg:!h-[195px]"
            />
          )}
        </div>
      </section>

      <section className="!py-2 bg-gradient-to-b bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            speed={500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: true,
            }}
            modules={[Navigation, FreeMode, Autoplay]}
            className="brandsSlider !pb-0 !px-4 !-mt-10 !-mb-10 lg:!-mb-5"
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              300: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              400: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              550: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
              700: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              900: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
              1100: {
                slidesPerView: 7,
                spaceBetween: 0,
              },
              1300: {
                slidesPerView: 8,
                spaceBetween: 0,
              },
            }}
          >
            {[
              {
                name: "Singer",
                logo: "https://cdn.worldvectorlogo.com/logos/singer-2.svg",
              },
              {
                name: "Brother",
                logo: "https://cdn.worldvectorlogo.com/logos/brother-1.svg",
              },
              {
                name: "Janome",
                logo: "https://cdn.worldvectorlogo.com/logos/janome.svg",
              },
              {
                name: "Juki",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/JUKI_2021_logo.svg/3840px-JUKI_2021_logo.svg.png",
              },
              {
                name: "Bernina",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/BERNINA_International_Logo.png?20100601090650",
              },
              {
                name: "Pfaff",
                logo: "https://cdn.worldvectorlogo.com/logos/pfaff.svg",
              },
              {
                name: "Husqvarna",
                logo: "https://cdn.worldvectorlogo.com/logos/husqvarna.svg",
              },
              {
                name: "Elna",
                logo: "https://cdn.worldvectorlogo.com/logos/elna.svg",
              },
            ].map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="group w-[100px] bg-transparent h-[140px] flex items-center justify-center p-4 ">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    width="100"
                    height="140"
                    className="w-[100px]  h-[140px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="nuevos-productos" className="!py-5 !pt-4 bg-white">
        <div className="container">
          <h2 className="!text-[16px] sm:!text-[16px] md:!text-[16px] lg:!text-[20px] ">
            NUEVOS PRODUCTOS
          </h2>

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
          <h2 className="!text-[16px] sm:!text-[16px] md:!text-[16px] lg:!text-[20px]">
            PRODUCTOS RECOMENDADOS
          </h2>

          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <ProductsSlider items={6} data={featuredProducts} />
          )}
          <ProductsSlider items={6} />
        </div>
      </section>

      {blogData?.length !== 0 && (
        <section
          id="articulos-interes"
          className="!py-5 !pb-8 !pt-0 bg-white blogSection"
        >
          <div className="container">
            <h2 className="!text-[16px] sm:!text-[16px] md:!text-[16px] lg:!text-[20px] !mb-4">
              ARTICULOS DE INTERES
            </h2>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              navigation={context?.windowWidth < 992 ? false : true}
              modules={[Navigation, FreeMode]}
              freeMode={true}
              breakpoints={{
                250: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                330: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1100: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
              }}
              className="blogSlider"
            >
              {blogData?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <BlogItem
                      item={item}
                      link={
                        index === 0
                          ? "/blog/firstblog"
                          : index === 1
                            ? "/blog/secondblog"
                            : index === 2
                              ? "/blog/thirdblog"
                              : index === 3
                                ? "/blog/fourthblog"
                                : index === 4
                                  ? "/blog/quintoblog"
                                  : index === 5
                                    ? "/blog/sixthblog"
                                    : "/"
                      }
                    />
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
