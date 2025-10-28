import React, { useContext, useEffect, useState } from "react";
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
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { GiSave } from "react-icons/gi";

const EditProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
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
  const [productRams, setProductRams] = React.useState([]);
  const [productWeight, setProductWeight] = React.useState([]);
  const [productSize, setProductSize] = React.useState([]);
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then(
      () => {
        console.log(context?.isOpenFullScreenPanel?.id);
      }
    );
  }, []);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };

  const handleChangeProductThirdLavelSubCat = (event) => {
    setProductThirdLavelCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };

  const selectSubCatByThirdLavel = (name) => {
    formFields.thirdsubCat = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;
    setProductRams(typeof value === "string" ? value.split(",") : value);

    formFields.productRam = value;
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);

    formFields.productWeight = value;
  };

  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);

    formFields.size = value;
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

  const onChangeRating = (e) => {
    setFormFields((formFields) => ({
      ...formFields,
      rating: e.target.value,
    }));
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

  const handleSubmitg = (e) => {
    e.preventDefault(0);

    if (formFields.name === "") {
      context.alertBox("error", "POR FAVOR INGRESE EL NOMBRE DEL PRODUCTO");
      return false;
    }
    if (formFields.description === "") {
      context.alertBox(
        "error",
        "POR FAVOR INGRESE LA DESCRIPCIÓN DEL PRODUCTO"
      );
      return false;
    }
    if (formFields.catId === "") {
      context.alertBox(
        "error",
        "POR FAVOR SELECCIONE LA CATEGORÍA DEL PRODUCTO"
      );
      return false;
    }

    if (formFields.subCatId === "") {
      context.alertBox(
        "error",
        "POR FAVOR SELECCIONE LA SUBCATEGORÍA DEL PRODUCTO"
      );
      return false;
    }

    if (formFields.thirdsubCatId === "") {
      context.alertBox(
        "error",
        "POR FAVOR SELECCIONE LA SUBCATEGORÍA DE TERCER NIVEL DEL PRODUCTO"
      );
      return false;
    }

    if (formFields.price === "") {
      context.alertBox("error", "POR FAVOR INGRESE EL PRECIO DEL PRODUCTO");
      return false;
    }

    if (formFields.oldPrice === "") {
      context.alertBox(
        "error",
        "POR FAVOR INGRESE EL PRECIO ANTERIOR DEL PRODUCTO"
      );
      return false;
    }

    if (formFields.countInStock === "") {
      context.alertBox("error", "POR FAVOR INGRESE EL STOCK DEL PRODUCTO");
      return false;
    }

    if (formFields.brand === "") {
      context.alertBox("error", "POR FAVOR INGRESE LA MARCA DEL PRODUCTO");
      return false;
    }

    if (formFields.discount === "") {
      context.alertBox("error", "POR FAVOR INGRESE DESCUENTO DEL PRODUCTO");
      return false;
    }

    if (formFields.rating === "") {
      context.alertBox("error", "POR FAVOR CALIFIQUE EL PRODUCTO");
      return false;
    }

    if (previews?.length === 0) {
      context.alertBox("error", "POR FAVOR SELECCIONE LA IMAGEN DEL PRODUCTO");
      return false;
    }

    setIsLoading(true);

    postData("/api/product/create", formFields).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", res?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.alertBox("error", res?.message);
      }
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form !py-3 !p-8" onSubmit={handleSubmitg}>
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
                CATEGORÍA
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
                  {context?.catData?.map((cat /*, index*/) => {
                    return (
                      <MenuItem
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
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
                  {context?.catData?.map((cat /*, index*/) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat /*, index*/) => {
                        return (
                          <MenuItem
                            value={subCat?._id}
                            onClick={() => selectSubCatByName(subCat?.name)}
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
                SUBCATEGORÍA DE TERCER NIVEL
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
                  {context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirdLavelCat, index) => {
                            return (
                              <MenuItem
                                value={thirdLavelCat?._id}
                                key={index}
                                onClick={() =>
                                  selectSubCatByThirdLavel(thirdLavelCat?.name)
                                }
                                className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                              >
                                {thirdLavelCat?.name}
                              </MenuItem>
                            );
                          })
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
                  value={true}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  VERDADDERO
                </MenuItem>
                <MenuItem
                  value={false}
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

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                COLOR
              </h3>
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productRams}
                label="Category"
                onChange={handleChangeProductRams}
              >
                <MenuItem
                  value={"NEGRO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  NEGRO
                </MenuItem>
                <MenuItem
                  value={"BLANCO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  BLANCO
                </MenuItem>

                <MenuItem
                  value={"AZUL"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  AZUL
                </MenuItem>
                <MenuItem
                  value={"VERDE"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  VERDE
                </MenuItem>
                <MenuItem
                  value={"AMARILLO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  AMARILLO
                </MenuItem>
                <MenuItem
                  value={"ROJO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  ROJO
                </MenuItem>
                <MenuItem
                  value={"MORADO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  MORADO
                </MenuItem>
                <MenuItem
                  value={"MARRON"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  MARRON
                </MenuItem>
                <MenuItem
                  value={"CELESTE"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  CELESTE
                </MenuItem>
                <MenuItem
                  value={"ROSADO"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  ROSADO
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                PESO
              </h3>
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productWeight}
                label="Category"
                onChange={handleChangeProductWeight}
              >
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
                <MenuItem
                  value={50}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  10 KG
                </MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                TAMAÑO
              </h3>
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
                value={productSize}
                label="Category"
                onChange={handleChangeProductSize}
              >
                <MenuItem
                  value={"1"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  1 METRO
                </MenuItem>
                <MenuItem
                  value={"5"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  5 METROS
                </MenuItem>
                <MenuItem
                  value={"10"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  10 METROS
                </MenuItem>
                <MenuItem
                  value={"20"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  20 METROS
                </MenuItem>
                <MenuItem
                  value={"Pequeña"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  Pequeña / Portátil: 38 × 18 × 28 cm
                </MenuItem>
                <MenuItem
                  value={"Mediana"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  Mediana / Estándar: 45 × 20 × 32 cm
                </MenuItem>
                <MenuItem
                  value={"Pequeña"}
                  className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-300"
                >
                  Grande / Industrial: 52 × 25 × 38 cm
                </MenuItem>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 !mb-3 !gap-4">
            <div className="col">
              <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
                CALIFICACIÓN
              </h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full !p-5 !px-0">
            <h3 className="font-bold text-[18px] text-[#082c55] !mb-3">
              IMAGENES Y MULTIMEDIA
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
                        <img src={image} className="w-100" />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>
        </div>

        <hr className="text-gray-500" />
        <br />
        <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <GiSave className="text-[25px] text-white" />
              PUBLICAR Y VER
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default EditProduct;
