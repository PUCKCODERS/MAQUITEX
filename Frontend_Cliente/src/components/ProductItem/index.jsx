import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaHeart } from "react-icons/fa";
import { IoGitCompare } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MyContext } from "../../App"; // Adjust the import path as necessary
import { useState } from "react";
import { ImMinus } from "react-icons/im";
import { ImPlus } from "react-icons/im";
import { useEffect } from "react";
import { deleteData, editData } from "../../utils/api";

const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState(false);

  const [activeTabSize, setActiveTabSize] = useState(null);
  const [activeTabWeight, setActiveTabWeight] = useState(null);
  const [activeTabRam, setActiveTabRam] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);

  const context = useContext(MyContext);

  const addToCart = (product, userId, quantity) => {
    const productItem = {
      _id: product?._id,
      name: product?.name,
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
      props?.item?.size?.length !== 0 ||
      props?.item?.productRams?.length !== 0 ||
      props?.item?.productWeight?.length !== 0
    ) {
      setIsShowTabs(true);
    } else {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
    }

    if (
      activeTabSize !== null ||
      activeTabWeight !== null ||
      activeTabRam !== null
    ) {
      context?.addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
    }
  };

  const handleClickActiveTabSize = (index, name) => {
    setActiveTabSize(index);
    setSelectedSize(name);
  };

  const handleClickActiveTabWeight = (index, name) => {
    setActiveTabWeight(index);
    setSelectedWeight(name);
  };

  const handleClickActiveTabRam = (index, name) => {
    setActiveTabRam(index);
    setSelectedRam(name);
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id)
    );

    if (item?.length !== 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity || 1);
    } else {
      setQuantity(1);
    }
  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then(() => {
        setIsAdded(false);
        context.alertBox("success", "PRODUCTO ELIMINADO");
        context.getCartItems();
        setIsShowTabs(false);
        setActiveTabSize(null);
        setActiveTabWeight(null);
        setActiveTabRam(null);
      });
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: props?.item?.price * quantity - props?.item?.price,
      };

      editData(`/api/cart/update-qty`, obj).then((res) => {
        context.alertBox("success", res?.data?.message);
        context.getCartItems();
      });
    }
  };

  const addQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: props?.item?.price * quantity + props?.item?.price,
    };

    editData(`/api/cart/update-qty`, obj).then((res) => {
      context.alertBox("success", res?.data?.message);
      context.getCartItems();
    });
  };

  return (
    <div className="productItem bg-white !rounded-md !overflow-hidden !border-1 !border-[#b1cdee] shadow-[5px_5px_5px_#274a72] ">
      <div className="group imgWrapper !w-[100%] !overflow-hidden !rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img !h-[200px] !overflow-hidden">
            <img
              src={props?.item?.images[0]}
              className="!left-0 !top-0 !w-[300px] !h-[200px] !rounded-md"
            />

            <img
              src={props?.item?.images[1]}
              className="!left-0 !top-0 !w-[300px] !h-[200px] transition-all duration-700 !rounded-md absolute opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>

        {isShowTabs === true && (
          <div className="flex flex-col items-center justify-center !absolute !text-[11px] top-0 left-0 w-full h-full !bg-[rgba(0,0,0,0.7)] !z-[60] !p-3 gap-4">
            {props?.item?.size?.length !== 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {props?.item?.size.map((item, index) => (
                  <span
                    key={index}
                    className={`flex items-center justify-center !p-1 !px-1 text-[#000] bg-[#fff] hover:bg-[#b1cdee] !max-w-[45px] !h-[25px] rounded-sm cursor-pointer border-1 border-[#000] ${
                      activeTabSize === index &&
                      "!bg-[#082c55] !text-white border-1 border-[#fff]"
                    }`}
                    onClick={() => handleClickActiveTabSize(index, item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {props?.item?.productWeight?.length !== 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {props?.item?.productWeight.map((item, index) => (
                  <span
                    key={index}
                    className={`flex items-center justify-center !p-1 !px-1 text-[#000] bg-[#fff] hover:bg-[#b1cdee] !max-w-[45px] !h-[25px] rounded-sm cursor-pointer border-1 border-[#000] ${
                      activeTabWeight === index &&
                      "!bg-[#082c55] !text-white border-1 border-[#fff]"
                    }`}
                    onClick={() => handleClickActiveTabWeight(index, item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {props?.item?.productRams?.length !== 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {props?.item?.productRams.map((item, index) => (
                  <span
                    key={index}
                    className={`flex items-center justify-center !p-1 !px-2 text-[#000] bg-[#fff] hover:bg-[#b1cdee] !max-w-[55px] !h-[25px] rounded-sm cursor-pointer border-1 border-[#000] ${
                      activeTabRam === index &&
                      "!bg-[#082c55] !text-white border-1 border-[#fff]"
                    }`}
                    onClick={() => handleClickActiveTabRam(index, item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <span className="discount flex items-center absolute top-[0px] left-[0px] !z-50 bg-[#e05e12] text-white !rounded-lg !p-1 text-[12px] font-[500]">
          {props?.item?.discount}%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col !w-[30px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#f10606] !border-1 !border-[#f3b8b8]  hover:!bg-white hover:!text-[#f10606]">
            <FaHeart className="" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#082c55] !border-1 !border-[#b1cdee] hover:!bg-white hover:!text-[#082c55]">
            <IoGitCompare className="" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !text-[18px] !rounded-full !text-white !bg-[#082c55] !border-1 !border-[#b1cdee] hover:!bg-white hover:!text-[#082c55]"
            onClick={() =>
              context.handleOpenProductDetailsModal(true, props?.item)
            }
          >
            <MdZoomOutMap className="" />
          </Button>
        </div>
      </div>

      <div className="info !p-3 !py-4 !bg-gray-100 relative !pb-[50px] !h-[210px]">
        <h6 className="text-[13px] text-[#556f8d] font-[bold]">
          <span className="link transition-all">{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[13px] !title !mt-1 font-[500] !text-[#082c55] !mb-1">
          <Link
            to={`/product/${props?.item?._id}`}
            className="link transition-all"
          >
            {props?.item?.name?.substr(0, 60)}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center justify-between !gap-4 ">
          <span className="oldPrice line-through text-red-400 text-[13px] font-[500]">
            &#36; {props?.item?.oldPrice}
          </span>
          <span class="price text-[#082c55] text-[15px] font-[600]">
            &#36; {props?.item?.price}
          </span>
        </div>

        <div className="!absolute !bottom-[10px] !left-0 !pl-1 !pr-1 !w-full  ">
          {isAdded === false ? (
            <Button
              className="btn-org flex btn-sm gap-3 w-[100%] justify-center "
              size="small"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
            >
              AGREGAR
              <FaShoppingCart className="!text-[20px] !scale-x-[-1]" />
            </Button>
          ) : (
            <div className="flex items-center justify-between overflow-hidden rounded-full border-1 border-[#082c55]">
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-[#556f8d]  !text-white !rounded-none"
                onClick={minusQty}
              >
                <ImMinus />
              </Button>
              <span className="!text-[20px] !text-bold !text-[#082c55]">
                {quantity}
              </span>
              <Button
                className="!min-w-[30px] !w-[30px] !h-[30px] !bg-[#082c55] !text-white !rounded-none"
                onClick={addQty}
              >
                <ImPlus />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
