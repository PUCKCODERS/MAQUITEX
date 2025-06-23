import React from "react";

const Badge = (props) => {
  return (
    <span
      className={`inline-block !py-1 !px-4 rounded-full text-[12px] capitalize ${
        props.status === "PENDIENTE" && "bg-gray-600 text-white"
      } ${props.status === "ENTREGADO" && "bg-gray-600 text-white"} ${
        props.status === "COMFIRMADO" && "bg-gray-600 text-white"
      }`}
    >
      {props.status}
    </span>
  );
};

export default Badge;
