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
          <hr className="text-[#fff]" />
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  className="list-none flex items-center relative flex-col"
                  key={index}
                >
                  <Link
                    to={`/productListing?catId=${cat?._id}`}
                    className="!w-full"
                  >
                    <Button
                      className={`!w-full !text-[#082c55] ${
                        submenuIndex === index ? "!bg-white/90" : "!bg-white/20"
                      } hover:!bg-white/90 backdrop-blur-sm !rounded-none !text-left !font-bold !font-[bold] !justify-start !px-3 `}
                      onClick={() => openSubmenu(index)}
                    >
                      {cat?.name}
                    </Button>
                  </Link>

                  <div
                    className="absolute w-[30px] h-[30px] flex items-center justify-center !text-[#082c55]  top-[5px] right-[15px] cursor-pointer"
                    onClick={() => openSubmenu(index)}
                  >
                    {submenuIndex === index ? (
                      <TbCopyMinusFilled />
                    ) : (
                      <TbCopyPlusFilled />
                    )}
                  </div>

                  {submenuIndex === index && (
                    <ul className="submenu w-full ">
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li className="list-none relative" key={index_}>
                              <Link
                                to={`/productListing?subCatId=${subCat?._id}`}
                                className="w-full "
                              >
                                <Button
                                  className={`w-full !text-left !justify-start !font-bold !font-[bold] !px-6 !rounded-none !text-[#fff] ${
                                    innerSubmenuIndex === index_
                                      ? "!bg-[#082c55]"
                                      : "!bg-[#082c55]/50 "
                                  } hover:!bg-[#082c55] backdrop-blur-sm`}
                                  onClick={() => openInnerSubmenu(index_)}
                                >
                                  {subCat?.name}
                                </Button>
                              </Link>

                              <div
                                className="absolute w-[30px] h-[30px] flex items-center justify-center !text-[#fff] top-[5px] right-[15px] cursor-pointer"
                                onClick={() => openInnerSubmenu(index_)}
                              >
                                {innerSubmenuIndex === index_ ? (
                                  <TbCopyMinusFilled className="absolute text-[#fff] top-[5px] right-[15px] cursor-pointer" />
                                ) : (
                                  <TbCopyPlusFilled className="absolute text-[#fff] top-[5px] right-[15px] cursor-pointer" />
                                )}
                              </div>

                              {innerSubmenuIndex === index_ && (
                                <ul className="inner_submenu w-full ">
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map(
                                      (thirdLavelCat, index__) => {
                                        return (
                                          <li
                                            className="list-none relative   hover:!bg-white !text-[#fff] hover:!text-[#082c55] !py-1 !cursor-pointer"
                                            key={index__}
                                          >
                                            <Link
                                              to={`/productListing?thirdLavelCatId=${thirdLavelCat?._id}`}
                                              className="w-full !text-left !justify-start !px-9  transition !font-bold !font-[bold] text-[13px]  "
                                            >
                                              {thirdLavelCat?.name}
                                              <GiSewingMachine className="absolute !text-[25px] top-[-0px] right-[5px]" />
                                            </Link>
                                          </li>
                                        );
                                      },
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

          <hr className="text-[#fff]" />
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
