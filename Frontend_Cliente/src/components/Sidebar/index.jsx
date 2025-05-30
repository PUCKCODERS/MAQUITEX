import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { Collapse } from "react-collapse";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";

const Sidebar = () => {
  const [isOpenedCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenedAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenedSizeFilter, setIsOpenSizeFilter] = useState(true);

  return (
    <aside className="sidebar !py-5 ">
      <div className="box">
        <h3 className="!w-full !mb-3 text-[12px] font-[bold] font-bold flex items-center !pr-2 text-[#082c55]">
          FILTRAR POR CATEGORIA
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#082c55]"
            onClick={() => setIsOpenCategoryFilter(!isOpenedCategoryFilter)}
          >
            {isOpenedCategoryFilter === true ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
          </Button>
        </h3>
        <Collapse isOpened={isOpenedCategoryFilter}>
          <div className="scroll !px-5 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="MAQUINAS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="CORTE"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="PLANCHADO"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="ACCESORIOS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="REPUESTOS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="OFERTAS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="NOSOTROS"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="CONTACTO"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box !mt-3">
        <h3 className="!w-full !mb-3 text-[15px] font-[bold] flex items-center !pr-2 text-[#082c55]">
          DISPONIBILIDAD
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#082c55]"
            onClick={() => setIsOpenAvailFilter(!isOpenedAvailFilter)}
          >
            {isOpenedAvailFilter === true ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
          </Button>
        </h3>
        <Collapse isOpened={isOpenedAvailFilter}>
          <div className="scroll !px-4 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="DISPONIBILIDAD (1237)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="EN STOCK (1290)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="NO DISPONIBILIDAD (369)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box !mt-3">
        <h3 className="w-full !mb-3 text-[15px] font-[bold] flex items-center !pr-2 text-[#082c55]">
          TAMAÑO
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#082c55]"
            onClick={() => setIsOpenSizeFilter(!isOpenedSizeFilter)}
          >
            {isOpenedSizeFilter === true ? (
              <VscTriangleUp />
            ) : (
              <VscTriangleDown />
            )}
          </Button>
        </h3>
        <Collapse isOpened={isOpenedSizeFilter}>
          <div className="scroll !px-5 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="GRANDE (33)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="MEDIANO (33)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="PEQUEÑO (33)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box !mt-4">
        <h3 className="w-full !mb-3 text-[15px] font-[bold] flex items-center !pr-5 text-[#556f8d]">
          FILTRAR POR PRECIO
        </h3>

        <RangeSlider />
        <div className="flex !pt-4 !pb-2 priceRange">
          <span className="!ml-auto text-[13px] flex items-center justify-between !gap-2">
            From: <strong className="!text-dark">$: {100}</strong>
          </span>
          <span className="!ml-auto text-[13px] flex items-center justify-between !gap-2">
            From: <strong className="!text-dark">$: {999}</strong>
          </span>
        </div>
      </div>

      <div className="box !mt-4">
        <h3 className="w-full !mb-3 text-[14px] font-[bold] flex items-center !pr-5 text-[#556f8d]">
          FILTAR POR CALIFICACION
        </h3>
        <div className="w-full !cursor-pointer">
          <Rating name="size-small" defaultValue={5} size="small" readOnly />
        </div>
        <div className="w-full !cursor-pointer">
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
        </div>
        <div className="w-full !cursor-pointer">
          <Rating name="size-small" defaultValue={3} size="small" readOnly />
        </div>
        <div className="w-full !cursor-pointer">
          <Rating name="size-small" defaultValue={2} size="small" readOnly />
        </div>
        <div className="w-full !cursor-pointer">
          <Rating name="size-small" defaultValue={1} size="small" readOnly />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
