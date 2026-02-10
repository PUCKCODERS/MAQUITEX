import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
import { FaSlidersH } from "react-icons/fa";

const Sidebar = (props) => {
  const [isOpenedCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 25,
  });

  const [price, setPrice] = useState([0, 1000]);

  const context = useContext(MyContext);
  const location = useLocation();

  const handleCheckboxChange = (field, value) => {
    context?.setSearchData([]);

    const currentValues = filters[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));

    if (field === "catId") {
      setFilters((prev) => ({
        ...prev,
        subCatId: [],
        thirdsubCatId: [],
      }));
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }

    if (url.includes("subCatId")) {
      const subcategoryId = queryParameters.get("subCatId");
      const subcatArr = [];
      subcatArr.push(subcategoryId);
      filters.subCatId = subcatArr;
      filters.catId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]);
    }

    if (url.includes("thirdLavelCatId")) {
      const thirdcategoryId = queryParameters.get("thirdLavelCatId");
      const thirdcatArr = [];
      thirdcatArr.push(thirdcategoryId);
      filters.subCatId = [];
      filters.catId = [];
      filters.thirdsubCatId = thirdcatArr;
      filters.rating = [];
      context?.setSearchData([]);
    }

    filters.page = 1;

    setTimeout(() => {
      filtesData();
    }, 100);

    //context?.setSearchData([]);
  }, [location]);

  const filtesData = () => {
    props.setIsLoading(true);

    // console.log(context?.searchData);

    if (context?.searchData?.products?.length > 0) {
      props.setProductsData(context?.searchData);
      props.setIsLoading(false);
      props.setTotalPages(context?.searchData?.totalPages);
      window.scrollTo(0, 0);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        props.setProductsData(res);
        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(() => {
    filters.page = props.page;
    filtesData();
  }, [filters, props.page]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  return (
    <aside className="sidebar !-mt-3 lg:!-mt-0 !py-5 static lg:sticky -top-[130px] z-[99] !pr-2 lg:!pr-0">
      <div className="box">
        <h3 className="!w-full !mb-3 text-[12px] font-[bold] font-bold flex items-center !pr-2 text-[#082c55]">
          FILTRAR POR CATEGORIA
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#082c55]"
            onClick={() => setIsOpenCategoryFilter(!isOpenedCategoryFilter)}
          >
            {isOpenedCategoryFilter === true ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
          </Button>
        </h3>
        <Collapse isOpened={isOpenedCategoryFilter}>
          <div className="scroll !px-5 relative -left-[13px]">
            {context?.catData?.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item?._id}
                    control={<Checkbox />}
                    checked={filters?.catId?.includes(item?._id)}
                    label={item?.name}
                    onChange={() => handleCheckboxChange("catId", item?._id)}
                    className="w-full"
                  />
                );
              })}
          </div>
        </Collapse>
      </div>

      <div className="box !mt-4">
        <h3 className="w-full !mb-3 text-[15px] font-[bold] flex items-center !pr-5 text-[#556f8d]">
          FILTRAR POR PRECIO
        </h3>

        <RangeSlider
          value={price}
          onInput={setPrice}
          min={1}
          max={1000}
          setp={5}
        />
        <div className="flex !pt-4 !pb-2 priceRange">
          <span className="!ml-auto text-[13px] flex items-center justify-between !gap-2">
            From: <strong className="!text-dark">$: {price[0]}</strong>
          </span>
          <span className="!ml-auto text-[13px] flex items-center justify-between !gap-2">
            From: <strong className="!text-dark">$: {price[1]}</strong>
          </span>
        </div>
      </div>

      <div className="box !mt-4 !ml-1 lg:!ml-0">
        <h3 className="w-full !mb-3 text-[13px] font-[bold] flex items-center !pr-5 text-[#556f8d]">
          FILTAR POR CALIFICACION
        </h3>

        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange("rating", 5)}
          />
          <Rating name="rating" value={5} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange("rating", 4)}
          />
          <Rating name="rating" value={4} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange("rating", 3)}
          />
          <Rating name="rating" value={3} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange("rating", 2)}
          />
          <Rating name="rating" value={2} size="small" readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange("rating", 1)}
          />
          <Rating name="rating" value={1} size="small" readOnly />
        </div>
      </div>

      <Button className="btn btn-org w-full !h-full lg:!h-[45px] !flex lg:!hidden !mt-3  gap-2 !text-[20px]">
        <FaSlidersH className="!text-[20px] " />
        FILTRAR
      </Button>
    </aside>
  );
};

export default Sidebar;
