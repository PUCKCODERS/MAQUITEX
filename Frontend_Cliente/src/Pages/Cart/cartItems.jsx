import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { fetchDataFromApi, editData, deleteData } from "../../utils/api";
import { MyContext } from "../../App";

const CartItems = (props) => {
  const context = useContext(MyContext);

  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setCartItems] = useState(props.size || "");
  const [sizeOptions, setSizeOptions] = useState([]);
  const openSize = Boolean(sizeanchorEl);

  const [ramanchorEl, setRamAnchorEl] = useState(null);
  const [selectedRam, setRamItems] = useState(props.ram || "");
  const [ramOptions, setRamOptions] = useState([]);
  const openRam = Boolean(ramanchorEl);

  const [weightanchorEl, setWeightAnchorEl] = useState(null);
  const [selectedWeight, setWeightItems] = useState(props.weight || "");
  const [weightOptions, setWeightOptions] = useState([]);
  const openWeight = Boolean(weightanchorEl);

  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.quantity || 1);
  const [qtyOptions, setqtyOptions] = useState([]);
  const openQty = Boolean(qtyanchorEl);

  useEffect(() => {
    const productId = props?.item?.productId;
    if (!productId) return;

    window.scrollTo(0, 0);

    fetchDataFromApi(`/api/product/${productId}`).then((res) => {
      if (res?.error === false && res?.product) {
        const sizes = res.product?.size || [];
        setSizeOptions(Array.isArray(sizes) ? sizes : []);

        const rams = res.product?.productRams || [];
        setRamOptions(Array.isArray(rams) ? rams : []);

        const weights = res.product?.productWeight || [];
        setWeightOptions(Array.isArray(weights) ? weights : []);
      }
    });
  }, [props?.item?.productId]);

  useEffect(() => {
    const quantitysArray = Array.from({ length: 999 }, (_, i) => i + 1);
    setqtyOptions(quantitysArray);
  }, []);

  useEffect(() => {
    if (props.quantity) {
      setSelectedQty(props.quantity);
    }
  }, [props.quantity]);

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if (value !== null) {
      setCartItems(value);

      const obj = {
        _id: props?.item?._id,
        size: value,
      };

      editData(`/api/cart/update-item`, obj)
        .then((res) => {
          context?.alertBox(
            "success",
            res?.data?.message || "TAMAÑO ACTUALIZADO",
          );
          context?.getCartItems();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickRam = (event) => {
    setRamAnchorEl(event.currentTarget);
  };
  const handleCloseRam = (value) => {
    setRamAnchorEl(null);
    if (value !== null) {
      setRamItems(value);

      const obj = {
        _id: props?.item?._id,
        ram: value,
      };

      editData(`/api/cart/update-item`, obj)
        .then(() => {
          context?.alertBox("success", "COLOR ACTUALIZADO");
          context?.getCartItems();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickWeight = (event) => {
    setWeightAnchorEl(event.currentTarget);
  };
  const handleCloseWeight = (value) => {
    setWeightAnchorEl(null);
    if (value !== null) {
      setWeightItems(value);

      const obj = {
        _id: props?.item?._id,
        weight: value,
      };

      editData(`/api/cart/update-item`, obj)
        .then(() => {
          context?.alertBox("success", "PESO ACTUALIZADO");
          context?.getCartItems();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);

      const obj = {
        _id: props?.item?._id,
        qty: value,
        subTotal: (props?.item?.price || 0) * value,
      };

      editData(`/api/cart/update-qty`, obj)
        .then(() => {
          context?.alertBox("success", "CANTIDAD ACTUALIZADA");
          context?.getCartItems();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const removeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then(() => {
      context.alertBox("success", "PRODUCTO ELIMINADO DE TU CARRITO");
      context?.getCartItems();
    });
  };

  return (
    <div className="cartItem w-full !p-3 flex items-center !gap-4 !pb-5 border-b border-[#d1d1d1]">
      <div className="img w-[40%] lg:w-[20%] rounded-md overflow-hidden shadow-[3px_3px_3px_#274a72] border-1 border-[#acb1b8]">
        <Link to={`/product/${props?.item?.productId}`} className="group">
          <img
            src={props?.item?.image}
            className="!w-full !h-[180px] group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[60%] lg:w-[80%] relative">
        <RiDeleteBin5Fill
          className="!absolute top-[-5px] lg:top-[-5px] right-[-5px] lg:right-[10px] cursor-pointer text-[20px] lg:text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all"
          onClick={() => removeItem(props?.item?._id)}
        />
        <span className="!text-[11px] sm:!text-[12px] md:!text-[13px] lg:!text-[13px] font-[500]">
          {props?.item?.brand}
        </span>
        <h3 className=" !text-[10px] sm:!text-[12px] md:!text-[14px] lg:!text-[15px] !font-[500] !mb-3 !mt-1">
          <Link
            to={`/product/${props?.item?.productId}`}
            className=" !text-[#556f8d] hover:!text-[#20446d]"
          >
            {props?.item?.productTitle?.substr(
              0,
              context?.windowWidth < 992 ? 100 : 200,
            )}
          </Link>
        </h3>

        <Rating
          name="size-small"
          value={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="grid grid-cols-2 gap-2 !mt-2 lg:flex lg:items-center lg:gap-4">
          {qtyOptions && qtyOptions?.length > 0 && (
            <>
              <div className="relative w-full lg:w-auto">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[7px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72] w-full lg:w-auto"
                  onClick={handleClickQty}
                >
                  CANTIDAD {selectedQty} <GoTriangleDown />
                </span>

                <Menu
                  id="size-menu"
                  anchorEl={qtyanchorEl}
                  open={openQty}
                  onClose={() => handleCloseQty(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {qtyOptions?.map((quantity, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={`${quantity === selectedQty && "selected"}`}
                        onClick={() => handleCloseQty(quantity)}
                      >
                        {quantity}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            </>
          )}

          {sizeOptions && sizeOptions?.length > 0 && (
            <>
              <div className="relative w-full lg:w-auto">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1]  text-[7px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72] w-full lg:w-auto"
                  onClick={handleClickSize}
                >
                  TAMAÑO {selectedSize} <GoTriangleDown />
                </span>

                <Menu
                  id="size-menu"
                  anchorEl={sizeanchorEl}
                  open={openSize}
                  onClose={() => handleCloseSize(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {sizeOptions?.map((size, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={`${size === selectedSize && "selected"}`}
                        onClick={() => handleCloseSize(size)}
                      >
                        {size}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            </>
          )}

          {ramOptions && ramOptions?.length > 0 && (
            <>
              <div className="relative w-full lg:w-auto">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[7px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72] w-full lg:w-auto"
                  onClick={handleClickRam}
                >
                  COLOR {selectedRam} <GoTriangleDown />
                </span>

                <Menu
                  id="size-menu"
                  anchorEl={ramanchorEl}
                  open={openRam}
                  onClose={() => handleCloseRam(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {ramOptions?.map((ram, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={`${ram === selectedRam && "selected"}`}
                        onClick={() => handleCloseRam(ram)}
                      >
                        {ram}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            </>
          )}

          {weightOptions && weightOptions?.length > 0 && (
            <>
              <div className="relative w-full lg:w-auto">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[7px] sm:text-[9px] md:text-[11px] lg:text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72] w-full lg:w-auto"
                  onClick={handleClickWeight}
                >
                  PESO {selectedWeight} <GoTriangleDown />
                </span>

                <Menu
                  id="size-menu"
                  anchorEl={weightanchorEl}
                  open={openWeight}
                  onClose={() => handleCloseWeight(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {weightOptions?.map((weight, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={`${weight === selectedWeight && "selected"}`}
                        onClick={() => handleCloseWeight(weight)}
                      >
                        {weight}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center !gap-2 lg:!gap-4 !mt-3">
          <span className="oldPrice line-through text-[#b8b8b8] text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-[500]">
            {props?.item?.oldPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>

          <span className="price text-[#0a7fec] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-[600]">
            {props?.item?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>

          <span className="price text-[#ec370a] text-[10px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-[600]">
            {props?.item?.discount}%{" "}
            <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]">
              DESCUENTO
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
