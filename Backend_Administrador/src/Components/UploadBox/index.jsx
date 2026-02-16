import React, { useContext, useState } from "react";
import { FaPhotoFilm } from "react-icons/fa6";
import { MyContext } from "../../App";
import { uploadImages } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  //const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      //setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          (files[i] &&
            (files[i].type === "image/jpeg" ||
              files[i].type === "image/png" ||
              files[i].type === "image/jpg")) ||
          files[i].type === "image/webp"
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append(props?.name, file);
        } else {
          context.alertBox(
            "error",
            "Por favor, seleccione un archivo de imagen válido en formato JPG, JPEG, WEBP o PNG.",
          );
          setUploading(false);
          return false;
        }
      }

      uploadImages(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        //props.setPreviews(res?.data?.images);
        props.setPreviewsFun(res?.data?.images);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="uploadBox !p-3 rounded-md overflow-hidden border border-[#082c55] h-[150px] w-[100%]
     bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative"
    >
      {uploading === true ? (
        <>
          <CircularProgress />
          <h4 className="text-center">CARGANDO.....</h4>
        </>
      ) : (
        <>
          <div>
            <FaPhotoFilm className="text-[50px] opacity-35 pointer-events-none" />
            <h4 className="text-[14px] text-[#082c55] pointer-events-none">
              CARGA DE IMAGEN
            </h4>

            <input
              type="file"
              accept="image/*"
              multiple={props.multiple !== undefined ? props.multiple : false}
              className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
              onChange={(e) => onChangeFile(e, props?.url)}
              name={props?.name}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadBox;
