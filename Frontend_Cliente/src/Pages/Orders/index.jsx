import React, { useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import Badge from "../../components/Badge";

const Orders = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  return (
    <section className="!py-5 w-full ">
      <div className="container flex !gap-5">
        <div className="col1 w-[25%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[75%] ">
          <div className="shadow-md rounded-md  bg-white">
            <div className="!py-2 !px-3 border-b border-[#d1d1d1] ">
              <h2 className="font-[bold] font-bold text-[20px]">MIS PEDIDOS</h2>
              <p className="!mt-2 !mb-2 text-[#000] font-[600]">
                ESTOS SON <span className="font-bold text-[#ec370a]"> 2 </span>
                PRODUCTOS DE TUS PEDIDOS
              </p>

              <div class="relative overflow-x-auto !mt-5  dark:!bg-gray-800">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                    <tr>
                      <th scope="col" class="!px-6 !py-3">
                        &nbsp;
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ID PEDIDO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ID PAGO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        NOMBRE
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CELULAR
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        DIRECCIÓN
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CÓDIGO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        PRECIO TOTAL
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        CORREO ELECTRONICO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ID USUARIO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        ESTADO PEDIDO
                      </th>
                      <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                        FECHA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="!px-6 !py-4 font-[700] text-white">
                        <Button
                          className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#274a72] hover:!text-[#fff] !bg-[#fff] hover:!bg-[#274a72] !shadow-[0px_0px_0px_3px_#7994b1] transition-all duration-300"
                          onClick={() => isShowOrderdProduct(0)}
                        >
                          {isOpenOrderdProduct === 0 ? (
                            <FaAnglesUp className="text-[20px]" />
                          ) : (
                            <FaAnglesDown className="text-[20px]" />
                          )}
                        </Button>
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">
                        <span className="text-white">SILVER</span>
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">
                        <span className="text-white">SILVER</span>
                      </td>
                      <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                        SILVER SILVER
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">0968873896</td>
                      <td class="!px-6 !py-4 font-[500] ">
                        <span className="text-[#bfc3cc] block w-[400px]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquam, possimus quis neque sunt molestias
                          illum dolor adipisci assumenda laboriosam impedit?
                        </span>
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">0316</td>
                      <td class="!px-6 !py-4 font-[500] ">$369,99</td>
                      <td class="!px-6 !py-4 font-[500] ">
                        jlc.rodriguez316@hotmail.com
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">
                        <span className="text-white">SILVER</span>
                      </td>
                      <td class="!px-6 !py-4 font-[500] ">
                        <Badge status="ENTREGADO" />
                      </td>
                      <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                        07 / 05 / 2025
                      </td>
                    </tr>

                    {isOpenOrderdProduct === 0 && (
                      <tr>
                        <td className="dark:bg-gray-800 !pl-20" colSpan="6">
                          <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                                <tr>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    ID PRODUCTO
                                  </th>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    NOMBRE PRODUCTO
                                  </th>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    IMAGEN
                                  </th>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    CANTIDAD
                                  </th>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    PRECIO
                                  </th>
                                  <th
                                    scope="col"
                                    className="!px-6 !py-3 whitespace-nowrap"
                                  >
                                    SUB TOTAL
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <span className="text-white">SILVER</span>
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <span className="text-white">SILVER</span>
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <img
                                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                      className="w-[40px] h-[40px] object-cover rounded-md"
                                    />
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                                    6
                                  </td>
                                  <td class="!px-6 !py-4 font-[500]">
                                    0968873896
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    $369.99
                                  </td>
                                </tr>

                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <span className="text-white">SILVER</span>
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <span className="text-white">SILVER</span>
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    <img
                                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                                      className="w-[40px] h-[40px] object-cover rounded-md"
                                    />
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] whitespace-nowrap">
                                    6
                                  </td>
                                  <td class="!px-6 !py-4 font-[500]">
                                    0968873896
                                  </td>
                                  <td class="!px-6 !py-4 font-[500] ">
                                    $369.99
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
