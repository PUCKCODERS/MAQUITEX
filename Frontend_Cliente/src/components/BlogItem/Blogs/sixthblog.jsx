import React from "react";
import { Link } from "react-router-dom";
import { MdAccountBalance } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Placeholder images - Reemplaza estas URLs con tus imágenes reales cuando las tengas
const AboutImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NsHNUVodY7xXTRu9n4Yd_CId8iwS236QOg&s";
const PenalImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NsHNUVodY7xXTRu9n4Yd_CId8iwS236QOg&s";

// Datos de ejemplo para el slider
const projects = [
  {
    id: 1,
    name: "Máquinas Domésticas",
    desc: "Ideales para empezar en casa y proyectos personales.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NsHNUVodY7xXTRu9n4Yd_CId8iwS236QOg&s",
  },
  {
    id: 2,
    name: "Máquinas Industriales",
    desc: "Potencia y velocidad para producción a gran escala.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NsHNUVodY7xXTRu9n4Yd_CId8iwS236QOg&s",
  },
  {
    id: 3,
    name: "Repuestos y Accesorios",
    desc: "Todo lo que necesitas para mantener tu equipo al día.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NsHNUVodY7xXTRu9n4Yd_CId8iwS236QOg&s",
  },
];

const sixthblog = () => {
  return (
    <div className="blog-page bg-white">
      {/* Section 1: Introduction */}
      <div className="container !py-10 lg:!py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-3/5">
            <p className="text-[18px] lg:text-[22px] mb-4 font-semibold text-gray-700">
              DESCUBRE EL MUNDO DE LA{" "}
              <span className="bg-black text-white px-2 py-1 rounded-md">
                COSTURA CREATIVA
              </span>
            </p>
            <h2 className="text-[28px] lg:text-[40px] font-bold mb-6 text-[#082c55] leading-tight">
              GUÍA PARA ELEGIR TU PRIMERA MÁQUINA DE COSER
            </h2>
            <div className="text-gray-600 text-justify text-[14px] lg:text-[16px] leading-relaxed">
              <p className="mb-4">
                EMPEZAR EN EL MUNDO DE LA COSTURA ES UNA AVENTURA EMOCIONANTE.
                DESDE REPARAR UNA PRENDA HASTA CREAR TUS PROPIOS DISEÑOS, LAS
                POSIBILIDADES SON INFINITAS. PERO, ¿CÓMO ELEGIR LA HERRAMIENTA
                ADECUADA?
              </p>
              <p className="mb-4">
                NUESTRO OBJETIVO ES AYUDARTE A ENCONTRAR LA MÁQUINA DE COSER
                PERFECTA PARA TI. UNA BUENA ELECCIÓN TE MOTIVARÁ A APRENDER Y
                EVITARÁ FRUSTRACIONES INNECESARIAS, CONSTRUYENDO UNA BASE SÓLIDA
                PARA TUS HABILIDADES.
              </p>
              <p className="mb-4">
                UNA DECISIÓN INFORMADA MARCA LA DIFERENCIA ENTRE UN HOBBY
                PASAJERO Y UNA PASIÓN PARA TODA LA VIDA. COMO TUS ASESORES DE
                CONFIANZA, NOS ASEGURAREMOS DE QUE CADA PUNTADA QUE DES ESTÉ
                RESPALDADA POR LA MEJOR TECNOLOGÍA.
              </p>
              <p>NO ESPERES MÁS. ¡LA CREATIVIDAD COMIENZA AHORA!</p>
            </div>
          </div>
          <div className="w-full lg:w-2/5">
            <img
              src={AboutImg}
              alt="Mujer cosiendo con máquina"
              className="w-full rounded-2xl shadow-[6px_6px_6px_#000] border-2 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Services */}
      <div className="bg-gray-50 !py-10 lg:!py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[14px] lg:text-[16px] font-bold text-gray-500 uppercase tracking-wider">
              CARACTERÍSTICAS ESENCIALES
            </p>
            <h2 className="text-[30px] lg:text-[36px] font-bold text-[#082c55]">
              QUÉ BUSCAR EN UNA MÁQUINA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Item 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="text-[50px] text-[#082c55] mb-4">
                <CgFileDocument />
              </div>
              <h3 className="text-[18px] font-bold mb-3 text-[#082c55]">
                TIPOS DE PUNTADAS
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[14px]">
                UNA BUENA MÁQUINA PARA PRINCIPIANTES DEBE INCLUIR PUNTADAS
                BÁSICAS (RECTA, ZIGZAG) Y ALGUNAS DECORATIVAS PARA EXPANDIR TU
                CREATIVIDAD.
              </p>
            </div>
            {/* Service Item 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="text-[50px] text-[#082c55] mb-4">
                <FaBalanceScale />
              </div>
              <h3 className="text-[18px] font-bold mb-3 text-[#082c55]">
                FACILIDAD DE USO
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[14px]">
                BUSCA FUNCIONES COMO EL ENHEBRADOR AUTOMÁTICO Y LA SELECCIÓN
                SENCILLA DE PUNTADAS. MENOS TIEMPO EN CONFIGURAR, MÁS TIEMPO
                PARA COSER.
              </p>
            </div>
            {/* Service Item 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="text-[50px] text-[#082c55] mb-4">
                <MdAccountBalance />
              </div>
              <h3 className="text-[18px] font-bold mb-3 text-[#082c55]">
                PRESUPUESTO Y DURABILIDAD
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[14px]">
                INVERTIR EN UNA MARCA RECONOCIDA GARANTIZA REPUESTOS Y SERVICIO
                TÉCNICO. TE AYUDAMOS A ENCONTRAR EL MEJOR BALANCE
                CALIDAD-PRECIO.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Rights (Reverse Layout) */}
      <div className="container !py-10 lg:!py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="w-full lg:w-2/5">
            <img
              src={PenalImg}
              alt="Máquina de coser mecánica"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <p className="text-[18px] lg:text-[22px] mb-2 font-semibold text-gray-700">
              LA GRAN DECISIÓN{" "}
              <span className="bg-black text-white px-2 py-1 rounded-md">
                TRADICIÓN VS. TECNOLOGÍA
              </span>
            </p>
            <h2 className="text-[28px] lg:text-[36px] font-bold mb-4 text-[#082c55]">
              MECÁNICAS VS. ELECTRÓNICAS
            </h2>
            <p className="text-[18px] mb-6 font-semibold text-gray-700">
              <span className="bg-gray-200 px-2 py-1 rounded-md">
                CONTROL Y SENCILLEZ
              </span>
            </p>
            <div className="text-gray-600 text-justify text-[14px] lg:text-[16px] leading-relaxed">
              <p>
                LAS MÁQUINAS MECÁNICAS SON LA PUERTA DE ENTRADA CLÁSICA A LA
                COSTURA. SON ROBUSTAS, FÁCILES DE MANTENER Y PERFECTAS PARA
                APRENDER LOS FUNDAMENTOS. CONTROLAS LA TENSIÓN Y LA PUNTADA
                MANUALMENTE, LO QUE TE DA UN ENTENDIMIENTO PROFUNDO DEL
                FUNCIONAMIENTO. SON IDEALES PARA TAREAS BÁSICAS Y PRESUPUESTOS
                AJUSTADOS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Strategy */}
      <div className="bg-gray-50 !py-10 lg:!py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-3/5">
              <p className="text-[18px] lg:text-[22px] mb-2 font-semibold text-gray-700">
                UN PASO HACIA LA{" "}
                <span className="bg-black text-white px-2 py-1 rounded-md">
                  INNOVACIÓN
                </span>
              </p>
              <h2 className="text-[28px] lg:text-[36px] font-bold mb-4 text-[#082c55]">
                VENTAJAS DE LAS ELECTRÓNICAS
              </h2>
              <p className="text-[18px] mb-6 font-semibold text-gray-700">
                <span className="bg-gray-200 px-2 py-1 rounded-md">
                  PRECISIÓN Y VERSATILIDAD
                </span>
              </p>
              <div className="text-gray-600 text-justify text-[14px] lg:text-[16px] leading-relaxed">
                <p>
                  LAS MÁQUINAS ELECTRÓNICAS OFRECEN UN MUNDO DE POSIBILIDADES.
                  CON PANTALLAS LCD, DECENAS DE PUNTADAS AUTOMÁTICAS Y AJUSTES
                  PRECISOS, LLEVAN TUS PROYECTOS A OTRO NIVEL. SON PERFECTAS
                  PARA QUIENES BUSCAN EXPERIMENTAR CON QUILTING, BORDADOS Y
                  ACABADOS PROFESIONALES. SU CURVA DE APRENDIZAJE ES SUAVE
                  GRACIAS A SUS ASISTENTES INTEGRADOS.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <img
                src={PenalImg}
                alt="Máquina de coser electrónica"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Solutions (Reverse) */}
      <div className="container !py-10 lg:!py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="w-full lg:w-2/5">
            <img
              src={PenalImg}
              alt="Máquina de coser recomendada"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <p className="text-[18px] lg:text-[22px] mb-2 font-semibold text-gray-700">
              NUESTRA RECOMENDACIÓN{" "}
              <span className="bg-black text-white px-2 py-1 rounded-md">
                PARA EMPEZAR
              </span>
            </p>
            <h2 className="text-[28px] lg:text-[36px] font-bold mb-4 text-[#082c55]">
              EL MODELO IDEAL PARA TI
            </h2>
            <p className="text-[18px] mb-6 font-semibold text-gray-700">
              <span className="bg-gray-200 px-2 py-1 rounded-md">
                CONFIANZA Y CALIDAD
              </span>
            </p>
            <div className="text-gray-600 text-justify text-[14px] lg:text-[16px] leading-relaxed">
              <p>
                PARA LA MAYORÍA DE PRINCIPIANTES, RECOMENDAMOS UNA MÁQUINA
                ELECTRÓNICA DE GAMA DE ENTRADA. OFRECE LA SENCILLEZ DE UNA
                MECÁNICA CON LAS VENTAJAS DE LA TECNOLOGÍA, COMO EL OJAL
                AUTOMÁTICO Y UNA SELECCIÓN VARIADA DE PUNTADAS. MARCAS COMO
                BROTHER O SINGER OFRECEN MODELOS EXCELENTES QUE CRECERÁN
                CONTIGO. NUESTRA PRIORIDAD ES QUE DISFRUTES EL VIAJE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-[#082c55] !py-12 text-white text-center">
        <div className="container">
          <h2 className="text-[24px] lg:text-[30px] font-bold mb-4">
            ¿LISTA PARA EMPEZAR A COSER?
          </h2>
          <p className="mb-8 text-[14px] lg:text-[16px]">
            EXPLORA NUESTRO CATÁLOGO O PIDE ASESORAMIENTO PERSONALIZADO
          </p>
          <Link to="/productListing">
            <button className="bg-white text-[#082c55] px-8 py-3 rounded-md font-bold hover:bg-gray-200 transition-colors shadow-lg">
              VER MÁQUINAS
            </button>
          </Link>
        </div>
      </div>

      {/* Projects Swiper */}
      <div className="container !py-10 lg:!py-20">
        <div className="text-center mb-12">
          <p className="text-[14px] lg:text-[16px] font-bold text-gray-500 uppercase tracking-wider">
            EXPLORA NUESTRAS CATEGORÍAS
          </p>
          <h2 className="text-[30px] lg:text-[36px] font-bold text-[#082c55]">
            TIPOS DE MÁQUINAS
          </h2>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="!pb-10"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-[3px_3px_3px_#274a72] border border-gray-200 h-full">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-[20px] font-bold mb-2 text-[#082c55]">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-[14px]">{project.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default sixthblog;
