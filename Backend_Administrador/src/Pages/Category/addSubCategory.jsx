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

const AddSubCategory = () => {
  const [productCat, setProductCat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
  });

  const context = useContext(MyContext);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formFields);

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA CATEGORÍA PRINCIPAL");
      setIsLoading(false);
      return false;
    }

    if (productCat === "") {
      context.alertBox("error", "POR FAVOR SELECCIONE LA CATEGORÍA PRINCIPAL");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then(() => {
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
      <form className="form !py-3 !p-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 !mb-3 !gap-5">
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
                <FaFileUpload className="text-[25px] text-white" />
                PUBLICAR Y VER
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
