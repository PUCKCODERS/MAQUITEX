import React from "react";

const Progress = (props) => {
  return (
    <div className="w-[100px] !h-auto overflow-hidden rounded-md bg-gray-100">
      <span
        className={`flex items-center w-[${props.value}%] h-[8px] ${
          props.type === "success" && "bg-gray-500"
        } ${props.type === "error" && "bg-orange-400"} ${
          props.type === "warning" && "bg-red-500"
        }`}
      ></span>
    </div>
  );
};

export default Progress;
