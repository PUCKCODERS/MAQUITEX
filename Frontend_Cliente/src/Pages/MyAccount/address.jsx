import React, { useContext, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import Radio from "@mui/material/Radio";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../../App";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { GiSave } from "react-icons/gi";
import { Button } from "@mui/material";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useEffect } from "react";

const label = { inputProps: { "aria-label": "Radio demo" } };

const Address = () => {
  const context = useContext(MyContext);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [isOpenModel, setisOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormsFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
    selected: false,
  });

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormsFields((prevState) => ({
        ...prevState,
        userId: context?.userData?._id,
      }));

      console.log(context?.userData?._id);
    }
  }, [context?.userData]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
        setAddress(res.data);
      });
    }
  }, [context?.userData]);

  const handleClose = () => {
    setisOpenModel(false);
  };

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

    alert();
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

    if (formFields.country === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU PAÍS");
      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU CÓDIGO POSTAL");
      return false;
    }

    if (phone === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA SU NÚMERO DE TELÉFONO");
      return false;
    }

    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.data?.message);

        setisOpenModel(false);

        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {});
      } else {
        context.alertBox("error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <section className="!py-5 w-full">
        <div className="container flex !gap-5">
          <div className="col1 w-[25%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-[60%]">
            <div className="card bg-white !p-5 shadow-md rounded-md !mb-5">
              <div className="flex items-center !pb-3">
                <h2 className="!pb-0 font-bold font-[bold] text-[20px]">
                  DIRECCIÓN
                </h2>
              </div>

              <div
                className="flex items-center justify-center !p-5 rounded-md border  border-[#082c55] bg-[#526b86] hover:bg-[#082c55] text-[#fff] hover:text-[#fff] !mt-5 cursor-pointer "
                onClick={() => setisOpenModel(true)}
              >
                <span className="text-[16px]  font-[500]">
                  AÑADIR DIRECCIÓN
                </span>
              </div>

              <div className="flex !gap-2 flex-col !mt-4">
                {address?.length > 0 &&
                  address?.map((address /*index*/) => {
                    return (
                      <>
                        <label className="addressBox w-full flex items-center justify-center border-1 border-[#bdbdbd] bg-[#f1f1f1] !p-3 rounded-md cursor-pointer shadow-[3px_3px_3px_#000]">
                          <Radio
                            {...label}
                            name="address"
                            checked={selectedValue === address?._id}
                            value={address?._id}
                            onChange={handleChange}
                          />
                          <span className="text-[12px]">
                            {address?.address_line1 +
                              " " +
                              address?.city +
                              " " +
                              address?.country +
                              " " +
                              address?.state +
                              " " +
                              address?.pincode}
                          </span>
                        </label>
                      </>
                    );
                  })}
              </div>

              <hr className="!text-[#b8b8b8]" />
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle className="text-[#082c55] !text-[25px] font-[bold]">
          AGREGAR DIRECCIÓN
        </DialogTitle>
        <form className="!p-8 !py-3 !pb-8" onSubmit={handleSubmit}>
          <div className="flex items-center !gap-5 !pb-5">
            <div className="col w-[100%] shadow-md rounded-md">
              <TextField
                className="w-full"
                label="DIRECCIÓN"
                variant="outlined"
                size="small"
                name="address_line1"
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>
          </div>
          <div className="flex items-center !gap-5 !pb-5">
            <div className="col w-[50%] shadow-md rounded-md">
              <TextField
                className="w-full"
                label="CIUDAD"
                variant="outlined"
                size="small"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>
            <div className="col w-[50%] shadow-md rounded-md">
              <TextField
                className="w-full"
                label="PROVINCIA"
                variant="outlined"
                size="small"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>
          </div>
          <div className="flex items-center !gap-5 !pb-5">
            <div className="col w-[50%] shadow-md rounded-md">
              <TextField
                className="w-full"
                label="PAÍS"
                variant="outlined"
                size="small"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
            <div className="col w-[50%] shadow-md rounded-md">
              <TextField
                className="w-full"
                label="CÓDIGO POSTAL"
                variant="outlined"
                size="small"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>
            {console.log(formFields)}
          </div>
          <div className="flex items-center !gap-5 !pb-5">
            <div className="col w-[50%] shadow-md rounded-md">
              <PhoneInput
                defaultCountry="ec"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormsFields((prevState) => ({
                    ...prevState,
                    mobile: phone,
                  }));
                }}
              />
            </div>
            <div className="col w-[50%] shadow-md rounded-md">
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full !text-[#082c55] !font-bold"
              >
                <MenuItem
                  className="!text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55]"
                  value={true}
                >
                  VERDADERO
                </MenuItem>
                <MenuItem
                  className="!text-[#082c55] !bg-[#fff] hover:!text-[#fff] hover:!bg-[#082c55]"
                  value={false}
                >
                  FALSO
                </MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex items-center !gap-5">
            <Button
              type="submit"
              className=" hover:!text-[#fff] btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
            >
              <GiSave className="text-[25px] " />
              GUARDAR
            </Button>
            <Button
              className=" hover:!text-[#fff] !bg-[#5c5c5c] hover:!bg-[#000] btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
              onClick={handleClose}
            >
              <GiSave className="text-[25px] " />
              CANCELAR
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
