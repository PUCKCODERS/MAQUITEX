import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";

const Checkout = () => {
  return (
    <section className="!py-5">
      <div className="container flex !gap-5">
        <div className="leftCol w-[70%]">
          <div className="card bg-white shadow-md !p-5 rounded-md w-full">
            <h1 className="font-bold font-[bold]">DATOS DE FACTURACIÓN</h1>

            <form className="w-full !mt-5">
              <div className="flex items-center !gap-5 !pb-5">
                <div className="col w-[50%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="NOMBRE Y APELLIDO"
                    variant="outlined"
                    size="small"
                  />
                </div>

                <div className="col w-[50%] shadow-md rounded-md">
                  <TextField
                    type="email"
                    className="w-full"
                    label="CORREO ELECTRÓNICO"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h6 className="font-bold font-[bold] !mb-3">DIRECCIÓN *</h6>

              <div className="flex items-center !gap-5 !pb-5">
                <div className="col w-[100%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="DIRECCIÓN"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center !gap-5 !pb-5">
                <div className="col w-[100%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="CALLE PRINCIPAL, SECUNDARIA Y NÚMERO DE CASA"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-center !gap-5 !pb-5 ">
                <div className="col w-[50%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="CIUDAD O CANTON "
                    variant="outlined"
                    size="small"
                  />
                </div>

                <div className="col w-[50%] shadow-md rounded-md">
                  <TextField
                    type="email"
                    className="w-full"
                    label="PROVINCIA"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <h6 className="font-bold font-[bold] !mb-3">
                CODIGO POSTAL / ZIP*
              </h6>

              <div className="flex items-center !gap-5 !pb-5 ">
                <div className="col w-[100%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="CODIGO POSTAL"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-center !gap-5 !pb-5 ">
                <div className="col w-[100%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="NUMERO CELULAR"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col w-[100%] shadow-md rounded-md">
                  <TextField
                    className="w-full"
                    label="NUMERO LOCAL"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="rightCol w-[30%]">
          <div className="card shadow-md bg-white !p-5 rounded-md">
            <h2 className="mb-4">TU ORDEN</h2>

            <div className="flex items-center justify-between !py-3 border-t border-b border-[#b8b8b8]">
              <span className="text-[14px] font-[600]">PRODUCTO</span>
              <span className="text-[14px] font-[600]">SUBTOTAL</span>
            </div>

            <div className="mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden !pr-2">
              <div className="flex items-center justify-between !py-2 border-b border-[#d1d1d1]">
                <div className="part1 flex items-center !gap-3">
                  <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                    <img
                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[10px]">MÁQUINA DE COSER INDUSTRIAL</h4>
                    <span className="text-[9px] ">CANT: 1</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0a7fec]">
                  $1,306.99
                </span>
              </div>

              <div className="flex items-center justify-between !py-2 border-b border-[#d1d1d1]">
                <div className="part1 flex items-center !gap-3">
                  <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                    <img
                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[10px]">MÁQUINA DE COSER INDUSTRIAL</h4>
                    <span className="text-[9px] ">CANT: 1</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0a7fec]">
                  $1,306.99
                </span>
              </div>

              <div className="flex items-center justify-between !py-2 border-b border-[#d1d1d1]">
                <div className="part1 flex items-center !gap-3">
                  <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                    <img
                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[10px]">MÁQUINA DE COSER INDUSTRIAL</h4>
                    <span className="text-[9px] ">CANT: 1</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0a7fec]">
                  $1,306.99
                </span>
              </div>

              <div className="flex items-center justify-between !py-2 border-b border-[#d1d1d1]">
                <div className="part1 flex items-center !gap-3">
                  <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer shadow-[2px_2px_3px_#082c55]">
                    <img
                      src="https://dcdn-us.mitiendanube.com/stores/937/060/products/whatsapp-image-2024-05-08-at-16-49-38-e8501bf0a251c9748817152035761232-1024-1024.jpeg"
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[10px]">MÁQUINA DE COSER INDUSTRIAL</h4>
                    <span className="text-[9px] ">CANT: 1</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0a7fec]">
                  $1,306.99
                </span>
              </div>
            </div>

            <Button className="btn-org btn-lg w-full flex !gap-2 items-center !mt-3">
              <IoBagCheck className="text-[25px]" />
              CONFIRMAR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
