import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import { deleteImages } from "../../utils/api";

const AddCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    setFormFields(() => ({
      ...previews,
      images: previewsArr,
    }));
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
      previews.splice(index, 1);
      imageArr.push(previews);
      setPreviews(imageArr);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form !py-3 !p-8 ">
        <div className="grid grid-cols-1 !mb-3">
          <div className="col w-[50%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              NOMBRE DE CATEGORÍA
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              onChange={onChangeInput}
            />
          </div>
        </div>

        <br />

        <h3 className="text-[#082c55] font-bold text-[18px] !mb-2">
          IMAGEN DE CATEGORÍA
        </h3>

        <div className="grid grid-cols-7 !gap-2">
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
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      alt={"image"}
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                      src={image}
                    />
                  </div>
                </div>
              );
            })}

          <UploadBox
            multiple={true}
            name="images"
            url="/api/category/uploadImages"
            setPreviewsFun={setPreviewsFun}
          />
        </div>

        <br />
        <div className="w-[325px]">
          <Button type="button" className="btn-blue btn-lg w-full !gap-2">
            <FaFileUpload className="text-[25px] text-white" />
            PUBLICAR Y VER
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
