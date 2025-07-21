import React from "react";
import { FaPhotoFilm } from "react-icons/fa6";

const UploadBox = (props) => {
  return (
    <div
      className="uploadBox !p-3 rounded-md overflow-hidden border border-[#082c55] h-[150px] w-[100%]
     bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative"
    >
      <FaPhotoFilm className="text-[50px] opacity-35 pointer-events-none" />
      <h4 className="text-[14px] text-[#082c55] pointer-events-none">
        CARGA DE IMAGEN
      </h4>

      <input
        type="file"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
      />
    </div>
  );
};

export default UploadBox;
