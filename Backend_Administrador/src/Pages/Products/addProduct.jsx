import React, { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import { MyContext } from "../../App";

const AddProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });

  const [productCat, setProductCat] = React.useState("");
  const [productSubCat, setProductSubCat] = React.useState("");
  const [productFeatured, setProductFeatured] = React.useState("");
  const [productRams, setProductRams] = React.useState("");
  const [productWeight, setProductWeight] = React.useState("");
  const [productSize, setProductSize] = React.useState("");

  const context = useContext(MyContext);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
  };

  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form !py-3 !p-8 ">
        <div className="scroll max-h-[70vh] overflow-y-scroll !pr-4">
          <div className="grid grid-cols-1 !mb-3">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                NOMBRE DE PRODUCTO
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

          <div className="grid grid-cols-1 !mb-3">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                DESCRIPCION
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 !mb-3 !gap-4">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                CATEGORIA
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

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                SUB CATEGORIA
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
                  {context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem
                            value={subCat?._id}
                            className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                          >
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                PRECIO
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                PRECIO ANTERIOR
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 !mb-3 !gap-4">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                SE DESTACA ?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem
                  value={10}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  VERDADDERO
                </MenuItem>
                <MenuItem
                  value={20}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  FALSO
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                STOCK
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                MARCA
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                DESCUENTO
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 !mb-3 !gap-4">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                RAMS
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productRams}
                label="Category"
                onChange={handleChangeProductRams}
              >
                <MenuItem
                  value={"4 GB"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  4 GB
                </MenuItem>
                <MenuItem
                  value={"8 GB"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  8 GB
                </MenuItem>
                <MenuItem
                  value={"16 GB"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  16 GB
                </MenuItem>
                <MenuItem
                  value={"32 GB"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  32 GB
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                PESO
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productWeight}
                label="Category"
                onChange={handleChangeProductWeight}
              >
                <MenuItem
                  value={""}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  NINGUNO
                </MenuItem>
                <MenuItem
                  value={10}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  2 KG
                </MenuItem>
                <MenuItem
                  value={20}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  4 KG
                </MenuItem>
                <MenuItem
                  value={30}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  6 KG
                </MenuItem>
                <MenuItem
                  value={40}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  8 KG
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                TAMAÑO
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productSize}
                label="Category"
                onChange={handleChangeProductSize}
              >
                <MenuItem
                  value={""}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  NINGUNO
                </MenuItem>
                <MenuItem
                  value={"S"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  S
                </MenuItem>
                <MenuItem
                  value={"M"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  M
                </MenuItem>
                <MenuItem
                  value={"L"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  L
                </MenuItem>
                <MenuItem
                  value={"XL"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  XL
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                CALIFICACIÓN
              </h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>

          <div className="col w-full !p-5 !px-0">
            <h3 className="font-bold text-[18px] text-[#082c55] !mb-3">
              IMAGENES Y MULTIMEDIA
            </h3>
            <div className="grid grid-cols-7 !gap-2">
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
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
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
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
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
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
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
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
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
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
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span
                  className="!absolute w-[20px] h-[20px] rounded-full overflow-hidden !text-[#fff]  !bg-[#030712] hover:!text-[#030712] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#6b6c6d] hover:!shadow-[0px_0px_0px_3px_#030712]
              -top-[0x] -right-[0px] flex items-center justify-center z-50 cursor-pointer"
                >
                  <IoClose className="text-[20px]" />
                </span>
                <div
                  className="uploadBox !p-0 rounded-md overflow-hidden border  border-[#082c55] h-[150px] w-[100%]
               bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col "
                >
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src={"../../../imagenes/maquinas/maquina.jpg"}
                  />
                </div>
              </div>

              <UploadBox multiple={true} />
            </div>
          </div>
        </div>

        <hr className="text-gray-500" />
        <br />
        <Button type="button" className="btn-blue btn-lg w-full !gap-2">
          <FaFileUpload className="text-[25px] text-white" />
          PUBLICAR Y VER
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
