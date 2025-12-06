import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoTriangleDown } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { fetchDataFromApi } from "../../utils/api";

const CartItems = (props) => {
  const [sizeanchorEl, setSizeAnchorEl] = useState(null);
  const [selectedSize, setCartItems] = useState(props.size || "");
  const [sizeOptions, setSizeOptions] = useState([]);
  const openSize = Boolean(sizeanchorEl);

  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.quantity || "");
  const openQty = Boolean(qtyanchorEl);

  // Cargar tamaños disponibles desde la API
  useEffect(() => {
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        const sizeNames = res?.data?.map((item) => item.name);
        setSizeOptions(sizeNames);
      }
    });
  }, []);

  const handleClickSize = (event) => {
    setSizeAnchorEl(event.currentTarget);
  };
  const handleCloseSize = (value) => {
    setSizeAnchorEl(null);
    if (value !== null) {
      setCartItems(value);
    }
  };

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);
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
        <RiDeleteBin5Fill className="!absolute top-[-20px] right-[10px] cursor-pointer text-[25px] text-[#d67070] hover:!text-[#ce0202]  link transition-all" />
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
          {sizeOptions && sizeOptions?.length > 0 && (
            <>
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
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

          {props?.productRamsData && props?.productRamsData?.length > 0 && (
            <>
              <div className="relative">
                <span
                  className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] !py-1 !px-2 rounded-md cursor-pointer shadow-[1px_1px_3px_#274a72]"
                  onClick={handleClickQty}
                >
                  COLOR {selectedQty} <GoTriangleDown />
                </span>

                <Menu
                  id="qty-menu"
                  anchorEl={qtyanchorEl}
                  open={openQty}
                  onClose={() => handleCloseQty(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {props?.productRamsData?.map((ram, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={`${ram === selectedQty && "selected"}`}
                        onClick={() => handleCloseQty(ram)}
                      >
                        {ram}
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
