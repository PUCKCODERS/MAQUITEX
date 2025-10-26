import { Button, CircularProgress, Dialog, DialogTitle } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { deleteData, editData } from "../../utils/api";
import { FcDeleteDatabase } from "react-icons/fc";

export const EditSubCatBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);

  const context = useContext(MyContext);

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentId = props?.selectedCat;
    formFields.parentCatName = props?.selectedCatName;
    setSelectVal(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectVal;
    setSelectVal(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChange = (event) => {
    setSelectVal(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.alertBox("ERROR", "EL NOMBRE NO PUEDE ESTAR VACÍO");
      return false;
    }

    editData(`/api/category/${props?.id}`, formFields).then((res) => {
      setTimeout(() => {
        context.alertBox("success", res?.message);
        context?.getCat();
        setIsLoading(false);
      }, 1000);
    });
  };

  const deleteCat = (id) => {
    setCatToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (catToDelete) {
      deleteData(`/api/category/${catToDelete}`).then(() => {
        context?.getCat();
        context.alertBox("success", "Categoría eliminada correctamente");
        setIsConfirmOpen(false);
        setCatToDelete(null);
      });
    }
  };

  return (
    <>
      <form
        className="!w-full flex items-center !gap-3 !p-0 !px-4 border-1 border-[#fff] rounded-sm !py-1"
        onSubmit={handleSubmit}
      >
        {editMode === true && (
          <>
            <div className="flex items-center justify-between !py-2 !gap-4">
              <div className="w-[150px]">
                <Select
                  style={{ zoom: "75%" }}
                  className="w-full border !text-[20px] border-[#fff] !text-[#fff] focus:!outline-none focus:!border-[#fff] rounded-sm !p-1 text-sm"
                  size="small"
                  value={selectVal}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "arial-label": "Without Label" }}
                >
                  {props?.catData?.length !== 0 &&
                    props?.catData?.map((item, index) => {
                      return (
                        <MenuItem
                          value={item?._id}
                          key={index}
                          onClick={() => {
                            formFields.parentCatName = item?.name;
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <input
                type="text"
                className="w-full border !text-[20px] border-[#fff] !text-[#fff] focus:!outline-none focus:!border-[#fff] rounded-sm !p-1 text-sm"
                name="name"
                value={formFields?.name}
                onChange={onChangeInput}
              />

              <div className="flex items-center !gap-2">
                <Button
                  size="small"
                  className="btn-sm hover:!bg-[#082c55]"
                  type="submit"
                  variant="contained"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>GUARDAR</>
                  )}
                </Button>
                <Button
                  size="small"
                  className="btn-sm !bg-red-950"
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                >
                  CANCELAR
                </Button>
              </div>
            </div>
          </>
        )}

        {editMode === false && (
          <>
            <span className="font-bold text-[16px] !text-[#fff]">
              {props?.name}
            </span>
            <div className="flex items-center ml-auto !gap-2">
              <Button
                className="!-[35px] !h-[35px] !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <GrEdit className="!text-[20px]" />
              </Button>
              <Button
                className="!-[35px] !h-[35px] !border-1 !border-white !min-w-[35px] !bg-gray-600 !rounded-full hover:!bg-white !text-white hover:!text-gray-600"
                onClick={() => deleteCat(props?.id)}
              >
                <FaTrashAlt className="!text-[20px]" />
              </Button>
            </div>
          </>
        )}
      </form>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            width: "!360px",
          },
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <FcDeleteDatabase className="text-[120px] !mb-2" />
          <DialogTitle
            className="!text-[20px] text-[#082c55] !font-bold !pb-1 !text-center"
            sx={{ lineHeight: 1.2 }}
          >
            ¿DESEA ELIMINAR ESTA SUBCATEGORÍA ?
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

export default EditSubCatBox;
