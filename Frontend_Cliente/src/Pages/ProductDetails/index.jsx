import React, { useEffect, useRef, useState, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductZoom from "../../components/ProductZoom";

import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetails";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Reviews from "./reviews";
import { MyContext } from "../../App";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const context = useContext(MyContext);

  useEffect(() => {
    if (!productData || !context?.catData) {
        setBreadcrumbs([]);
        return;
    }

    const { catId, subCatId, thirdsubCatId } = productData;
    const nestedCats = context?.catData;

    if (!nestedCats || nestedCats.length === 0) {
      setBreadcrumbs([]);
      return;
    }

    const allCats = [];
    const flatten = (categories) => {
        categories.forEach(category => {
            const { children, ...rest } = category;
            allCats.push(rest);
            if (children && children.length > 0) {
                flatten(children);
            }
        });
    };
    flatten(nestedCats);
    
    const path = [];

    const findCategoryById = (id) => {
        if (!id) return null;
        return allCats.find(cat => cat._id === id);
    };

    let currentId = null;
    if (thirdsubCatId) {
        currentId = thirdsubCatId;
    } else if (subCatId) {
        currentId = subCatId;
    } else if (catId) {
        currentId = catId;
    }

    if (currentId) {
        let currentCat = findCategoryById(currentId);
        while (currentCat) {
            path.unshift(currentCat);
            currentCat = findCategoryById(currentCat.parentId);
        }
    }

    setBreadcrumbs(path);

  }, [productData, context?.catData]);

  const { id } = useParams();

  const reviewSec = useRef();

  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviewsCount(res.reviews.length);
      }
    });
  }, [reviewsCount]);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);
        fetchDataFromApi(
          `/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`,
        ).then((res) => {
          if (res?.error === false) {
            const filteredData = res?.products?.filter(
              (item) => item._id !== id,
            );
            setRelatedProductData(filteredData);
          }
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  const gotoReviews = () => {
    window.scrollTo({
      top: reviewSec?.current.offsetTop - 200,
      behavior: "smooth",
    });
    setActiveTab(1);
  };

  return (
    <>
      <div className="!py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                let href = '/productListing?';
                
                if (index === 0) {
                    href += `catId=${crumb._id}`;
                } else if (index === 1) {
                    href += `subCatId=${crumb._id}`;
                } else if (index === 2) {
                    href += `thirdLavelCatId=${crumb._id}`;
                }

                if(isLast) {
                    return (
                         <Typography color="text.primary" key={crumb._id} className="font-[bold]" sx={{ fontSize: "16px" }}>{crumb.name}</Typography>
                    )
                }

                return (
                    <Link
                        key={crumb._id}
                        underline="hover"
                        color="inherit"
                        href={href}
                        className="link transition !font-[bold] !text-[#082c55] hover:!text-[#0a7fec]"
                        sx={{ fontSize: "16px" }}
                    >
                        {crumb.name}
                    </Link>
                );
            })}
          </Breadcrumbs>
        </div>
      </div>

      <section className="!bg-white !py-5">
        {isLoading === true ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="container flex !gap-8 items-center">
              <div className="productZoomContainer !w-[40%] ">
                <ProductZoom images={productData?.images} />
              </div>

              <div className="productContent w-[60%] !pr-10">
                <ProductDetailsComponent
                  item={productData}
                  reviewsCount={reviewsCount}
                  gotoReviews={gotoReviews}
                />
              </div>
            </div>

            <div className="container !pt-10">
              <div className="flex items-center !gap-8 !mb-5">
                <span
                  className={`link text-[17px]   cursor-pointer font-[bold] font-bold ${
                    activeTab === 0 && "!text-[#000]"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  DESCRIPCIÓN
                </span>

                <span
                  className={`link text-[17px] cursor-pointer font-[bold] font-bold ${
                    activeTab === 1 && "text-[#000]"
                  }`}
                  onClick={() => setActiveTab(1)}
                  ref={reviewSec}
                >
                  RESEÑAS ({reviewsCount})
                </span>
              </div>

              {activeTab === 0 && (
                <div className="shadow-md bg-gray-800 text-white w-full !border-gray-950 !p-5 !px-8 ">
                  {productData?.description || "No hay descripción disponible."}
                </div>
              )}

              {activeTab === 1 && (
                <div className="shadow-md bg-[#f7f7f7] !text-[#082c55] w-[80%] rounded-md border-1 border-[#082c55] !p-5 !px-8">
                  {productData?.length !== 0 && (
                    <Reviews
                      productId={productData?._id}
                      setReviewsCount={setReviewsCount}
                    />
                  )}
                </div>
              )}
            </div>

            {relatedProductData?.length !== 0 && (
              <div className="container !pt-8">
                <h2 className="text-[20px] font-[600] !pb-0">
                  PRODUCTOS RELACIONADOS
                </h2>
                <ProductsSlider items={6} data={relatedProductData} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
