import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";

import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";

import { deleteImages, postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { GiSave } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";

const AddBlog = () => {
  const [formFields, setFormFields] = useState({
    title: "",
    images: [],
    description: "",
  });

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState("");
  const history = useNavigate();

  const context = useContext(MyContext);

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
        formFields.images = imageArr;
      }, 100);
    });
  };

  const onChangeDescription = (e) => {
    setHtml(e.target.value);
    formFields.description = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formFields);

    if (formFields.title === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA EL TITULO");
      setIsLoading(false);
      return false;
    }

    if (formFields.description === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA LA DESCRIPCIÓN");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.alertBox("error", "POR FAVOR SELECCIONE LA IMAGEN DEL BLOG");
      setIsLoading(false);
      return false;
    }

    postData("/api/blog/add", formFields).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });

        context?.getCat();
        history("/blog/list");
      }, 2000);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 !mb-3">
          <div className="col w-[100%] !mb-4">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              TÍTULO
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="title"
              value={formFields.title}
              onChange={onChangeInput}
            />
          </div>
          <div className="grid grid-cols-1 !mb-3 ">
            <div className="col w-[100%] ">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-2 ">
                DESCRIPCIÓN
              </h3>
              <Editor
                value={html}
                onChange={onChangeDescription}
                containerProps={{ style: { resize: "vertical" } }}
              />
            </div>
          </div>
        </div>

        <br />

        <h3 className="text-[#082c55] font-bold text-[18px] !mb-2">IMAGEN</h3>

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
            multiple={true}
            name="images"
            url="/api/blog/uploadImages"
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

export default AddBlog;
