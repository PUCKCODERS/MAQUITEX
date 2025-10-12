import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaFileUpload } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = React.useState(false);
  const context = useContext(MyContext);

  const [formFields, setFormsFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: context?.userData?._id,
  });

  useEffect(() => {
    setFormsFields((prevState) => ({
      ...prevState,
      userId: formFields.userId,
    }));
  }, [context?.userData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormsFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU DIRECCIÓN");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CIUDAD");
      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU PROVINCIA");
      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CÓDIGO POSTAL");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU PAÍS");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU PAÍS");
      return false;
    }
    if (phone === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NÚMERO DE TELÉFONO");
      return false;
    }

    console.log(formFields);

    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.data?.message);

        context?.setIsOpenFullScreenPanel({
          open: false,
        });
      } else {
        context.alertBox("error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="!p-5 !bg-gray-200">
      <form className="form !py-3 !p-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 !mb-3 !gap-4">
          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              DIRECCIÓN
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="address_line1"
              onChange={onChangeInput}
              value={formFields.address_line1}
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              CIUDAD
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="city"
              onChange={onChangeInput}
              value={formFields.city}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 !mb-3 !gap-4">
          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              PROVINCIA
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="state"
              onChange={onChangeInput}
              value={formFields.state}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">PAÍS</h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="country"
              onChange={onChangeInput}
              value={formFields.country}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              CÓDIGO POSTAL
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-gray-400 focus:outline-none focus:border-[#082c55] rounded-sm !p-3 text-sm shadow-[3px_3px_3px_#082c55] !bg-[#f1f1f1]"
              name="pincode"
              onChange={onChangeInput}
              value={formFields.pincode}
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              NÚMERO DE TELÉFONO
            </h3>
            <PhoneInput
              defaultCountry="ec"
              value={phone}
              disabled={isLoading === true ? true : false}
              onChange={(phone) => {
                setPhone(phone);
                {
                  setFormsFields((prevState) => ({
                    ...prevState,
                    mobile: phone,
                  }));
                }
              }}
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[#082c55] font-bold text-[14px] !mb-2">
              ESTADO
            </h3>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={status}
              onChange={handleChangeStatus}
              size="small"
              className="w-full !text-[#082c55] !font-bold"
            >
              <MenuItem
                className="!text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55]"
                value={10}
              >
                VERDADERO
              </MenuItem>
              <MenuItem
                className="!text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55]"
                value={20}
              >
                FALSO
              </MenuItem>
            </Select>
          </div>
        </div>

        <br />
        <div className="w-[325px]">
          <Button type="submit" className="btn-blue btn-lg w-full !gap-2">
            <FaFileUpload className="text-[25px] text-white" />
            PUBLICAR Y VER
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddAddress;
