import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { fetchDataFromApi, editData } from "../../utils/api";
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

    fetchDataFromApi(`/api/product/${productId}`).then((res) => {
      if (res?.error === false && res?.product) {
        const sizes = res.product?.size || [];
        setSizeOptions(Array.isArray(sizes) ? sizes : []);

        const rams = res.product?.productRams || [];
        setRamOptions(Array.isArray(rams) ? rams : []);

        const weights = res.product?.productWeight || [];
        setWeightOptions(Array.isArray(weights) ? weights : []);

        // Generar un rango de cantidades de 1 a 10 (o basado en countInStock)
        const maxQty = res.product?.countInStock || 10;
        const quantitysArray = Array.from({ length: maxQty }, (_, i) => i + 1);
        setqtyOptions(quantitysArray);
      }
    });
  }, [props?.item?.productId]);

  // Inicializar selectedQty cuando props.quantity cambie
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
    }
  };

  const handleClickRam = (event) => {
    setRamAnchorEl(event.currentTarget);
  };
  const handleCloseRam = (value) => {
    setRamAnchorEl(null);
    if (value !== null) {
      setRamItems(value);
    }
  };

  const handleClickWeight = (event) => {
    setWeightAnchorEl(event.currentTarget);
  };
  const handleCloseWeight = (value) => {
    setWeightAnchorEl(null);
    if (value !== null) {
      setWeightItems(value);
    }
  };

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);

      // Persistar la cantidad en el servidor y refrescar el carrito
      const obj = {
        _id: props?.item?._id,
        qty: value,
        subTotal: (props?.item?.price || 0) * value,
      };

      editData(`/api/cart/update-qty`, obj)
        .then((res) => {
          context?.alertBox(
            "success",
            res?.data?.message || "CANTIDAD ACTUALIZADA"
          );
          context?.getCartItems();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="cartItem w-full !p-3 flex items-center !gap-4 !pb-5 border-b border-[#d1d1d1]">
      <div className="img w-[20%] rounded-md overflow-hidden shadow-[3px_3px_3px_#274a72] border-1 border-[#acb1b8]">
        <Link to={`/product/${props?.item?.productId}`} className="group">
          <img
            src={props?.item?.image}
            className="!w-full !h-[180px] group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[80%] relative">
        <RiDeleteBin5Fill className="!absolute top-[-5px] right-[10px] cursor-pointer text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all" />
        <span className="text-[13px] font-[500]">{props?.item?.brand}</span>
        <h3 className="!text-[15px] !font-[bold] !mb-3 !mt-1">
          <Link
            to={`/product/${props?.item?.productId}`}
            className=" !text-[#556f8d] hover:!text-[#20446d]"
          >
            {props?.item?.productTitle?.substr(0, 200)}
          </Link>
        </h3>

        <Rating
          name="size-small"
          value={props?.item?.rating}
          size="small"
          readOnly
        />

        <div className="flex items-center !gap-4 !mt-2">
          {qtyOptions && qtyOptions?.length > 0 && (
            <>
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
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
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1]  text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
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
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
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
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
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

        <div className="flex items-center !gap-4 !mt-3">
          <span className="price text-[#0a7fec] text-[17px] font-[600]">
            &#36; {props?.item?.price}
          </span>
          <span className="oldPrice line-through text-[#b8b8b8] text-[15px] font-[500]">
            &#36; {props?.item?.oldPrice}
          </span>

          <span className="price text-[#ec370a] text-[17px] font-[600]">
            {props?.item?.discount}%{" "}
            <span className="text-[10px]">DESCUENTO</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
