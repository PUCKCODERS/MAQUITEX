import { useEffect, useState } from "react";
import "./style.css";
import React from "react";

import specialDishBanner from "./images/specialProduct.png";
import shape9 from "./images/specialMaquina.png";
import testimonialBg from "./images/testimonial-bg.png";
import formPattern from "./images/form-pattern.png";

import footerBg from "./images/footer-form-bg.png";
import logo from "./images/image.png";

import { GiSewingString } from "react-icons/gi";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = "El campo 'Nombre' es obligatorio.";
    if (!formData.phone.trim())
      newErrors.phone = "El campo 'Teléfono' es obligatorio.";
    if (!formData.serviceType)
      newErrors.serviceType = "Debes seleccionar un tipo de servicio.";
    if (!formData.date) newErrors.date = "Debes seleccionar una fecha.";
    if (!formData.time) newErrors.time = "Debes seleccionar un horario.";
    if (!formData.message.trim())
      newErrors.message = "Por favor, describe tu solicitud.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const { name, phone, serviceType, date, time, message } = formData;

    const phoneNumber = "593968873896";
    const text = `*SOLICITUD DE SERVICIO TÉCNICO*%0A--------------------------------%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Servicio:* ${serviceType}%0A*Fecha:* ${date}%0A*Hora:* ${time}%0A*Mensaje:* ${message}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="contacto-page ">
      <main>
        <article>
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
              <p className="headline-2 testi-text ">
                EXCELENTE ATENCIÓN Y SERVICIO TÉCNICO, SUS MÁQUINAS QUEDAN COMO
                NUEVAS Y EL ENVÍO ES RÁPIDO
              </p>
            </div>
          </section>

          {/* RESERVATION */}
          <section className="reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form action="" className="form-left" onSubmit={handleSubmit}>
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
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="TU NOMBRE "
                        autoComplete="off"
                        className="input-field"
                      />
                      {errors.name && (
                        <p className="error-text">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="NÚMERO DE TELÉFONO"
                        autoComplete="off"
                        className="input-field"
                      />
                      {errors.phone && (
                        <p className="error-text">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <div>
                      <div className="icon-wrapper">
                        <ion-icon
                          name="person-outline"
                          aria-hidden="true"
                        ></ion-icon>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="input-field !text-[13px]"
                        >
                          <option value="">TIPO DE SERVICIO</option>
                          <option value="SERVICIO TÉCNICO">
                            SERVICIO TÉCNICO
                          </option>
                          <option value="MANTENIMIENTO PREVENTIVO">
                            MANTENIMIENTO PREVENTIVO
                          </option>
                          <option value="REPARACIÓN DE MÁQUINA">
                            REPARACIÓN DE MÁQUINA
                          </option>
                          <option value="REPUESTOS">REPUESTOS</option>
                          <option value="ACCESORIOS">ACCESORIOS</option>
                          <option value="ENVÍO A DOMICILIO">
                            ENVÍO A DOMICILIO
                          </option>
                          <option value="ASESORÍA TÉCNICA">
                            ASESORÍA TÉCNICA
                          </option>
                        </select>
                        <ion-icon
                          name="chevron-down"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></ion-icon>
                      </div>
                      {errors.serviceType && (
                        <p className="error-text">{errors.serviceType}</p>
                      )}
                    </div>
                    <div>
                      <div className="icon-wrapper">
                        <ion-icon
                          name="calendar-clear-outline"
                          aria-hidden="true"
                        ></ion-icon>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="input-field"
                        />
                        <ion-icon
                          name="chevron-down"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></ion-icon>
                      </div>
                      {errors.date && (
                        <p className="error-text">{errors.date}</p>
                      )}
                    </div>
                    <div>
                      <div className="icon-wrapper">
                        <ion-icon
                          name="time-outline"
                          aria-hidden="true"
                        ></ion-icon>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="input-field !text-[11px]"
                        >
                          <option value="">HORARIO DE ATENCIÓN</option>
                          <option value="08:00 am">08 : 00 am</option>
                          <option value="09:00 am">09 : 00 am</option>
                          <option value="10:00 am">10 : 00 am</option>
                          <option value="11:00 am">11 : 00 am</option>
                          <option value="12:00 am">12 : 00 am</option>
                          <option value="01:00 pm">01 : 00 pm</option>
                          <option value="02:00 pm">02 : 00 pm</option>
                          <option value="03:00 pm">03 : 00 pm</option>
                          <option value="04:00 pm">04 : 00 pm</option>
                          <option value="05:00 pm">05 : 00 pm</option>
                          <option value="06:00 pm">06 : 00 pm</option>
                        </select>
                        <ion-icon
                          name="chevron-down"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></ion-icon>
                      </div>
                      {errors.time && (
                        <p className="error-text">{errors.time}</p>
                      )}
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="DESCRIBE TU SOLICITUD O EL PROBLEMA DE TU MÁQUINA"
                    autoComplete="off"
                    className="input-field"
                  ></textarea>
                  {errors.message && (
                    <p className="error-text">{errors.message}</p>
                  )}
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
                  NUESTRA UBICACIÓN
                </p>
                <h2 className="headline-1 section-title !text-[40px]">
                  VISÍTANOS EN NUESTRA TIENDA FÍSICA
                </h2>
                <p className="section-text">
                  OFRECEMOS UNA AMPLIA VARIEDAD DE MÁQUINAS DE COSER CASERAS E
                  INDUSTRIALES, DISEÑADAS PARA GARANTIZAR PRECISIÓN, DURABILIDAD
                  Y EXCELENTE DESEMPEÑO.
                </p>

                <a
                  href="https://maps.app.goo.gl/uqvtTFPukRfZUWHs8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span className="text text-1">VER DIRECCIÓN</span>
                  <span className="text text-2" aria-hidden="true">
                    VER DIRECCIÓN
                  </span>
                </a>
              </div>
            </div>

            <img
              src={shape9}
              width="351"
              height="462"
              loading="lazy"
              alt=""
              className="shape shape-2 "
            />
          </section>

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
                </div>
                <ul className="footer-list">
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      MAQUINAS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      CORTE
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      PLANCHADO
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      ACCESORIOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      REPUESTOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      S.TECNICO
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="label-2 footer-link hover-underline !text-white"
                    >
                      CONTACTO
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
        </article>
      </main>
    </div>
  );
};

export default Contacto;
