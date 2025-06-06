import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetails";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="!py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !font-[bold] !text-[#082c55] hover:!text-[#0a7fec]"
              sx={{ fontSize: "16px" }}
            >
              INICIO
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !font-[bold] !text-[#274a72] hover:!text-[#0a7fec]"
              sx={{ fontSize: "16px" }}
            >
              MAQUINAS
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className="link transition !font-[bold] !text-[#737475] hover:!text-[#0a7fec] !cursor-pointer"
              sx={{ fontSize: "16px" }}
            >
              MAQUINA DE COSER PORTATIL SINGER
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="!bg-white !py-5">
        <div className="container flex !gap-8 items-center">
          <div className="productZoomContainer !w-[40%] ">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%] !pr-10">
            <ProductDetailsComponent />
          </div>
        </div>

        <div className="container !pt-10">
          <div className="flex items-center !gap-8 !mb-5">
            <span
              className={`link text-[17px]   cursor-pointer font-[bold] font-bold ${
                activeTab === 0 && "!text-[#000]"
              }`}
              onClick={() => setActiveTab(0)}
            >
              DESCRIPCIÓN
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[bold] font-bold ${
                activeTab === 1 && "text-[#000]"
              }`}
              onClick={() => setActiveTab(1)}
            >
              DETALLES DEL PRODUCTO
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[bold] font-bold ${
                activeTab === 2 && "text-[#000]"
              }`}
              onClick={() => setActiveTab(2)}
            >
              RESEÑAS (5)
            </span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md bg-gray-800 text-white w-full !border-gray-950 !p-5 !px-8 ">
              <p className=" border-b border-[#525252] text-[#b8b8b8] !pb-3 !mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae hic, veritatis vel beatae velit, similique tenetur
                eius porro optio incidunt laborum explicabo? Unde qui commodi
                aperiam quo odit a alias.
              </p>

              <h4>DISEÑO LIGERO</h4>

              <p className=" border-b border-[#525252] text-[#b8b8b8] !pb-3 !mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae hic, veritatis vel beatae velit, similique tenetur
                eius porro optio incidunt laborum explicabo? Unde qui commodi
                aperiam quo odit a alias.
              </p>

              <h4>ENVÍO Y DEVOLUCIÓN GRATIS</h4>

              <p className=" border-b border-[#525252] text-[#b8b8b8] !pb-3 !mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae hic,
              </p>

              <h4>GARANTÍA DE DEVOLUCIÓN DE DINERO</h4>

              <p className=" border-b border-[#525252] text-[#b8b8b8] !pb-3 !mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae hic,
              </p>

              <h4>SOPORTE EN LÍNEA</h4>

              <p className=" border-b border-[#525252] text-[#b8b8b8] !pb-3 !mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae hic,
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full !py-5 !px-8 !border-1 !border-gray-500 !bg-gray-900 ">
              <div class="relative overflow-x-auto ">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                    <tr>
                      <th scope="col" class="!px-6 !py-3">
                        NOMBRE Y MEDIDA (SKU)
                      </th>
                      <th scope="col" class="!px-6 !py-3">
                        COLOR
                      </th>
                      <th scope="col" class="!px-6 !py-3">
                        CATEGORIA
                      </th>
                      <th scope="col" class="!px-6 !py-3">
                        PRECIO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class=" !px-6 !py-4 font-[500] text-white">
                        MAQUINA DE COSER INDUSTRIAL OVERLOCK ZOJE B9500-13"
                      </td>
                      <td class="!px-6 !py-4 font-[500]">SILVER</td>
                      <td class="!px-6 !py-4 font-[500]">INDUSTRIAL</td>
                      <td class="!px-6 !py-4 font-[500]">$990,00</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class=" !px-6 !py-4 font-[500] text-white">
                        MAQUINA DE COSER INDUSTRIAL OVERLOCK ZOJE B9500-13"
                      </td>
                      <td class="!px-6 !py-4 font-[500]">SILVER</td>
                      <td class="!px-6 !py-4 font-[500]">INDUSTRIAL</td>
                      <td class="!px-6 !py-4 font-[500]">$990,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-md bg-[#f7f7f7] !text-[#082c55] w-[80%] rounded-md border-1 border-[#082c55] !p-5 !px-8  ">
              <div className="w-full productReviewsContainer ">
                <h2 className="text-[18px] ">
                  PREGUNTAS Y RESPUESTAS DE LOS CLIENTES
                </h2>

                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !mt-5 !pr-5 ">
                  <div className="review border-b border-[#525252] !pt-5 !pb-3 w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center !gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#!text-[#082c55]] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#000]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Molestias quasi minus architecto neque quis
                          illum id
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="review border-b border-[#525252] !pt-5 !pb-3 w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center !gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#!text-[#082c55]] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#000]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Molestias quasi minus architecto neque quis
                          illum id
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                  <div className="review border-b border-[#525252] !pt-5 !pb-3 w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center !gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#!text-[#082c55]] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#000]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Molestias quasi minus architecto neque quis
                          illum id
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                </div>

                <br />

                <div className="reviewForm bg-[#e6e6e6] text-[#274a72] border-1 border-[#a8a8a8] !p-4 rounded-md">
                  <h2 className="text-[18px]">AÑADIR UNA RESEÑA</h2>

                  <form className="w-full !mt-5">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="ESCRIBE TU RESEÑA . . . . . . "
                      className="w-full bg-[white]"
                      multiline
                      rows={5}
                    />
                    <br /> <br />
                    <Rating name="size-small" defaultValue={4} />
                    <div className="flex items-center !mt-5">
                      <Button className="btn-org">ENVIAR RESEÑA</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container !pt-8">
          <h2 className="text-[20px] font-[600] !pb-0">
            PRODUCTOS RELACIONADOS
          </h2>
          <ProductsSlider items={6} />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
