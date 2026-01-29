import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from "./EditSubCatBox";
import { BiPlusMedical } from "react-icons/bi";

export const SubCategoryList = () => {
  const [expandedCatId, setExpandedCatId] = useState(null);
  const context = useContext(MyContext);

  const toggleExpand = (index) => {
    setExpandedCatId((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 !bg-gray-700  !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700">
        <h2 className="text-white text-[18px] sm:text-[20px] !font-[500] mb-2 sm:mb-0  ">
          LISTA DE SUBCATEGORÍAS
        </h2>
        <div className="col flex items-center justify-start md:justify-end !gap-3">
          <Button
            className="btn btn-blue !gap-3"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVA SUBCATEGORÍA",
              })
            }
          >
            <BiPlusMedical />
            AÑADIR SUBCATEGORÍA
          </Button>
        </div>
      </div>
      <div className="card !my-4 !pt-5 !pb-5 !px-5 shadow-md sm:rounded-lg dark:bg-gray-700">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLavelCat, index) => {
              const isExpanded = expandedCatId === index;
              return (
                <li className="w-full !mb-1" key={index}>
                  <div
                    className="flex items-center w-full !p-2 bg-gray-950 rounded-sm !px-4 cursor-pointer transition-all"
                    onClick={() => toggleExpand(index)}
                  >
                    <span className="flex items-center text-white font-bold text-[20px] !gap-4">
                      {firstLavelCat?.name}
                    </span>

                    <Button className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto">
                      <FaAngleDown
                        className={`text-white transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {isExpanded && (
                    <>
                      {firstLavelCat?.children?.length !== 0 && (
                        <ul className="w-full !mt-1 pl-5 border-l border-gray-600 transition-all duration-300 ">
                          {firstLavelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full !py-1 " key={index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  id={subCat?._id}
                                  catData={context?.catData}
                                  index={index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatName={subCat?.parentCatName}
                                />

                                {subCat?.children?.length !== 0 && (
                                  <ul className="!pl-4 border-l border-gray-600  ">
                                    {subCat?.children?.map(
                                      (thirdLevel, index__) => {
                                        return (
                                          <li
                                            key={index__}
                                            className="w-full  hover:!bg-gray-800 rounded-sm transition-all duration-300"
                                          >
                                            <EditSubCatBox
                                              name={thirdLevel.name}
                                              catData={firstLavelCat?.children}
                                              index={index__}
                                              selectedCat={thirdLevel?.parentId}
                                              selectedCatName={
                                                thirdLevel?.parentCatName
                                              }
                                              id={thirdLevel?._id}
                                            />
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
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
