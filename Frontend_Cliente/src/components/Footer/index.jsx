import React, { useContext } from "react";
import { FcShipped } from "react-icons/fc";
import { FaCcVisa } from "react-icons/fa6";
import { GiLaptop } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import Button from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

import { IoCloseSharp } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel";
import { MyContext } from "../../App";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "../ProductZoom";
import ProductDetailsComponent from "../ProductDetails";
import AddAddress from "../../Pages/MyAccount/addAddress";

const Footer = () => {
  const context = useContext(MyContext);

  return (
    <>
      <footer className="!py-6 bg-[#eef0f3] border border-[#fff] shadow-[0_-4px_6px_-1px_#b1cdee,0_4px_6px_-1px_#b1cdee]">
        <div className="container">
          <div className="flex items-center justify-center !gap-2 !py-1 !pb-8">
            <div className="col flex items-center justify-center flex-col group w-[20%] text-center">
              <FcShipped className="text-[50px] text-[#38597e] transition-all duration-300 group-hover:text-[#0a7fec] group-hover:-translate-y-1" />
              <h3 className="text-[12px] font-[900] text-[#556f8d] !mt-1">
                ENVIO GRATIS
              </h3>
              <p className="!text-[10px] font-[500] text-[#6c8199] ">
                POR TODAS TUS ORDENES MAYORES A $100
              </p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-[20%] text-center">
              <GiLaptop className="text-[50px] text-[#5b5b5c] transition-all duration-300 group-hover:text-[#000] group-hover:-translate-y-1" />
              <h3 className="text-[12px] font-[900] text-[#556f8d] !mt-1">
                COMPRA EN LINEA
              </h3>
              <p className="!text-[10px] font-[500] text-[#6c8199]">
                RAPIDO, FACIL Y DESDE CUALQUIER LUGAR
              </p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-[20%] text-center">
              <FaCcVisa className="text-[50px] text-[#38597e] transition-all duration-300 group-hover:text-[#0a7fec] group-hover:-translate-y-1" />
              <h3 className="text-[12px] font-[900] text-[#556f8d] !mt-1">
                COMPRA CON TARJETA
              </h3>
              <p className="!text-[10px] font-[500] text-[#6c8199]">
                ACEPTAMOS CUALQUIER TARJETA DE CREDITO
              </p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-[20%] text-center">
              <FcMoneyTransfer className="text-[50px] text-[#38597e] transition-all duration-300 group-hover:text-[#0a7fec] group-hover:-translate-y-1" />
              <h3 className="text-[12px] font-[900] text-[#556f8d] !mt-1">
                COMPRA CON TARJETA
              </h3>
              <p className="!text-[10px] font-[500] text-[#6c8199]">
                ACEPTAMOS CUALQUIER TARJETA DE CREDITO
              </p>
            </div>

            <div className="col flex items-center justify-center flex-col group w-[20%] text-center">
              <MdCurrencyExchange className="text-[50px] text-[#5b5b5c] transition-all duration-300 group-hover:text-[#000] group-hover:-translate-y-1" />
              <h3 className="text-[12px] font-[900] text-[#556f8d] !mt-1">
                GARANTIA Y DEVOLUCIONES
              </h3>
              <p className="!text-[10px] font-[500] text-[#6c8199]">
                PROTECCION TOTAL EN TUS COMPRAS
              </p>
            </div>
          </div>

          <hr />

          <div className="footer flex !py-8">
            <div className="part1 w-[25%] border-r border-[#d3d7dd]">
              <h2 className="text-[20px] font-bold font-[bold] text-[#082c55] !mb-4">
                CONTACTANOS
              </h2>
              <p className="text-[14px] font-[bold] text-[#000] !pb-4">
                TURUBAMBA ALTO - CALLE MORO MORO
                <br />Y ALBERTO SPENCER CASA S26-182 QUITO
              </p>

              <Link
                className="link text-[17px] font-[400] text-[#082c55]"
                to="mailto:someone@example.com"
              >
                someone@example.com
              </Link>
              <span className="text-[22px] font-[bold] block w-full !mt-3 !mb-5 text-[#082c55]">
                (+593) 0968873896
              </span>

              <div className="flex items-center !gap-3">
                <IoMdChatboxes className="text-[40px] text-[#082c55]" />
                <span className="text-[17px] font-[600] text-[#082c55]">
                  CHAT EN LÍNEA <br />
                  OBTENGA AYUDA
                </span>
              </div>
            </div>

            <div className="part1 w-[40%] !flex !pl-8">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[20px] font-bold font-[bold] text-[#082c55] !mb-4">
                  PRODUCTOS
                </h2>
                <ul className="list">
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      NUEVOS
                    </button>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      RECOMENDADOS
                    </button>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      POPULARES
                    </button>
                  </li>

                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      OFERTAS
                    </button>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      MARCAS
                    </button>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      KITS DE COSTURA
                    </button>
                  </li>

                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <button className="link hover:text-[#0a7fec]">
                      ARTICULOS DE INTERES
                    </button>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      SOPORTE TECNICO
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="part2_col2 w-[50%]">
                <h2 className="text-[20px] font-bold font-[bold] text-[#082c55] !mb-4">
                  NUESTRA TIENDA
                </h2>
                <ul className="list">
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      ENVIOS A DOMICILIO
                    </Link>
                  </li>

                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      SEGUIMIENTO DE PEDIDOS
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      GARANTÍA
                    </Link>
                  </li>

                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      PAGO SEGURO
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      ULTIMAS NOTICIAS
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      ACERCA DE NOSOTROS
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link to="/" className="link">
                      CONTACTO
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link
                      to="/"
                      className="link"
                      onClick={() => (window.location.href = `Register`)}
                    >
                      REGISTRARSE
                    </Link>
                  </li>
                  <li className="list-none text-[14px] text-[#000] !mb-2">
                    <Link
                      to="/"
                      className="link"
                      onClick={() => (window.location.href = `Login`)}
                    >
                      INICIAR SESIÓN
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="part1 w-[35%] flex !pl-8 flex-col !pr-8">
              <h2 className="text-[18px] font-bold font-[bold] text-[#082c55] !mb-4">
                SUSCRIBETE
              </h2>
              <p className="text-[13px] text-[#082c55] font-[500]">
                ¡SUSCRÍBETE PARA RECIBIR OFERTAS EXCLUSIVAS, NOVEDADES Y MUCHO
                MÁS!
              </p>

              <form className="!mt-5">
                <input
                  type="text"
                  className="w-full !h-[45px] border border-[#38597e] outline-none !pl-4 !pr-4 !rounded-sm !mb-8  focus:!border-[#38597e]"
                  placeholder="TU CORREO"
                  style={{ boxShadow: "4px 4px 7px #38597e" }}
                />
                <Button className="btn-org">SUSCRIBETE</Button>
                <br />

                <FormControlLabel
                  control={<Checkbox />}
                  label="Acepta terminos y condiciones"
                  className="!mt-2 "
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t border-[0_-4px_6px_-1px_#b1cdee] shadow-[0_-4px_6px_-1px_#b1cdee,0_4px_6px_-1px_#b1cdee] !py-3 bg-[#eef0f3]">
        <div className="container flex items-center justify-between">
          <ul className="flex items-center !gap-3">
            <li className="list-none">
              <Link
                to="/"
                target="_black"
                classname="w-[35px] h-[35px] rounded-full border
                 border-[#38597e] flex items-center justify-center group 
                 hover:bg-[#38597e] transition-all "
              >
                <FaSquareFacebook className="text-[45px] text-[#082c55] group-hover:!text-[#38597e]" />
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/"
                target="_black"
                classname="w-[35px] h-[35px] rounded-full border
                 border-[#38597e] flex items-center justify-center group 
                 hover:bg-[#38597e] transition-all "
              >
                <FaYoutube className="text-[45px] text-[#082c55] group-hover:text-[#38597e]" />
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/"
                target="_black"
                classname="w-[35px] h-[35px] rounded-full border
                 border-[#38597e] flex items-center justify-center group 
                 hover:bg-[#38597e] transition-all "
              >
                <FaInstagramSquare className="text-[45px] text-[#082c55] group-hover:text-[#38597e]" />
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/"
                target="_black"
                classname="w-[35px] h-[35px] rounded-full border
                 border-[#38597e] flex items-center justify-center group 
                 hover:bg-[#38597e] transition-all "
              >
                <FaSquareXTwitter className="text-[45px] text-[#082c55] group-hover:text-[#38597e]" />
              </Link>
            </li>

            <li className="list-none">
              <Link
                to="/"
                target="_black"
                classname="w-[35px] h-[35px] rounded-full border
                 border-[#38597e] flex items-center justify-center group 
                 hover:bg-[#38597e] transition-all "
              >
                <AiFillTikTok className="text-[45px] text-[#082c55] group-hover:text-[#38597e]" />
              </Link>
            </li>
          </ul>
          <p className="text-[13px] text-[#000] text-center !mb-0">
            © 2026 - PUCKCODERS - Todos los derechos reservados
          </p>

          <div className="flex items-center !gap-1">
            <img
              src="https://w7.pngwing.com/pngs/424/169/png-transparent-credit-card-visa-electron-mastercard-credit-card-text-logo-banner.png"
              alt="image"
              className="w-[60px] h-[45px] object-cover"
            />

            <img
              src="https://w1.pngwing.com/pngs/191/339/png-transparent-visa-mastercard-logo-credit-card-yellow-text-line-area-circle.png"
              alt="image"
              className="w-[60px] h-[45px] object-cover"
            />

            <img
              src="https://springsummer.imgix.net/uploads/cardAmexGold.png?auto=compress%2Cformat&fit=clip&q=35&w=2600"
              alt="image"
              className="w-[60px] h-[45px] object-cover"
            />

            <img
              src="https://dce-documents.s3.amazonaws.com/s3fs-public/styles/max_650x650/public/2023-04/diners-club-miles-tarjeta_0.png.webp?itok=MkzjitVA"
              alt="image"
              className="w-[60px] h-[45px] object-cover"
            />

            <img
              src="https://periodismopublicoec.com/wp-content/uploads/2021/10/banco-pichincha.jpg"
              alt="image"
              className="w-[60px] h-[45px] object-cover"
            />
          </div>
        </div>
      </div>

      {/*Carrito con productos */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between !py-3 !px-4 !gap-3 border-b-2 border-[#d1d1d1] overflow-hidden">
          <h4 className="font-bold font-[bold] !text-[#082c55] !text-[20px]">
            CARRITO ({context?.cartData?.length})
          </h4>
          <IoCloseSharp
            className="!w-[20px] !h-[20px] !min-w-[20px] !rounded-full !text-[#fff] !absolute !top-[15px] !right-[15px] !bg-[#274a72] hover:!text-[#082c55] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#7994b1] hover:!shadow-[0px_0px_0px_3px_#082c55] cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>

        {context?.cartData?.length !== 0 ? (
          <CartPanel data={context?.cartData} />
        ) : (
          <>
            <div className="flex items-center justify-center flex-col !pt-[30px] !gap-1">
              <p className="!text-[#38597e] !text-[9px] !font-[600] !mb-1 !mt-4 !max-w-xs !p-0">
                ¡PARECE QUE AÚN NO HAS AGREGADO NADA! EXPLORA NUESTRAS
                CATEGORÍAS Y ENCUENTRA ESE PRODUCTO QUE TANTO DESEAS
              </p>

              <img
                src="../../../imagenes/empty-cart.png"
                className="w-[200px]"
              />
              <Button
                className="btn-org btn-sm"
                onClick={context.toggleCartPanel(false)}
              >
                CONTINUAR COMPRANDO
              </Button>

              <div className="!mt-6 text-sm ">
                <a
                  href="/favoritos"
                  className="text-blue-600 hover:text-blue-800 !mx-2"
                >
                  IR A MIS FAVORITOS
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="/vistos-recientemente"
                  className="text-blue-600 hover:text-blue-800 !mx-1"
                >
                  COMPARTIDOS
                </a>
              </div>
            </div>
          </>
        )}
      </Drawer>

      {/*Direccion panel */}
      <Drawer
        open={context.openAddressPanel}
        onClose={context.toggleAddressPanel(false)}
        anchor={"right"}
        className="addressPanel"
      >
        <div className="flex items-center justify-center !py-3 !px-4 !gap-3 border-b-2 border-[#d1d1d1] overflow-hidden ">
          <h4 className="font-bold font-[bold]  !text-[#082c55] !text-[20px]">
            {context?.addressMode === "add" ? "AÑADIR" : "EDITAR"} DIRECCIÓN DE
            ENTREGA
          </h4>
          <IoCloseSharp
            className="!w-[20px] !h-[20px] !min-w-[20px] !rounded-full !text-[#fff] !absolute !top-[10px] !right-[15px] !bg-[#274a72] hover:!text-[#082c55] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#7994b1] hover:!shadow-[0px_0px_0px_3px_#082c55] cursor-pointer"
            onClick={context.toggleAddressPanel(false)}
          />
        </div>
        <AddAddress />
      </Drawer>

      <Dialog
        open={context?.openProductDetailsModal.open}
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#fff] !absolute !top-[15px] !right-[15px] !bg-[#274a72] hover:!text-[#082c55] hover:!bg-[#fff] !shadow-[0px_0px_0px_3px_#7994b1] hover:!shadow-[0px_0px_0px_3px_#082c55]"
              onClick={context?.handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[25px]" />
            </Button>

            {context?.openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[40%] !px-3 !py-8">
                  <ProductZoom
                    images={context?.openProductDetailsModal?.item?.images}
                  />
                </div>

                <div className="col2 w-[60%] !py-8 !px-8 !pr-16 productContent">
                  <ProductDetailsComponent
                    item={context?.openProductDetailsModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
