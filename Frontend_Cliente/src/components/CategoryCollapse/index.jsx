import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbCopyPlusFilled } from "react-icons/tb";
import { TbCopyMinusFilled } from "react-icons/tb";
import { GiSewingMachine } from "react-icons/gi";
import { GiBoltSaw } from "react-icons/gi";

const CategoryCollapse = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };
  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="!w-full">
              <Button className="!w-full !text-[#fff] !bg-[#3c4a5a] !rounded-none !text-left !justify-start !px-3 ">
                MAQUINAS
              </Button>
            </Link>

            {submenuIndex === 0 ? (
              <TbCopyMinusFilled
                className="absolute !text-[#fff] top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            ) : (
              <TbCopyPlusFilled
                className="absolute !text-[#fff] top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(0)}
              />
            )}

            {submenuIndex === 0 && (
              <ul className="submenu w-full !pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[#274a72]">
                      MAQUINAS CASERAS
                    </Button>
                  </Link>
                  {innerSubmenuIndex === 0 ? (
                    <TbCopyMinusFilled
                      className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  ) : (
                    <TbCopyPlusFilled
                      className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(0)}
                    />
                  )}

                  {innerSubmenuIndex === 0 && (
                    <ul className="inner_submenu w-full !pl-3 ">
                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiSewingMachine className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiSewingMachine className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiSewingMachine className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiSewingMachine className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <hr className="text-[#fff]" />

          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="!w-full">
              <Button className="!w-full !text-[#fff] !bg-[#3c4a5a] !rounded-none !text-left !justify-start !px-3 ">
                CORTADORAS
              </Button>
            </Link>

            {submenuIndex === 1 ? (
              <TbCopyMinusFilled
                className="absolute text-[#fff] top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            ) : (
              <TbCopyPlusFilled
                className="absolute text-[#fff] top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubmenu(1)}
              />
            )}

            {submenuIndex === 1 && (
              <ul className="submenu w-full !pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[#274a72]">
                      MAQUINAS CASERAS
                    </Button>
                  </Link>
                  {innerSubmenuIndex === 1 ? (
                    <TbCopyMinusFilled
                      className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  ) : (
                    <TbCopyPlusFilled
                      className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubmenu(1)}
                    />
                  )}

                  {innerSubmenuIndex === 1 && (
                    <ul className="inner_submenu w-full !pl-3">
                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiBoltSaw className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiBoltSaw className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiBoltSaw className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>

                      <li className="list-none relative !mb-1">
                        <Link
                          to="/"
                          className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e]"
                        >
                          SINGER
                        </Link>
                        <GiBoltSaw className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
