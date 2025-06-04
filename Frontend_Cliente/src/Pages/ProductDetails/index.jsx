import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import QtyBox from "../../components/QtyBox";
import { GiShoppingCart } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import TextField from "@mui/material/TextField";

const ProductDetails = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);
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
            <h1 className="text-[24px] font-[bold] font-bold text-[#082c55] !mb-2">
              MÁQUINA DE COSER INDUSTRIAL DE COLUMNA ZOJE ZJ 9610SA-D3-M-3
              MÁQUINA DE COSER INDUSTRIAL
            </h1>
            <div className="flex items-center !gap-3">
              <span className="text-gray-500 text-[13px] ">
                MARCA :{" "}
                <span className="font-[500] text-black opacity-75 !ml-1">
                  MAQUINA SINGER
                </span>
              </span>

              <Rating
                name="size-small"
                defaultValue={4}
                size="small"
                readOnly
              />
              <span className="text-[13px] cursor-pointer">RESEÑAS (5)</span>
            </div>

            <div className="flex items-center !gap-4 !mt-4">
              <span className="oldPrice line-through text-[#b8b8b8] text-[20px] font-[500]">
                $69.00
              </span>
              <span className="price text-[#0a7fec] text-[20px] font-[600]">
                $99.00
              </span>

              <span className="text-[14px] ">
                DISPONIBLE EN STOCK :
                <span className="text-green-600 text-[14px] font-bold !ml-2">
                  1369 ARTICULOS
                </span>
              </span>
            </div>

            <p className="!mt-3 !pr-10 !mb-5 !text-[#000]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              quasi? Autem, quia, aliquam similique excepturi, quasi corrupti
              nisi ducimus impedit ullam officia tenetur voluptatem sapiente?
              Est enim minima iusto iste. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Officiis, quasi? Autem, quia, aliquam similique
              excepturi, quasi corrupti nisi ducimus impedit ullam officia
            </p>

            <div className="flex items-center !gap-3">
              <span className="text-[16px] font-[bold] font-bold">TALLA</span>
              <div className="flex items-center !gap-1 actions">
                <Button
                  className={`${
                    productActionIndex === 0 ? "!bg-[#274a72] !text-white" : ""
                  }`}
                  onClick={() => setProductActionIndex(0)}
                >
                  S
                </Button>
                <Button
                  className={`${
                    productActionIndex === 1 ? "!bg-[#274a72] !text-white" : ""
                  }`}
                  onClick={() => setProductActionIndex(1)}
                >
                  M
                </Button>
                <Button
                  className={`${
                    productActionIndex === 2 ? "!bg-[#274a72] !text-white" : ""
                  }`}
                  onClick={() => setProductActionIndex(2)}
                >
                  L
                </Button>
                <Button
                  className={`${
                    productActionIndex === 3 ? "!bg-[#274a72] !text-white" : ""
                  }`}
                  onClick={() => setProductActionIndex(3)}
                >
                  XL
                </Button>
              </div>
            </div>

            <p className="text-green-600 font-bold text-[14px] !mt-5 !mb-2">
              ENVIO GRATIS
              <span className="font-[bold] font-bold text-[#7994b1] !ml-2">
                ( VALIDO PARA LA CIUDAD DE QUITO )
              </span>
            </p>

            <div className="flex items-center !gap-4 !py-4">
              <div className="qtyBoxWrapper w-[70px]">
                <QtyBox />
              </div>

              <Button className="btn-org flex gap-2">
                AGREGAR
                <GiShoppingCart className="text-[25px] scale-x-[-1]" />
              </Button>
            </div>

            <div className="flex items-center !gap-4 !mt-4">
              <span className="flex items-center !gap-2 text-[14px] text-[#556f8d] font-bold link cursor-pointer">
                <FaHeart className="text-[18px] text-red-600 hover:scale-125 transition-transform duration-200" />
                AGREGAR A LISTA DE DESEOS
              </span>

              <span className="flex items-center !gap-2 text-[14px] text-[#556f8d] font-bold link cursor-pointer">
                <IoMdGitCompare className="text-[18px] text-[#274a72] hover:scale-125 transition-transform duration-200" />{" "}
                AGREGAR PARA COMPARAR
              </span>
            </div>
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
            <div className="shadow-md bg-gray-800 text-white w-[80%] rounded-md border border-[#b8b8b8] !p-5 !px-8 ">
              <div className="w-full productReviewsContainer">
                <h2 className="text-[18px]">
                  PREGUNTAS Y RESPUESTAS DE LOS CLIENTES
                </h2>

                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden !mt-5 !pr-5">
                  <div className="review border-b border-[#525252] !pt-5 !pb-3 w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center !gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full border-3 border-[#b8b8b8] ">
                        <img
                          src="https://imagenes.elpais.com/resizer/v2/5OOTMWE4IVI2PIVYKVRNC6OZ3E.jpg?auth=a4acafa9eff66f09290080f4267043c97b29fa04a7f031b75ab65ebad50d9a68&width=1200"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-[80%]">
                        <h4 className="text-[16px]">STEVE JOBS</h4>
                        <h5 className="text-[13px] !mb-0">2025-06-06</h5>
                        <p className="!mt-0 !mb-0 text-[#b8b8b8]">
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

                <div className="reviewForm bg-[#e6e6e6] text-[#274a72] !p-4 rounded-md">
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
      </section>
    </>
  );
};

export default ProductDetails;
