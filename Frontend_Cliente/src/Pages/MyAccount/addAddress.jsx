import React, { useContext, useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../../App";

import TextField from "@mui/material/TextField";

import { GiSave } from "react-icons/gi";
import { Button, FormControlLabel } from "@mui/material";
import { editData, fetchDataFromApi, postData } from "../../utils/api";

import CircularProgress from "@mui/material/CircularProgress";

const AddAddress = () => {
  const context = useContext(MyContext);

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [mode, setMode] = useState("add");
  const [isOpenModel, setisOpenModel] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [address, setAddress] = useState([]);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: context?.userData?._id,
    addressType: "",
    landmark: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formFields.userId) {
      context.alertBox("error", "USUARIO NO VALIDO");
      return;
    }

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

    if (formFields.landmark === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA UNA REFERENCIA");
      return false;
    }

    if (formFields.addressType === "") {
      context.alertBox("error", "POR FAVOR ESCOJA EL TIPO DE DIRECCIÓN");
      return false;
    }

    if (mode === "add") {
      setIsLoading(true);
      postData(`/api/address/add`, formFields, {
        withCredentials: true,
      }).then((res) => {
        if (res?.error !== true) {
          context.alertBox("success", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            context?.toggleAddressPanel(false);
            // resetForm();
          }, 500);

          context.getUserDetails();

          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: context?.userData?._id,
            addressType: "",
            landmark: "",
          });
          setAddressType("");
          setPhone("");
        } else {
          context.alertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    }

    if (mode === "edit") {
      setIsLoading(true);
      editData(`/api/address/${addressId}`, formFields, {
        withCredentials: true,
      }).then(() => {
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context.toggleAddressPanel(false);
            //resetForm();
          }, 500);
          setAddress(res.data);
          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: context?.userData?._id,
            addressType: "",
            landmark: "",
          });
          setAddressType("");
          setPhone("");
        });
      });
    }
  };

  const editAddress = (id) => {
    setMode("edit");
    setisOpenModel(true);

    if (!formFields.userId) {
      context.alertBox("error", "USUARIO NO VALIDO");
      return;
    }

    setAddressId(id);

    fetchDataFromApi(`/api/address/${id}`).then((res) => {
      setFormFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?._id,
        addressType: res?.address?.addressType,
        landmark: res?.address?.landmark,
      });
      const ph = `"${res?.address?.mobile}"`;
      setPhone(ph);
      setAddressType(res?.address?.addressType);
    });
  };

  return (
    <form className="!p-8 !py-3 !pb-8 !px-4" onSubmit={handleSubmit}>
      <div className="col w-[100%] shadow-md rounded-md !mb-4">
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

      <div className="col w-[100%] shadow-md rounded-md !mb-4">
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

      <div className="col w-[100%] shadow-md rounded-md !mb-4">
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

      <div className="col w-[100%] shadow-md rounded-md !mb-4">
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
      <div className="col w-[100%] shadow-md rounded-md !mb-4">
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

      <div className=" col w-[100%] shadow-md rounded-md !mb-4">
        <PhoneInput
          defaultCountry="ec"
          value={phone}
          disabled={isLoading === true ? true : false}
          onChange={(phone) => {
            setPhone(phone);
            setFormFields((prevState) => ({
              ...prevState,
              mobile: phone,
            }));
          }}
        />
      </div>
      <div className="col w-[100%] shadow-md rounded-md !mb-4">
        <TextField
          className="w-full"
          label="REFERENCIA"
          variant="outlined"
          size="small"
          name="landmark"
          onChange={onChangeInput}
          value={formFields.landmark}
        />
      </div>
      <div className="flex !gap-5 !pb-5 flex-col">
        <h6 className="text-[13px] !mb-0">TIPO DE DIRECCIÓN</h6>
        <div className="col shadow-md rounded-md">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={addressType}
            onChange={handleChangeAddressType}
          >
            <FormControlLabel value="CASA" control={<Radio />} label="CASA" />
            <FormControlLabel
              value="TRABAJO"
              control={<Radio />}
              label="TRABAJO"
            />
          </RadioGroup>
        </div>
      </div>

      <div className="flex items-center !gap-5">
        <Button
          type="submit"
          className=" hover:!text-[#fff] btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
        >
          <GiSave className="text-[25px] " />
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            "GUARDAR"
          )}
        </Button>
        {/*<Button
          className=" hover:!text-[#fff] !bg-[#5c5c5c] hover:!bg-[#000] btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
          onClick={handleClose}
        >
          <ImCancelCircle className="text-[25px] " />
          CANCELAR
        </Button>*/}
      </div>
    </form>
  );
};

export default AddAddress;
