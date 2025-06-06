import Button from "@mui/material/Button";
import React, { useState } from "react";
import { ImMenu } from "react-icons/im";
import { RxTriangleDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaTruckFast } from "react-icons/fa6";
import CategoryPanel from "./CategoryPanel";
import "../Navigation/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="!py-1 ">
        <div className="container flex items-center justify-end gap-9">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-[#082c55]  !bg-[#f1f1f1] !gap-2 w-full shadow-[3px_3px_3px_#274a72]"
              onClick={openCategoryPanel}
            >
              <ImMenu className="text-[18px] !mb-1" />
              CATEGORÍAS{" "}
              <RxTriangleDown className="text-[18px] !mb-1 !ml-auto !font-bold !cursor-pointer" />
            </Button>
          </div>

          <div className="col_2 w-[60%] !mr-3">
            <ul className="flex items-center gap-0 nav">
              <li className="list-none ">
                <Link to="/" className="link transition ">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    INICIO
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold] relative">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    MAQUINAS
                  </Button>
                </Link>

                <div className="submenu absolute !top-[135%] !left-[0%] min-w-[200px] bg-[#ebebeb] shadow-[3px_3px_3px_#274a72] opacity-0 transition-all z-10">
                  <ul>
                    <li className="list-none w-full relative ">
                      <Link to="/" className="w-full">
                        <Button className="!text-[#082c55] hover:!text-[#fff] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                          SINGER
                        </Button>

                        <div className="submenu absolute !top-[0%] !left-[100%] min-w-[200px] bg-white shadow-[3px_3px_3px_#274a72] opacity-0 transition-all">
                          <ul>
                            <li className="list-none w-full">
                              <Link to="/" className="w-full">
                                <Button className="!text-[#082c55] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                  SINGER
                                </Button>
                              </Link>
                            </li>

                            <li className="list-none w-full">
                              <Link to="/" className="w-full">
                                <Button className="hover:!text-[#fff] !bg-[#fff] hover:!bg-[#082c55] !text-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                  SINGER
                                </Button>
                              </Link>
                            </li>

                            <li className="list-none w-full">
                              <Link to="/" className="w-full">
                                <Button className="!text-[#082c55] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                  SINGER
                                </Button>
                              </Link>
                            </li>

                            <li className="list-none w-full">
                              <Link to="/" className="w-full">
                                <Button className="!text-[#082c55] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                  SINGER
                                </Button>
                              </Link>
                            </li>

                            <li className="list-none w-full">
                              <Link to="/" className="w-full">
                                <Button className="!text-[#082c55] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                                  SINGER
                                </Button>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="hover:!text-[#fff]  hover:!bg-[#082c55] !text-[#082c55] !w-full !text-left !justify-start !rounded-none">
                          SINGER
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[#082c55] hover:!text-[#fff]  hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                          SINGER
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[#082c55] hover:!text-[#fff]  hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                          SINGER
                        </Button>
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[#082c55] hover:!text-[#fff]  hover:!bg-[#082c55] !w-full !text-left !justify-start !rounded-none">
                          SINGER
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    CORTE
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    PLANCHADO
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    ACCESORIOS
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    REPUESTOS
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    NOSOTROS
                  </Button>
                </Link>
              </li>
              <li className="list-none !text-[#082c55] font-bold font-[bold]">
                <Link to="/" className="link transition">
                  <Button className="link !transition-all !duration-300 !text-[12px] !text-[#082c55] !bg-[transparent] !font-bold !font-[bold] hover:!text-[#fff] hover:!bg-[#082c55] !py-1">
                    CONTACTO
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_3 w-[20%] !ml-3">
            <p className="text-[13px] text-[#000] font-[600] flex items-center !gap-2 !mb-0 !mt-0">
              <FaTruckFast className="text-[30px] text-[#000] !ml-6" />
              ENVIO GRATIS
            </p>
          </div>
        </div>
      </nav>

      {/*Componentes del panel de categoria*/}
      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
