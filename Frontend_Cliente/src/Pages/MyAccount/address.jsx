import React, { useContext, useState, useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar";

import "react-international-phone/style.css";
import { MyContext } from "../../App";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Button } from "@mui/material";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { FcDeleteDatabase } from "react-icons/fc";
import AddressBox from "./addressBox";

//const label = { inputProps: { "aria-label": "Radio demo" } };

const Address = () => {
  const context = useContext(MyContext);
  const [address, setAddress] = useState([]);
  {
    /*const [phone, setPhone] = useState("");
  const [isOpenModel, setisOpenModel] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [mode, setMode] = useState("add");
  const [addressId, setAddressId] = useState("");*/
  }
  {
    /*const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    addressType: "",
    landmark: "",
  });*/
  }
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  //const handleChange = (event) => {
  //setSelectedValue(event.target.value);
  //};

  {
    /* const resetForm = () => {
    setMode("add");
    setAddressId("");
    setAddressType("");
    setPhone("");
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
  };*/
  }

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setAddress(context?.userData?.address_details);
    }
  }, [context?.userData]);

  {
    /* const handleClose = () => {
    resetForm();
    setisOpenModel(false);
  };
*/
  }
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
                onClick={
                  //resetForm()
                  () => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }
                }
              >
                <span className="text-[16px]  font-[500]">
                  AÑADIR DIRECCIÓN
                </span>
              </div>

              <div className="flex !gap-2 flex-col !mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <AddressBox
                        address={address}
                        key={index}
                        removeAddress={removeAddress}
                      />
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
    </>
  );
};

export default Address;
