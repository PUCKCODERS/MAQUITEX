import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MyContext } from "../../App";
import { deleteImages, postData } from "../../utils/api";
import UploadBox from "../../Components/UploadBox";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GiSave } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const AddBannerV1 = () => {
  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    subCatId: "",
    thirdsubCatId: "",
    price: "",
    alignInfo: "",
  });

  const [previews, setPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = React.useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [alignInfo, setAlignInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLavelCat("");
    setFormFields((fields) => ({
      ...fields,
      catId: event.target.value,
      subCatId: "",
      thirdsubCatId: "",
    }));
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductThirdLavelCat("");
    setFormFields((fields) => ({
      ...fields,
      subCatId: event.target.value,
      thirdsubCatId: "",
    }));
  };

  const handleChangeProductThirdLavelSubCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    setFormFields((fields) => ({
      ...fields,
      thirdsubCatId: event.target.value,
    }));
  };

  const handleChangeAlignInfo = (event) => {
    setAlignInfo(event.target.value);
    formFields.alignInfo = event.target.value;
  };

  const setPreviewsFun = (previewsArr) => {
    const newArr = [...previews, ...previewsArr];
    setPreviews(newArr);
    setFormFields((formFields) => ({
      ...formFields,
      images: newArr,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formFields);

    if (formFields.bannerTitle === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA EL NOMBRE DEL BANNER");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.alertBox("error", "POR FAVOR SELECCIONE LA IMAGEN DEL BANNER");
      setIsLoading(false);
      return false;
    }

    postData("/api/bannerV1/add", formFields).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });

        context?.getCat();
        history("/bannerV1/list");
      }, 2000);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 !mb-3 !gap-2">
          <div className="col mb-4 sm:mb-0">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              NOMBRE DE BANNER
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="bannerTitle"
              value={formFields.bannerTitle}
              onChange={onChangeInput}
            />
          </div>

          <div className="col mb-4 sm:mb-0">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              CATEGORÍA DE BANNER
            </h3>
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={cat?._id}
                      className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                    >
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col mb-4 sm:mb-0">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              SUBCATEGORÍA
            </h3>

            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData
                  ?.find((cat) => cat._id === productCat)
                  ?.children?.map((subCat, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={subCat?._id}
                        className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                      >
                        {subCat?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          </div>

          <div className="col mb-4 sm:mb-0">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              SUBCATEGORÍA TERCER NIVEL
            </h3>

            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productThirdLavelCat}
                label="Sub Category"
                onChange={handleChangeProductThirdLavelSubCat}
              >
                {context?.catData
                  ?.find((cat) => cat._id === productCat)
                  ?.children?.find((subCat) => subCat._id === productSubCat)
                  ?.children?.map((thirdLavelCat, index) => {
                    return (
                      <MenuItem
                        value={thirdLavelCat?._id}
                        key={index}
                        className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                      >
                        {thirdLavelCat?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          </div>

          <div className="col mb-4 sm:mb-0">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              ALINEAR INFORMACIÓN
            </h3>

            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={alignInfo}
                label="Sub Category"
                onChange={handleChangeAlignInfo}
              >
                <MenuItem
                  value={"left"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  IZQUIEDA
                </MenuItem>
                <MenuItem
                  value={"right"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  DERECHA
                </MenuItem>
              </Select>
            )}
          </div>
        </div>

        <br />

        <h3 className="text-[#082c55] font-bold text-[18px] !mb-2">
          IMAGEN DE CATEGORÍA
        </h3>

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
            url="/api/bannerV1/uploadImages"
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

export default AddBannerV1;
