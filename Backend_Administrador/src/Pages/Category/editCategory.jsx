import React, { useContext, useEffect, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import { deleteImages, editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { GiSave } from "react-icons/gi";

const EditCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      formFields.name = res?.category?.name;
      setPreviews(res?.category?.images);
    });
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });

    formFields.images = previews;
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?img=${image}`).then(() => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        /* formFields.images = previewsArr;*/
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox(
        "error",
        "POR FAVOR INTRODUZCA EL NOMBRE DE LA CATEGORIA",
      );
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.alertBox(
        "error",
        "POR FAVOR SELECCIONE LA IMAGEN DE LA CATEGORIA",
      );
      setIsLoading(false);
      return false;
    }

    console.log(formFields);

    editData(
      `/api/category/${context?.isOpenFullScreenPanel?.id}`,
      formFields,
    ).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      }, 2000);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh]  pr-1 md:pr-4 pt-4">
          <div className="grid grid-cols-1 !mb-3">
            <div className="col w-full sm:w-[50%]">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
                NOMBRE DE CATEGORÍA
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>

        <h3 className="text-[#082c55] font-bold text-[14px] !mb-2 !mt-5">
          IMAGEN DE CATEGORÍA
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-7 !gap-2 ">
          {previews?.length !== 0 &&
            previews?.map((image, index) => {
              return (
                <div className="uploadBoxWrapper  relative" key={index}>
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
            multiple={true}
            name="images"
            url="/api/category/uploadImages"
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

export default EditCategory;
