import React, { useContext, useState } from "react";
import QtyBox from "../../components/QtyBox";
import { GiShoppingCart } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

const ProductDetailsComponent = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [tabError, setTabError] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);

  const [activeTabSize, setActiveTabSize] = useState(null);
  const [activeTabWeight, setActiveTabWeight] = useState(null);
  const [activeTabRam, setActiveTabRam] = useState(null);

  const context = useContext(MyContext);

  const handleSelecteQty = (qty) => {
    setQuantity(qty);
  };

  const handleClickActiveTabSize = (index, name) => {
    setActiveTabSize(index);
    setSelectedSize(name);
    setTabError(false);
  };

  const handleClickActiveTabWeight = (index, name) => {
    setActiveTabWeight(index);
    setSelectedWeight(name);
    setTabError(false);
  };

  const handleClickActiveTabRam = (index, name) => {
    setActiveTabRam(index);
    setSelectedRam(name);
    setTabError(false);
  };

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      context?.alertBox(
        "error",
        "NO HAS INICIADO SESIÓN, POR FAVOR INICIA SESIÓN"
      );
      return false;
    }

    const productItem = {
      productId: product?._id,
      productTitle: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      countInStock: product?.countInStock,
      brand: product?.brand,
      size: props?.item?.size?.length !== 0 ? selectedSize : "",
      weight: props?.item?.productWeight?.length !== 0 ? selectedWeight : "",
      ram: props?.item?.productRams?.length !== 0 ? selectedRam : "",
    };

    if (
      (props?.item?.size?.length === 0 || selectedSize !== null) &&
      (props?.item?.productWeight?.length === 0 || selectedWeight !== null) &&
      (props?.item?.productRams?.length === 0 || selectedRam !== null)
    ) {
      setIsLoading(true);
      postData("/api/cart/add", productItem).then((res) => {
        if (res?.error === false) {
          context?.alertBox("success", res?.message);

          context?.getCartItems();
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(true);
          context?.alertBox("error", res?.message);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      });
    } else {
      setTabError(true);
      context.alertBox(
        "error",
        "TIENES QUE ESCOGER UNA OPCIÓN ANTES DE AGREGAR"
      );
    }
  };

  return (
    <>
      <h1 className="text-[24px] font-[bold] font-bold text-[#082c55] !mb-2">
        {props?.item?.name}
      </h1>
      <div className="flex items-center !gap-3">
        <span className="text-gray-500 text-[13px] ">
          MARCA :
          <span className="font-[500] text-black opacity-75 !ml-1">
            {props?.item?.brand}
          </span>
        </span>

        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />
        <span
          className="text-[13px] cursor-pointer"
          onClick={props.gotoReviews}
        >
          RESEÑAS ({props.reviewsCount})
        </span>
      </div>

      <div className="flex items-center !gap-4 !mt-4">
        <span className="oldPrice line-through text-red-400 text-[18px] font-[500]">
          &#36; {props?.item?.oldPrice}
        </span>
        <span className="price text-[#0a7fec] text-[20px] font-[600]">
          &#36; {props?.item?.price}
        </span>

        <span className="text-[14px] ">
          DISPONIBLE EN STOCK :
          <span className="text-green-600 text-[14px] font-bold !ml-2">
            {props?.item?.countInStock} ARTICULOS
          </span>
        </span>
      </div>

      <p className="!mt-3 !pr-10 !mb-5 !text-[#000]">
        {props?.item?.description}
      </p>

      {props?.item?.size?.length !== 0 && (
        <div className="flex items-center !gap-3 ">
          <span className="text-[16px] font-[bold] font-bold">TAMAÑO</span>
          <div className="flex items-center !gap-1 actions">
            {props?.item?.size?.map((item, index) => {
              return (
                <Button
                  className={`${
                    activeTabSize === index ? "!bg-[#274a72] !text-white" : ""
                  } ${
                    tabError === true && selectedSize === null ? "error" : ""
                  }`}
                  onClick={() => handleClickActiveTabSize(index, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.productRams?.length !== 0 && (
        <div className="flex items-center !gap-3 !mt-2">
          <span className="text-[16px] font-[bold] font-bold">COLOR</span>
          <div className="flex items-center !gap-1 actions">
            {props?.item?.productRams?.map((item, index) => {
              return (
                <Button
                  className={`${
                    activeTabRam === index ? "!bg-[#274a72] !text-white" : ""
                  } ${
                    tabError === true && selectedRam === null ? "error" : ""
                  }`}
                  onClick={() => handleClickActiveTabRam(index, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {props?.item?.productWeight?.length !== 0 && (
        <div className="flex items-center !gap-3 !mt-2">
          <span className="text-[16px] font-[bold] font-bold">PESO</span>
          <div className="flex items-center !gap-1 actions">
            {props?.item?.productWeight?.map((item, index) => {
              return (
                <Button
                  className={`${
                    activeTabWeight === index ? "!bg-[#274a72] !text-white" : ""
                  } ${
                    tabError === true && selectedWeight === null ? "error" : ""
                  }`}
                  onClick={() => handleClickActiveTabWeight(index, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-green-600 font-bold text-[14px] !mt-5 !mb-2">
        ENVIO GRATIS
        <span className="font-[bold] font-bold text-[#7994b1] !ml-2">
          ( VALIDO PARA LA CIUDAD DE QUITO )
        </span>
      </p>

      <div className="flex items-center !gap-4 !py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox handleSelecteQty={handleSelecteQty} />
        </div>

        <Button
          className="btn-org flex !gap-2 !min-w-[150px]"
          onClick={() =>
            addToCart(props?.item, context?.userData?._id, quantity)
          }
        >
          {isLoading === true ? (
            <CircularProgress />
          ) : (
            <>
              AGREGAR
              <GiShoppingCart className="text-[25px] scale-x-[-1]" />
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center !gap-4 !mt-4">
        <span className="flex items-center !gap-2 text-[14px] text-[#556f8d] font-bold link cursor-pointer">
          <FaHeart className="text-[18px] text-red-600 hover:scale-125 transition-transform duration-200" />
          AGREGAR A LISTA DE DESEOS
        </span>

        <span className="flex items-center !gap-2 text-[14px] text-[#556f8d] font-bold link cursor-pointer">
          <IoMdGitCompare className="text-[18px] text-[#274a72] hover:scale-125 transition-transform duration-200" />
          AGREGAR PARA COMPARAR
        </span>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
