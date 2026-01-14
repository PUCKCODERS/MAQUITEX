import { useEffect, useState } from "react";
import "./style.css";
import React from "react";

import heroSlider1 from "./images/hero-slider-1.jpg";
import heroSlider2 from "./images/hero-slider-2.jpg";
import heroSlider3 from "./images/hero-slider-3.jpg";
//import machine from "./images/maquinacoser.jpeg";
import service1 from "./images/service-1.jpg";
import service2 from "./images/service-2.jpg";
import service3 from "./images/service-3.jpg";
//import shape1 from "./images/shape-1.png";
//import shape2 from "./images/shape-2.png";
import aboutBanner from "./images/about-banner.jpg";
import aboutAbsImage from "./images/about-abs-image.jpg";
import badge2 from "./images/badge-2.png";
//import shape3 from "./images/shape-3.png";
import specialDishBanner from "./images/special-dish-banner.jpg";
//import badge1 from "./images/badge-1.png";
import shape4 from "./images/shape-4.png";
import shape9 from "./images/shape-9.png";
//import menu1 from "./images/menu-1.png";
//import menu2 from "./images/menu-2.png";
//import menu3 from "./images/menu-3.png";
//import menu4 from "./images/menu-4.png";
//import menu5 from "./images/menu-5.png";
//import menu6 from "./images/menu-6.png";
//import shape5 from "./images/fondo1.jpeg";
//import shape6 from "./images/shape-6.png";
import testimonialBg from "./images/testimonial-bg.jpg";
//import testiAvatar from "./images/testi-avatar.jpg";
import formPattern from "./images/form-pattern.png";
//import shape7 from "./images/shape-7.png";
//import shape8 from "./images/shape-8.png";
import event1 from "./images/event-1.jpg";
import event2 from "./images/event-2.jpg";
import event3 from "./images/event-3.jpg";
import footerBg from "./images/footer-bg.jpg";
import logo from "./images/image.png";

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { GiSewingMachine } from "react-icons/gi";
import { GiSewingNeedle } from "react-icons/gi";
import { GiSewingString } from "react-icons/gi";
import { FaChevronUp } from "react-icons/fa";

const Nosotros = () => {
  const [currentSlidePos, setCurrentSlidePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlidePos((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slideNext = () => setCurrentSlidePos((prev) => (prev + 1) % 3);
  const slidePrev = () =>
    setCurrentSlidePos((prev) => (prev === 0 ? 2 : prev - 1));

  return (
    <div className="nosotros-page ">
      <main>
        <article>
          {/* HERO */}
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              <li
                className={`slider-item ${
                  currentSlidePos === 0 ? "active" : ""
                }`}
                data-hero-slider-item
              >
                <div className="slider-bg">
                  <img
                    src={heroSlider1}
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover"
                  />
                </div>
                <p className="label-2 section-subtitle slider-reveal !text-[20px]">
                  TECNOLOGÍA Y PRECISIÓN
                </p>
                <h1 className="display-1 hero-title slider-reveal !text-[75px]">
                  TODO PARA TU PASIÓN <br />
                  POR LA COSTURA
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  MÁQUINAS DE COSER, ACCESORIOS Y REPUESTOS PARA PROFESIONALES Y
                  AFICIONADOS
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">VER CATÁLOGO</span>
                  <span className="text text-2" aria-hidden="true">
                    VER CATÁLOGO
                  </span>
                </a>
              </li>
              <li
                className={`slider-item ${
                  currentSlidePos === 1 ? "active" : ""
                }`}
                data-hero-slider-item
              >
                <div className="slider-bg">
                  <img
                    src={heroSlider2}
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover "
                  />
                </div>
                <p className="label-2 section-subtitle slider-reveal !text-[20px]">
                  CALIDAD QUE PERDURA
                </p>
                <h1 className="display-1 hero-title slider-reveal !text-[75px]">
                  MÁQUINAS DE COSER <br />
                  PARA CADA NECESIDAD
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  DOMÉSTICAS, INDUSTRIALES Y ELECTRÓNICAS CON GARANTÍA Y SOPORTE
                  TÉCNICO
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">EXPLORAR PRODUCTOS</span>
                  <span className="text text-2" aria-hidden="true">
                    EXPLORAR PRODUCTOS
                  </span>
                </a>
              </li>
              <li
                className={`slider-item ${
                  currentSlidePos === 2 ? "active" : ""
                }`}
                data-hero-slider-item
              >
                <div className="slider-bg">
                  <img
                    src={heroSlider3}
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover"
                  />
                </div>
                <p className="label-2 section-subtitle slider-reveal !text-[20px]">
                  SERVICIO Y CONFIANZA
                </p>
                <h1 className="display-1 hero-title slider-reveal !text-[75px]">
                  REPUESTOS Y SERVICIO <br />
                  TÉCNICO ESPECIALIZADO
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  MANTENIMIENTO, REPARACIÓN Y ENVÍO A DOMICILIO A TODO EL PAÍS
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">CONTÁCTANOS</span>
                  <span className="text text-2" aria-hidden="true">
                    CONTÁCTANOS
                  </span>
                </a>
              </li>
            </ul>

            <button
              className="slider-btn prev"
              aria-label="slide to previous"
              data-prev-btn
              onClick={slidePrev}
            >
              <GrPrevious className="" />
            </button>

            <button
              className="slider-btn next"
              aria-label="slide to next"
              data-next-btn
              onClick={slideNext}
            >
              <GrNext />
            </button>

            <a href="#" className="hero-btn has-after">
              <GiSewingMachine className="text-[75px]" />
              <span className="label-2 text-center !text-white  span">
                MAQUITEXT
              </span>
            </a>
          </section>

          {/* SERVICE */}
          <section
            className="section service bg-gray-600 text-center"
            aria-label="service"
          >
            <div className="container">
              <p className="section-subtitle label-2 !text-[20px]">
                LO QUE OFRECEMOS
              </p>
              <h2 className="headline-1 section-title">OFRECEMOS LO MEJOR</h2>
              <p className="section-text">
                SOLUCIONES COMPLETAS PARA EL MUNDO DE LA COSTURA, DESDE LA VENTA
                HASTA EL SOPORTE TÉCNICO
              </p>
              <ul className="grid-list">
                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure
                        className="card-banner img-holder"
                        style={{ "--width": "285", "--height": "336" }}
                      >
                        <img
                          src={service1}
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Breakfast"
                          className="img-cover"
                        />
                      </figure>
                    </a>
                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">MÁQUINAS DE COSER</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        VER MODELOS
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure
                        className="card-banner img-holder"
                        style={{ "--width": "285", "--height": "336" }}
                      >
                        <img
                          src={service2}
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Appetizers"
                          className="img-cover"
                        />
                      </figure>
                    </a>
                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">ACCESORIOS Y REPUESTOS</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        VER ACCESORIOS
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure
                        className="card-banner img-holder"
                        style={{ "--width": "285", "--height": "336" }}
                      >
                        <img
                          src={service3}
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Drinks"
                          className="img-cover"
                        />
                      </figure>
                    </a>
                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">SERVICIO TÉCNICO</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        SOLICITAR SERVICIO
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <GiSewingNeedle
                width="246"
                height="412"
                loading="lazy"
                alt="shape"
                className="shape shape-1 move-anim text-[75px]"
              />
              <GiSewingString
                width="343"
                height="345"
                loading="lazy"
                alt="shape"
                className="shape shape-2 move-anim text-[75px]"
              />
            </div>
          </section>

          {/* ABOUT */}
          <section
            className="section about bg-gray-400 text-center"
            aria-labelledby="about-label"
            id="about"
          >
            <div className="container">
              <div className="about-content">
                <p
                  className="label-2 section-subtitle !text-[20px]"
                  id="about-label"
                >
                  NUESTRA EXPERIENCIA
                </p>
                <h2 className="headline-1 section-title !text-[#082c55] !text-[40px]">
                  EXPERTOS EN MÁQUINAS DE COSER
                </h2>
                <p className="section-text !text-[#000]">
                  SOMOS UNA EMPRESA ESPECIALIZADA EN LA VENTA DE MÁQUINAS DE
                  COSER, ACCESORIOS Y REPUESTOS. BRINDAMOS SERVICIO TÉCNICO
                  PROFESIONAL Y ENVÍO A DOMICILIO, GARANTIZANDO CALIDAD,
                  RESPALDO Y ATENCIÓN PERSONALIZADA PARA CADA CLIENTE.
                </p>
                <div className="contact-label !text-[#082c55]">
                  ATENCIÓN PERSONALIZADA
                </div>
                <a
                  href="tel:+804001234567"
                  className="body-1 contact-number hover-underline !text-[#000]"
                >
                  +80 (400) 123 4567
                </a>
                <a
                  href="#"
                  className="btn btn-primary !text-[#082c55] !border-2 !border-[#082c55] hover:!border-white"
                >
                  <span className="text text-1 ">CONÓCENOS</span>
                  <span className="text text-2" aria-hidden="true">
                    CONÓCENOS
                  </span>
                </a>
              </div>
              <figure className="about-banner">
                <img
                  src={aboutBanner}
                  width="570"
                  height="570"
                  loading="lazy"
                  alt="about banner"
                  className="w-100"
                  data-parallax-item
                  data-parallax-speed="1"
                />
                <div
                  className="abs-img abs-img-1 has-before"
                  data-parallax-item
                  data-parallax-speed="1.75"
                >
                  <img
                    src={aboutAbsImage}
                    width="285"
                    height="285"
                    loading="lazy"
                    alt=""
                    className="w-100"
                  />
                </div>
                <div className="abs-img abs-img-2 has-before">
                  <img
                    src={badge2}
                    width="133"
                    height="134"
                    loading="lazy"
                    alt=""
                  />
                </div>
              </figure>
              <GiSewingString
                width="197"
                height="194"
                loading="lazy"
                alt=""
                top="20%"
                className="shape text-[100px] text-[#082c55]"
              />
            </div>
          </section>

          {/* SPECIAL DISH */}
          <section
            className="special-dish  text-center"
            aria-labelledby="dish-label"
          >
            <div className="special-dish-banner">
              <img
                src={specialDishBanner}
                width="940"
                height="900"
                loading="lazy"
                alt="special dish"
                className="img-cover"
              />
            </div>
            <div className="special-dish-content bg-gray-600">
              <div className="container">
                <GiSewingString
                  width="75"
                  height="41"
                  loading="lazy"
                  alt="badge"
                  className="abs-img text-[50px] "
                />

                <p className="section-subtitle label-2 !text-[20px]">
                  PRODUCTO DESTACADO
                </p>
                <h2 className="headline-1 section-title !text-[40px]">
                  MÁQUINA DE COSER PROFESIONAL
                </h2>
                <p className="section-text">
                  ALTO RENDIMIENTO, PRECISIÓN Y DURABILIDAD PARA TRABAJOS
                  EXIGENTES DE COSTURA. IDEAL PARA TALLERES Y CONFECCIÓN
                  PROFESIONAL.
                </p>
                <div className="wrapper">
                  <del className="del body-3 !text-[#000]">$40.00</del>
                  <span className="span body-1 ">$20.00</span>
                </div>
                <a href="#" className="btn btn-primary">
                  <span className="text text-1">VER DETALLES</span>
                  <span className="text text-2" aria-hidden="true">
                    VER DETALLES
                  </span>
                </a>
              </div>
            </div>
            <img
              src={shape4}
              width="179"
              height="359"
              loading="lazy"
              alt=""
              className="shape shape-1"
            />
            <img
              src={shape9}
              width="351"
              height="462"
              loading="lazy"
              alt=""
              className="shape shape-2"
            />
          </section>

          {/* MENU */}
          <section
            className="section menu bg-gray-400"
            aria-label="menu-label"
            id="menu"
          >
            <div className="container">
              <p className="section-subtitle text-center !text-[20px] label-2">
                NUESTRO CATÁLOGO
              </p>
              <h2 className="headline-1 section-title text-center !text-[#082c55]">
                PRODUCTOS DISPONIBLES
              </h2>
              <ul className="grid-list">
                <li>
                  <div className="menu-card hover:card ">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Greek Salad
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2 !text-[#082c55]">
                          $25.50
                        </span>
                      </div>
                      <p className="card-text label-1 !text-black">
                        Tomatoes, green bell pepper, sliced cucumber onion,
                        olives, and feta cheese.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Lasagne
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2 !text-[#082c55]">
                          $40.00
                        </span>
                      </div>
                      <p className="card-text label-1 !text-[#000]">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Butternut
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2 !text-[#082c55]">
                          $10.00
                        </span>
                      </div>
                      <p className="card-text label-1 !text-[#000]">
                        Typesetting industry lorem Lorem Ipsum is simply dummy
                        text of the priand.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Tokusen Wagyu
                          </a>
                        </h3>
                        <span className="badge label-1">New</span>
                        <span className="span title-2 !text-[#082c55]">
                          $39.00
                        </span>
                      </div>
                      <p className="card-text label-1 !text-[#000]">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Rellenas
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2 !text-[#082c55]">
                          $25.00
                        </span>
                      </div>
                      <p className="card-text label-1 !text-[#000]">
                        Avocados with crab meat, red onion, crab salad stuffed
                        red bell pepper and green bell pepper.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder !shadow-[6px_5px_6px_#000]"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <GiSewingMachine
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover text-[100px] "
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title !text-[#082c55]">
                            Opu Fish
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2 !text-[#082c55]">
                          $49.00
                        </span>
                      </div>
                      <p className="card-text label-1 !text-[#000]">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <a
                href="#"
                className="btn btn-primary !text-[#082c55] !border-2 !border-[#082c55] hover:!border-white"
              >
                <span class="text text-1">View All Menu</span>
                <span class="text text-2" aria-hidden="true">
                  View All Menu
                </span>
              </a>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section
            className="section testi text-center has-bg-image"
            style={{
              backgroundImage: `url(${testimonialBg})`,
            }}
            aria-label="testimonials"
          >
            <div className="container">
              <div className="quote"></div>
              <p className="headline-2 testi-text">
                EXCELENTE ATENCIÓN Y SERVICIO TÉCNICO, SUS MÁQUINAS QUEDAN COMO
                NUEVAS Y EL ENVÍO ES RÁPIDO
              </p>
            </div>
          </section>

          {/* RESERVATION */}
          <section className="reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form action="" className="form-left">
                  <h2 className="headline-1 text-center !text-[40px]">
                    SOLICITUD DE SERVICIO TÉCNICO
                  </h2>
                  <p className="form-text text-center">
                    SOLICITA ATENCIÓN TÉCNICA AL{" "}
                    <a href="tel:+88123123456" className="link">
                      +88-123-123456
                    </a>{" "}
                    O COMPLETA EL FORMULARIO DE SERVICIO
                  </p>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      placeholder="TU NOMBRE
"
                      autoComplete="off"
                      className="input-field"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="NÚMERO DE TELÉFONO
"
                      autoComplete="off"
                      className="input-field"
                    />
                  </div>
                  <div className="input-wrapper">
                    <div className="icon-wrapper">
                      <ion-icon
                        name="person-outline"
                        aria-hidden="true"
                      ></ion-icon>
                      <select
                        name="person"
                        className="input-field !text-[13px]"
                      >
                        <option value="1-person">TIPO DE SERVICIO</option>
                        <option value="2-person">SERVICIO TÉCNICO</option>
                        <option value="3-person">
                          MANTENIMIENTO PREVENTIVO
                        </option>
                        <option value="4-person">REPARACIÓN DE MÁQUINA</option>
                        <option value="5-person">REPUESTOS</option>
                        <option value="6-person">ACCESORIOS</option>
                        <option value="7-person">ENVÍO A DOMICILIO</option>
                        <option value="7-person">ASESORÍA TÉCNICA</option>
                      </select>
                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                        style={{ color: "white" }}
                      ></ion-icon>
                    </div>
                    <div className="icon-wrapper">
                      <ion-icon
                        name="calendar-clear-outline"
                        aria-hidden="true"
                      ></ion-icon>
                      <input
                        type="date"
                        name="reservation-date"
                        className="input-field"
                      />
                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                        style={{ color: "white" }}
                      ></ion-icon>
                    </div>
                    <div className="icon-wrapper">
                      <ion-icon
                        name="time-outline"
                        aria-hidden="true"
                      ></ion-icon>
                      <select
                        name="person"
                        className="input-field !text-[11px]"
                      >
                        <option value="08:00am">HORARIO DE ATENCIÓN</option>
                        <option value="08:00am">08 : 00 am</option>
                        <option value="09:00am">09 : 00 am</option>
                        <option value="010:00am">10 : 00 am</option>
                        <option value="011:00am">11 : 00 am</option>
                        <option value="012:00am">12 : 00 am</option>
                        <option value="01:00pm">01 : 00 pm</option>
                        <option value="02:00pm">02 : 00 pm</option>
                        <option value="03:00pm">03 : 00 pm</option>
                        <option value="04:00pm">04 : 00 pm</option>
                        <option value="05:00pm">05 : 00 pm</option>
                        <option value="06:00pm">06 : 00 pm</option>
                        <option value="07:00pm">07 : 00 pm</option>
                        <option value="08:00pm">08 : 00 pm</option>
                        <option value="09:00pm">09 : 00 pm</option>
                        <option value="10:00pm">10 : 00 pm</option>
                      </select>
                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                        style={{ color: "white" }}
                      ></ion-icon>
                    </div>
                  </div>
                  <textarea
                    name="message"
                    placeholder="DESCRIBE TU SOLICITUD O EL PROBLEMA DE TU MÁQUINA
"
                    autoComplete="off"
                    className="input-field"
                  ></textarea>
                  <button type="submit" className="btn btn-secondary">
                    <span className="text text-1">ENVIAR SOLICITUD</span>
                    <span className="text text-2" aria-hidden="true">
                      ENVIAR SOLICITUD
                    </span>
                  </button>
                </form>
                <div
                  className="form-right text-center"
                  style={{
                    backgroundImage: `url(${formPattern})`,
                  }}
                >
                  <h2 className="headline-1 text-center !text-[25px]">
                    CONTÁCTANOS
                  </h2>
                  <p className="contact-label">ATENCIÓN TÉCNICA Y VENTAS</p>
                  <a
                    href="tel:+88123123456"
                    className="body-1 contact-number hover-underline"
                  >
                    +88-123-123456
                  </a>
                  <div className="separator"></div>
                  <p className="contact-label">UBICACIÓN</p>
                  <address className="body-4">
                    Restaurant St, Delicious City, <br />
                    London 9578, UK
                  </address>
                  <p className="contact-label">HORARIO DE ATENCIÓN</p>
                  <p className="body-4">
                    LUNES A SÁBADO <br />
                    09:00 AM - 18:00 PM
                  </p>
                  <p className="contact-label">FINES DE SEMANA</p>
                  <p className="body-4">
                    SABADOS <br />
                    9.00 pm - 15.00pm
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section
            className="section features bg-gray-400 text-center"
            aria-label="features"
          >
            <div className="container">
              <p className="section-subtitle label-2 !text-[20px]">
                Why Choose Us
              </p>
              <h2 className="headline-1 section-title">Our Strength</h2>
              <ul className="grid-list">
                <li className="feature-item !shadow-[6px_5px_6px_#000]">
                  <div className="feature-card ">
                    <div className="card-icon">
                      <GiSewingMachine className="text-[75px]" />
                    </div>
                    <h3 className="title-2 card-title">PRODUCTOS DE CALIDAD</h3>
                    <p className="label-1 card-text">
                      Lorem Ipsum is simply dummy printing and typesetting.
                    </p>
                  </div>
                </li>
                <li className="feature-item !shadow-[6px_5px_6px_#000]">
                  <div className="feature-card">
                    <div className="card-icon">
                      <GiSewingNeedle className="text-[75px]" />
                    </div>
                    <h3 className="title-2 card-title">
                      {" "}
                      SERVICIO ESPECIALIZADO
                    </h3>
                    <p className="label-1 card-text">
                      Lorem Ipsum is simply dummy printing and typesetting.
                    </p>
                  </div>
                </li>
                <li className="feature-item !shadow-[6px_5px_6px_#000]">
                  <div className="feature-card">
                    <div className="card-icon">
                      <GiSewingString className="text-[75px]" />
                    </div>
                    <h3 className="title-2 card-title">
                      REPUESTOS GARANTIZADOS
                    </h3>
                    <p className="label-1 card-text">
                      Lorem Ipsum is simply dummy printing and typesetting.
                    </p>
                  </div>
                </li>
                <li className="feature-item !shadow-[6px_5px_6px_#000]">
                  <div className="feature-card">
                    <div className="card-icon">
                      <div className="card-icon">
                        <GiSewingMachine className="text-[75px]" />
                      </div>
                    </div>
                    <h3 className="title-2 card-title">ENVÍO A DOMICILIO</h3>
                    <p className="label-1 card-text">
                      Lorem Ipsum is simply dummy printing and typesetting.
                    </p>
                  </div>
                </li>
              </ul>

              <GiSewingNeedle
                width="208"
                height="178"
                loading="lazy"
                alt="shape"
                className="shape shape-1 text-[100px] text-[#082c55]"
              />
              <GiSewingString
                width="120"
                height="115"
                loading="lazy"
                alt="shape"
                className="shape shape-2 text-[100px] text-[#082c55]"
              />
            </div>
          </section>

          {/* EVENT */}
          <section className="section event bg-gray-600" aria-label="event">
            <div className="container">
              <p className="section-subtitle label-2 text-center !text-[20px]">
                NOVEDADES
              </p>
              <h2 className="section-title headline-1 text-center">
                ÚLTIMAS ACTUALIZACIONES
              </h2>
              <ul className="grid-list">
                <li>
                  <div className="event-card has-before hover:shine border-1 !shadow-[12px_12px_12px_#000]">
                    <div
                      className="card-banner img-holder "
                      style={{ "--width": "350", "--height": "450" }}
                    >
                      <img
                        src={event1}
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Flavour so good you’ll try to eat with your eyes."
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        MAQUINAS
                      </p>
                      <h3 className="card-title title-2 text-center">
                        NUEVOS MODELOS DE MÁQUINAS DISPONIBLES
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="event-card has-before hover:shine border-1 !shadow-[12px_12px_12px_#000]">
                    <div
                      className="card-banner img-holder"
                      style={{ "--width": "350", "--height": "450" }}
                    >
                      <img
                        src={event2}
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Flavour so good you’ll try to eat with your eyes."
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        ACCESORIOS Y REPUESTOS
                      </p>
                      <h3 className="card-title title-2 text-center">
                        PROMOCIONES EN ACCESORIOS Y REPUESTOS
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="event-card has-before hover:shine border-1 !shadow-[12px_12px_12px_#000]">
                    <div
                      className="card-banner img-holder"
                      style={{ "--width": "350", "--height": "450" }}
                    >
                      <img
                        src={event3}
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Flavour so good you’ll try to eat with your eyes."
                        className="logo"
                      />
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        SERVICIO TECNICO Y ENVIO GRATS
                      </p>
                      <h3 className="card-title title-2 text-center">
                        SERVICIO TÉCNICO AHORA A DOMICILIO
                      </h3>
                    </div>
                  </div>
                </li>
              </ul>
              <a href="#" className="btn btn-primary">
                <span class="text text-1">PRODUCTOS NUEVOS</span>
                <span class="text text-2" aria-hidden="true">
                  PRODUCTOS NUEVOS
                </span>
              </a>
            </div>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer
        className="footer section has-bg-image text-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="container ">
          <div className="footer-top grid-list ">
            <div className="footer-brand has-before has-after !bg-white">
              <a href="#" className="logo !text-[50px]">
                <img src={logo} width="300" height="150" loading="lazy" />
              </a>
              <address className="body-4 !text-[#082c55]">
                Restaurant St, Delicious City, London 9578, UK
              </address>
              <a
                href="mailto:booking@grilli.com"
                className="body-4 contact-link !text-[#082c55]"
              >
                booking@grilli.com
              </a>
              <a
                href="tel:+88123123456"
                className="body-4 contact-link !text-[#082c55]"
              >
                Booking Request : +88-123-123456
              </a>
              <p className="body-4 !text-[#082c55]">
                Open : 09:00 am - 01:00 pm
              </p>
              <div className="wrapper">
                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
              </div>
              <p className="title-1 !text-[#082c55] !text-[15px]">
                ESPECIALISTAS EN MÁQUINAS DE COSER, ACCESORIOS, REPUESTOS Y
                SERVICIO TÉCNICO PROFESIONAL.
              </p>
              <p className="label-1 !text-[#082c55]">
                Subscribe us & Get{" "}
                <span class="span !text-[#082c55]">25% Off.</span>
              </p>
              <form action="" className="input-wrapper">
                <div className="icon-wrapper">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <input
                    type="email"
                    name="email_address"
                    placeholder="Your email"
                    autoComplete="off"
                    className="input-field "
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  <span className="text text-1 ">Subscribe</span>
                  <span className="text text-2" aria-hidden="true">
                    Subscribe
                  </span>
                </button>
              </form>
            </div>
            <ul className="footer-list">
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Menus
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Our Chefs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
            <ul className="footer-list">
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="label-2 footer-link hover-underline !text-white"
                >
                  Google Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <a
        href="#top"
        className="back-top-btn active"
        aria-label="back to top"
        data-back-top-btn
      >
        <FaChevronUp />
      </a>
    </div>
  );
};

export default Nosotros;
