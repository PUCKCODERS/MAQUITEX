import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";
import { GiSave } from "react-icons/gi";

const AddSubCategory = () => {
  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(MyContext);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };

  const selecteCatFun = (catName) => {
    formFields.parentCatName = catName;
  };

  const selecteCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = productCat;
    setProductCat(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;

    const catId = productCat2;
    setProductCat2(catId);

    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA CATEGORÍA PRINCIPAL");
      setIsLoading(false);
      return false;
    }

    if (productCat === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA SUBCATEGORÍA");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
      }, 2000);
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (formFields2.name === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA CATEGORÍA PRINCIPAL");
      setIsLoading2(false);
      return false;
    }

    if (productCat2 === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA SUBCATEGORÍA");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then(() => {
      setTimeout(() => {
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
      }, 2000);
    });
  };

  return (
    <section className="!p-5 !bg-gray-200 grid grid-cols-2 !gap-10">
      <form className="form !py-3 !p-8" onSubmit={handleSubmit}>
        <h4 className="text-[#000] font-bold text-[25px] !mb-3">
          AGREGAR SUBCATEGORÍA
        </h4>
        <div className="grid grid-cols-2 !mb-3 !gap-5">
          <div className="col">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
              CATEGORÍA PRINCIPAL
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              size="small"
              className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
              value={productCat}
              label="Category"
              onChange={handleChangeProductCat}
            >
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item?._id}
                      onClick={selecteCatFun(item?.name)}
                      className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-100"
                    >
                      {item?.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>

          <div className="col">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
              NOMBRE DE SUBCATEGORÍA
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

        <br />

        <br />
        <div className="w-[325px]">
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

      <form className="form !py-3 !p-8" onSubmit={handleSubmit2}>
        <h4 className="text-[#000] font-bold text-[25px] !mb-3">
          AGREGAR CATEGORÍA DE TERCER NIVEL
        </h4>
        <div className="grid grid-cols-2 !mb-3 !gap-5">
          <div className="col">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
              SUBCATEGORÍA
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              size="small"
              className="w-full shadow-[3px_3px_3px_#082c55] !font-bold !font-[bold] !bg-[#f1f1f1]"
              value={productCat2}
              label="Category"
              onChange={handleChangeProductCat2}
            >
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item /*, index*/) => {
                  return (
                    item?.children?.length !== 0 &&
                    item?.children?.map((item2, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item2?._id}
                          onClick={selecteCatFun2(item2?.name)}
                          className="!font-bold !font-[bold] !text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55] transition-all duration-100"
                        >
                          {item2?.name}
                        </MenuItem>
                      );
                    })
                  );
                })}
            </Select>
          </div>

          <div className="col">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-1">
              NOMBRE DE TERCER NIVEL
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="name"
              value={formFields2.name}
              onChange={onChangeInput2}
            />
          </div>
        </div>

        <br />

        <br />
        <div className="w-[325px]">
          <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
            {isLoading2 === true ? (
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

export default AddSubCategory;
