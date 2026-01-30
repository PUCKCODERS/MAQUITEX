import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { GiSave } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const AddHomeSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const history = useNavigate();

  const setPreviewsFun = (previewsArr) => {
    const imgArr = [...previews];
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }

    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr);
      setFormFields((prev) => ({ ...prev, images: imgArr }));
    }, 10);
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/homeSlides/deleteImage?img=${image}`).then(() => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (previews?.length === 0) {
      context.alertBox(
        "error",
        "POR FAVOR SELECCIONE LA IMAGEN DE LA DIAPOSITIVA",
      );
      setIsLoading(false);
      return false;
    }

    postData("/api/homeSlides/add", formFields).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });

        history("/homeSlider/list");
      }, 2000);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-7 !gap-2">
          {previews?.length !== 0 &&
            previews?.map((image, index) => {
              return (
                <div className="uploadBoxWrapper relative" key={index}>
                  <span
                    className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
                          -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => removeImg(image, index)}
                  >
                    <IoClose className="text-[20px]" />
                  </span>

                  <div
                    className="uploadBox !p-0 rounded-md overflow-hidden border border-[#082c55] h-[150px] w-[100%]
                           bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col "
                  >
                    <img src={image} className="w-100" />
                  </div>
                </div>
              );
            })}

          <UploadBox
            multiple={false}
            name="images"
            url="/api/homeSlides/uploadImages"
            setPreviewsFun={setPreviewsFun}
          />
        </div>

        <br />
        <div className="w-[250px] sm:w-[325px]">
          <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <GiSave className="text-[25px] text-white" />
                CREAR Y PUBLICAR
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHomeSlide;
