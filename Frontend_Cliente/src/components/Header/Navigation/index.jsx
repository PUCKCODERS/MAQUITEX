import Button from "@mui/material/Button";
import React, { useState } from "react";
import { ImMenu } from "react-icons/im";
import { RxTriangleDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaTruckFast } from "react-icons/fa6";
import CategoryPanel from "./CategoryPanel";
import "../Navigation/style.css";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../../App";
import MobileNav from "./mobileNav";

const Navigation = (props) => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

  useEffect(() => {
    setIsOpenCatPanel(props.isOpenCatPanel);
  }, [props.isOpenCatPanel]);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="!py-1 navigation">
        <div className="container flex items-center justify-start lg:justify-end gap-9">
          {context?.windowWidth > 992 && (
            <div className="col_1 !w-[20%] !mr-6">
              <Button
                className="!text-[#082c55]  !bg-[#f1f1f1] !gap-2 w-full shadow-[3px_3px_3px_#274a72]"
                onClick={openCategoryPanel}
              >
                <ImMenu className="text-[18px] !mb-1" />
                CATEGORÍAS
                <RxTriangleDown className="text-[18px] !mb-1 !ml-auto !font-bold !cursor-pointer" />
              </Button>
            </div>
          )}

          <div className="col_2 w-full flex items-center justify-center lg:w-[60%] ml-0 lg:ml-6">
            <ul className="flex items-center gap-0 nav">
              <li className="list-none ">
                {/*<Link to="/" className="link transition ">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    INICIO
                  </Button>
                </Link>*/}
              </li>

              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li
                      className="list-none !text-[#082c55] font-bold font-[bold] relative"
                      key={index}
                    >
                      <Link
                        to={`/productListing?catId=${cat?._id}`}
                        className="link transition"
                      >
                        <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                          {cat?.name}
                        </Button>
                      </Link>

                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute !border-1 !border-[#758ba5]  !top-[135%] !left-[0%] min-w-[200px]  !bg-white/10 hover:!bg-white/10 backdrop-blur-sm shadow-[3px_3px_3px_#274a72] opacity-0 transition-all z-10 ">
                          <ul>
                            {cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  className="list-none w-full relative"
                                  key={index_}
                                >
                                  <Link
                                    to={`/productListing?subCatId=${subCat?._id}`}
                                    className="w-full !mb-1"
                                  >
                                    <Button className="!text-[#082c55] hover:!text-[#fff] !font-bold !font-[bold] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>

                                    {subCat?.children?.length !== 0 && (
                                      <div className="submenu absolute !border-1 !border-[#758ba5] !top-[-5%] !left-[100%] min-w-[200px] !bg-white/30 !backdrop-blur-sm shadow-[3px_3px_3px_#274a72] opacity-0 transition-all">
                                        <ul>
                                          {subCat?.children?.map(
                                            (thirdLavelCat, index__) => {
                                              return (
                                                <li
                                                  className="list-none w-full"
                                                  key={index__}
                                                >
                                                  <Link
                                                    to={`/productListing?thirdLavelCatId=${thirdLavelCat?._id}`}
                                                    className="w-full"
                                                  >
                                                    <Button className="!text-[#082c55] hover:!text-[#fff] !bg-white/30 !backdrop-blur-sm  !font-bold !font-[bold] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                                      {thirdLavelCat?.name}
                                                    </Button>
                                                  </Link>
                                                </li>
                                              );
                                            },
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}

              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/s.tecnico" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    S.TECNICO
                  </Button>
                </Link>
              </li>

              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/nosotros" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    NOSOTROS
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/contacto" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    CONTACTO
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_3 w-[20%] hidden lg:block">
            <p className="!text-[10px] text-[#000] font-[600] flex items-center !gap-1 !mb-0 !mt-0">
              <FaTruckFast className="!text-[25px] text-[#000] !ml-6" />
              ENVIO GRATIS
            </p>
          </div>
        </div>
      </nav>

      {/*Componentes del panel de categoria*/}

      {catData?.length !== 0 && (
        <CategoryPanel
          isOpenCatPanel={isOpenCatPanel}
          setIsOpenCatPanel={setIsOpenCatPanel}
          propsSetIsOpenCatPanel={props.setIsOpenCatPanel}
          data={catData}
        />
      )}

      {context?.windowWidth < 992 && <MobileNav />}
    </>
  );
};

export default Navigation;
