import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbCopyPlusFilled } from "react-icons/tb";
import { TbCopyMinusFilled } from "react-icons/tb";
import { GiSewingMachine } from "react-icons/gi";
import { GiBoltSaw } from "react-icons/gi";

const CategoryCollapse = (props) => {
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
          <hr className="text-[#082c55]" />
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  className="list-none flex items-center relative flex-col"
                  key={index}
                >
                  <Link to="/" className="!w-full">
                    <Button className="!w-full !text-[#fff] !bg-[#3c4a5a]  !rounded-none !text-left !justify-start !px-3 ">
                      {cat?.name}
                    </Button>
                  </Link>

                  {submenuIndex === index ? (
                    <TbCopyMinusFilled
                      className="absolute !text-[#fff] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  ) : (
                    <TbCopyPlusFilled
                      className="absolute !text-[#fff] top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  )}

                  {submenuIndex === index && (
                    <ul className="submenu w-full !pl-3">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li className="list-none relative" key={index_}>
                              <Link to="/" className="w-full">
                                <Button className="w-full !text-left !justify-start !px-3 !text-[#274a72]">
                                  {subCat?.name}
                                </Button>
                              </Link>
                              {innerSubmenuIndex === index_ ? (
                                <TbCopyMinusFilled
                                  className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(index_)}
                                />
                              ) : (
                                <TbCopyPlusFilled
                                  className="absolute text-[#082c55] top-[10px] right-[15px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(index_)}
                                />
                              )}

                              {innerSubmenuIndex === index_ && (
                                <ul className="inner_submenu w-full !pl-3 ">
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map(
                                      (thirdLavelCat, index__) => {
                                        return (
                                          <li
                                            className="list-none relative !mb-1 hover:bg-[#e2e2e2]"
                                            key={index__}
                                          >
                                            <Link
                                              to="/"
                                              className="w-full !text-left !justify-start !px-3 transition text-[13px] !text-[#4a5b6e] "
                                            >
                                              {thirdLavelCat?.name}
                                            </Link>
                                            <GiSewingMachine className="absolute !text-[#000] !text-[25px] top-[-2px] right-[5px]" />
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}

          <hr className="text-[#082c55]" />
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
