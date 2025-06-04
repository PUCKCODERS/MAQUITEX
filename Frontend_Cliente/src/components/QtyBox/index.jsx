import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";

const QtyBox = () => {
  const [qtyVal, setQtyVal] = useState(1);

  const plusQty = () => {
    setQtyVal(qtyVal + 1);
  };

  const minusQty = () => {
    if (qtyVal === 1) {
      setQtyVal(1);
    } else {
      setQtyVal(qtyVal - 1);
    }
  };

  return (
    <div className="qtyBox flex items-center relative ">
      <input
        type="number"
        className="!w-full !h-[40px] !p-2 !pl-5 text-[15px] focus:outline-none border border-[#7994b1] rounded-md"
        value={qtyVal}
      />

      <div className="flex items-center flex-col justify-between !h-[40px] absolute !top-0 !right-0 !-50 ">
        <Button
          className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#274a72] !rounded-none !bg-[#274a72]"
          onClick={plusQty}
        >
          <FaAngleUp className="text-[14px] text-white" />
        </Button>
        <Button
          className="!min-w-[25px] !w-[25px] !h-[20px] !text-[#274a72] !rounded-none !bg-[#274a72]"
          onClick={minusQty}
        >
          <FaAngleDown className="text-[14px] text-white" />
        </Button>
      </div>
    </div>
  );
};

export default QtyBox;
