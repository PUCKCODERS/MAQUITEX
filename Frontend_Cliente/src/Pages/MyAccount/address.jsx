import React, { useContext, useState, useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../../App";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import { GiSave } from "react-icons/gi";
import { Button, FormControlLabel } from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import { FaTrashAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FcDeleteDatabase } from "react-icons/fc"; // 🔹 AGREGADO ÍCONO NUEVO

const label = { inputProps: { "aria-label": "Radio demo" } };

const Address = () => {
  const context = useContext(MyContext);
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");
  //const [status, setStatus] = useState(false);
  const [isOpenModel, setisOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [addressType, setAddressType] = useState("");

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    addressType: "",
    landmark: "",
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormFields((prevState) => ({
        ...prevState,
        userId: context?.userData?._id,
      }));
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

  /*const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };*/

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return { ...formFields, [name]: value };
    });
  };

  const removeAddress = (id) => {
    setAddressToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      deleteData(`/api/address/${addressToDelete}`).then(() => {
        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {
          setAddress(res.data);
          setIsConfirmOpen(false);
          setAddressToDelete(null);
          context.alertBox("success", "DIRECCIÓN ELIMINADA CORRECTAMENTE");
        });
      });
    }
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

    if (formFields.landmark === "") {
      context.alertBox("error", "POR FAVOR INTRODUZCA UNA REFERENCIA");
      return false;
    }

    if (formFields.addressType === "") {
      context.alertBox("error", "POR FAVOR ESCOJA EL TIPO DE DIRECCIÓN");
      return false;
    }

    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message);
        setisOpenModel(false);

        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        ).then((res) => {
          setAddress(res.data);
        });
      } else {
        context.alertBox("error", res?.message);
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
                  address?.map((address, index) => {
                    return (
                      <>
                        <div className="group relative addressBox w-full flex items-center justify-center border-1 border-[#bdbdbd] bg-[#f1f1f1] !p-3 rounded-md cursor-pointer shadow-[3px_3px_3px_#000]">
                          <label className="!mr-auto">
                            <Radio
                              key={index}
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

                          <span
                            onClick={() => removeAddress(address?._id)}
                            className="hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full border-1 
                          hover:bg-[#082c55] text-[#082c55] hover:text-white z-50 !ml-auto transition-all "
                          >
                            <FaTrashAlt />
                          </span>
                        </div>
                      </>
                    );
                  })}
              </div>

              <hr className="!text-[#b8b8b8]" />
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            width: "360px",
          },
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <FcDeleteDatabase className="text-[120px] !mb-2" />
          <DialogTitle
            className="!text-[20px] text-[#082c55] !font-bold !pb-1 !text-center"
            sx={{ lineHeight: 1.2 }}
          >
            ¿DESEA ELIMINAR ESTA DIRECCIÓN Y SUS DATOS ?
          </DialogTitle>
          <p className="text-gray-800 text-[16px] !mb-4">
            ESTA ACCIÓN NO SE PUEDE DESHACER
          </p>
        </div>
        <div className="flex justify-center !gap-3 !pb-2">
          <Button
            onClick={confirmDelete}
            className="!bg-[#1976d2] hover:!bg-[#0d47a1] !text-white !font-bold !px-4 !py-2"
          >
            Sí, eliminar
          </Button>
          <Button
            onClick={() => setIsConfirmOpen(false)}
            className="!bg-[#d32f2f] hover:!bg-[#9a0007] !text-white !font-bold !px-4 !py-2"
          >
            Cancelar
          </Button>
        </div>
      </Dialog>

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
          </div>
          <div className="flex items-center !gap-5 !pb-5">
            <div className="col w-[50%] shadow-md rounded-md">
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
            <div className="col w-[50%] shadow-md rounded-md">
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
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="CASA"
                />
                <FormControlLabel
                  value="Work"
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
              GUARDAR
            </Button>
            <Button
              className=" hover:!text-[#fff] !bg-[#5c5c5c] hover:!bg-[#000] btn-org btn-lg w-full flex !gap-2 items-center !mt-3"
              onClick={handleClose}
            >
              <ImCancelCircle className="text-[25px] " />
              CANCELAR
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
