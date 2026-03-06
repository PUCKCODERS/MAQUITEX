import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";

const QtyBox = (props) => {
  const [qtyVal, setQtyVal] = useState(1);

  const plusQty = () => {
    setQtyVal(qtyVal + 1);
    props.handleSelecteQty(qtyVal + 1);
  };

  const minusQty = () => {
    if (qtyVal === 1) {
      setQtyVal(1);
      props.handleSelecteQty(1);
    } else {
      setQtyVal(qtyVal - 1);
      props.handleSelecteQty(qtyVal - 1);
    }
  };

  return (
    <div className="qtyBox flex items-center border border-[#7994b1] rounded-md overflow-hidden">
      <input
        type="number"
        className="!w-full !h-[40px] text-center text-[15px] focus:outline-none"
        value={qtyVal}
        readOnly
      />

      <div className="flex items-center flex-col">
        <Button
          className="!min-w-[25px] !w-[25px] !h-[20px] !rounded-none !bg-[#274a72] !text-white"
          onClick={plusQty}
        >
          <FaAngleUp className="text-[14px]" />
        </Button>
        <Button
          className="!min-w-[25px] !w-[25px] !h-[20px] !rounded-none !bg-[#274a72] !text-white"
          onClick={minusQty}
        >
          <FaAngleDown className="text-[14px]" />
        </Button>
      </div>
    </div>
  );
};

export default QtyBox;
