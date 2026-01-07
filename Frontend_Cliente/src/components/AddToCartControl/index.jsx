import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FaShoppingCart } from "react-icons/fa";
import { ImMinus, ImPlus } from "react-icons/im";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";

const AddToCartControl = ({ item }) => {
  const context = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const found = context?.cartData?.filter((ci) =>
      ci.productId.includes(item?._id)
    );

    if (found?.length !== 0) {
      setCartItem(found);
      setIsAdded(true);
      setQuantity(found[0]?.quantity || 1);
    } else {
      setQuantity(1);
      setIsAdded(false);
      setCartItem(null);
    }
  }, [context?.cartData, item?._id]);

  const addToCart = () => {
    if (context?.userData === null) {
      context?.alertBox(
        "error",
        "NO HAS INICIADO SESIÓN, POR FAVOR INICIA SESIÓN"
      );
      return false;
    }

    const productItem = {
      _id: item?._id,
      name: item?.name,
      image: item?.images[0],
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      discount: item?.discount,
      quantity: quantity,
      subTotal: parseInt(item?.price * quantity),
      countInStock: item?.countInStock,
      brand: item?.brand,
    };

    setIsLoading(true);
    context?.addToCart(productItem, context?.userData?._id, quantity);
    setIsAdded(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const minusQty = () => {
    if (!cartItem || cartItem.length === 0) return;

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
      });
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: item?.price * quantity - item?.price,
      };

      editData(`/api/cart/update-qty`, obj).then((res) => {
        context.alertBox("success", res?.data?.message);
        context.getCartItems();
      });
    }
  };

  const addQty = () => {
    if (!cartItem || cartItem.length === 0) return;

    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: item?.price * quantity + item?.price,
    };

    editData(`/api/cart/update-qty`, obj).then((res) => {
      context.alertBox("success", res?.data?.message);
      context.getCartItems();
    });
  };

  return (
    <div className="!mt-0">
      {isAdded === false ? (
        <Button
          className="btn-org flex btn-sm gap-3 w-[100%] justify-center"
          size="small"
          onClick={addToCart}
        >
          AGREGAR
          <FaShoppingCart className="!text-[20px] !scale-x-[-1]" />
        </Button>
      ) : (
        <>
          {isLoading === true ? (
            <Button
              className="btn-org flex btn-sm gap-3 w-[100%] justify-center"
              size="small"
            >
              <CircularProgress />
            </Button>
          ) : (
            <div className="flex items-center overflow-hidden rounded-full border-2 border-[#082c55] w-[140px] h-[40px]">
              <Button
                className="!min-w-[40px] !w-[40px] !h-[40px] !bg-[#556f8d] !text-white !rounded-l-full !flex !items-center !justify-center"
                onClick={minusQty}
              >
                <ImMinus />
              </Button>

              <div className="flex-1 bg-white h-full flex items-center justify-center">
                <span className="text-[18px] font-[700] text-[#082c55]">
                  {quantity}
                </span>
              </div>

              <Button
                className="!min-w-[40px] !w-[40px] !h-[40px] !bg-[#082c55] !text-white !rounded-r-full !flex !items-center !justify-center"
                onClick={addQty}
              >
                <ImPlus />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddToCartControl;
