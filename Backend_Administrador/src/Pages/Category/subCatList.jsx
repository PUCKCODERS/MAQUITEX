import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from "./EditSubCatBox";

export const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(MyContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <>
      <div className="flex !bg-gray-700 items-center justify-between !px-5 !py-5 !mt-3 sm:rounded-lg border-b dark:border-gray-700">
        <h2 className="text-white text-[20px] !font-[500] ">
          LISTA DE SUBCATEGORÍAS
          <span className="font-[400] text-[14px] !ml-3">
            (MATERIAL UI DESCRIPCION)
          </span>
        </h2>

        <div className="col !w-[45%] !ml-auto flex items-center justify-end !gap-3">
          <Button
            className="btn btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "NUEVA SUBCATEGORÍA",
              })
            }
          >
            AÑADIR NUEVA SUBCATEGORÍA
          </Button>
        </div>
      </div>

      <div className="card !my-4 !pt-5 !pb-5 !px-5 shadow-md sm:rounded-lg dark:bg-gray-700">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLavelCat, index) => {
              return (
                <li className="w-full !mb-1 " key={index}>
                  <div className="flex items-center w-full !p-2 bg-gray-950 rounded-sm !px-4">
                    <span className="flex items-center text-white font-bold text-[20px] !gap-4">
                      {firstLavelCat?.name}
                    </span>

                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown className="text-white" />
                    </Button>
                  </div>

                  {isOpen === index && (
                    <>
                      {firstLavelCat?.children?.length !== 0 && (
                        <ul className="w-full !mt-1 ">
                          {firstLavelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full !py-1" key={index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  id={subCat?._id}
                                  catData={context?.catData}
                                  index={index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatName={subCat?.parentCatName}
                                />

                                {subCat?.children?.length !== 0 && (
                                  <ul className="!pl-4">
                                    {subCat?.children?.map(
                                      (thirdLevel, index__) => {
                                        return (
                                          <li
                                            key={index__}
                                            className="w-full hover:bg-[f1f1f1]"
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
                                      }
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
