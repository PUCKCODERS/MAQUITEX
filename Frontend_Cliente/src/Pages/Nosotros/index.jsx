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
import menu1 from "./images/menu-1.png";
import menu2 from "./images/menu-2.png";
import menu3 from "./images/menu-3.png";
import menu4 from "./images/menu-4.png";
import menu5 from "./images/menu-5.png";
import menu6 from "./images/menu-6.png";
import shape5 from "./images/shape-5.png";
import shape6 from "./images/shape-6.png";
import testimonialBg from "./images/testimonial-bg.jpg";
import testiAvatar from "./images/testi-avatar.jpg";
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
                <p className="label-2 section-subtitle slider-reveal">
                  Tradational & Hygine
                </p>
                <h1 className="display-1 hero-title slider-reveal">
                  For the love of <br />
                  delicious food
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  Come with family & feel the joy of mouthwatering food
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View Our Menu
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
                    className="img-cover"
                  />
                </div>
                <p className="label-2 section-subtitle slider-reveal">
                  delightful experience
                </p>
                <h1 className="display-1 hero-title slider-reveal">
                  Flavors Inspired by <br />
                  the Seasons
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  Come with family & feel the joy of mouthwatering food
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View Our Menu
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
                <p className="label-2 section-subtitle slider-reveal">
                  amazing & delicious
                </p>
                <h1 className="display-1 hero-title slider-reveal">
                  Where every flavor <br />
                  tells a story
                </h1>
                <p className="body-2 hero-text slider-reveal">
                  Come with family & feel the joy of mouthwatering food
                </p>
                <a href="#" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View Our Menu
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
              <GrPrevious />
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
              <p className="section-subtitle label-2">Flavors For Royalty</p>
              <h2 className="headline-1 section-title">We Offer Top Notch</h2>
              <p className="section-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum has been the industrys standard dummy text
                ever.
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
                        <a href="#">Breakfast</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        View Menu
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
                        <a href="#">Appetizers</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        View Menu
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
                        <a href="#">Drinks</a>
                      </h3>
                      <a href="#" className="btn-text hover-underline label-2">
                        View Menu
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
                <p className="label-2 section-subtitle" id="about-label">
                  Our Story
                </p>
                <h2 className="headline-1 section-title">
                  Every Fla vor Tells a Story
                </h2>
                <p className="section-text">
                  Lorem Ipsum is simply dummy text of the printingand
                  typesetting industry lorem Ipsum has been the industrys
                  standard dummy text ever since the when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book It has survived not only five centuries, but also the
                  leap into.
                </p>
                <div className="contact-label">Book Through Call</div>
                <a
                  href="tel:+804001234567"
                  className="body-1 contact-number hover-underline"
                >
                  +80 (400) 123 4567
                </a>
                <a href="#" className="btn btn-primary">
                  <span className="text text-1">Read More</span>
                  <span className="text text-2" aria-hidden="true">
                    Read More
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

                <p className="section-subtitle label-2">Special Dish</p>
                <h2 className="headline-1 section-title">Lobster Tortellini</h2>
                <p className="section-text">
                  Lorem Ipsum is simply dummy text of the printingand
                  typesetting industry lorem Ipsum has been the industrys
                  standard dummy text ever since the when an unknown printer
                  took a galley of type.
                </p>
                <div className="wrapper">
                  <del className="del body-3">$40.00</del>
                  <span className="span body-1">$20.00</span>
                </div>
                <a href="#" className="btn btn-primary">
                  <span className="text text-1">View All Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View All Menu
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
              <p className="section-subtitle text-center label-2">
                Special Selection
              </p>
              <h2 className="headline-1 section-title text-center">
                Delicious Menu
              </h2>
              <ul className="grid-list">
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu1}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Greek Salad"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Greek Salad
                          </a>
                        </h3>
                        <span className="badge label-1">Seasonal</span>
                        <span className="span title-2">$25.50</span>
                      </div>
                      <p className="card-text label-1">
                        Tomatoes, green bell pepper, sliced cucumber onion,
                        olives, and feta cheese.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu2}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Lasagne"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Lasagne
                          </a>
                        </h3>
                        <span className="span title-2">$40.00</span>
                      </div>
                      <p className="card-text label-1">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu3}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Butternut Pumpkin"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Butternut Pumpkin
                          </a>
                        </h3>
                        <span className="span title-2">$10.00</span>
                      </div>
                      <p className="card-text label-1">
                        Typesetting industry lorem Lorem Ipsum is simply dummy
                        text of the priand.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu4}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Tokusen Wagyu"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Tokusen Wagyu
                          </a>
                        </h3>
                        <span className="badge label-1">New</span>
                        <span className="span title-2">$39.00</span>
                      </div>
                      <p className="card-text label-1">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu5}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Olivas Rellenas"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Olivas Rellenas
                          </a>
                        </h3>
                        <span className="span title-2">$25.00</span>
                      </div>
                      <p className="card-text label-1">
                        Avocados with crab meat, red onion, crab salad stuffed
                        red bell pepper and green bell pepper.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="menu-card hover:card">
                    <figure
                      className="card-banner img-holder"
                      style={{ "--width": "100", "--height": "100" }}
                    >
                      <img
                        src={menu6}
                        width="100"
                        height="100"
                        loading="lazy"
                        alt="Opu Fish"
                        className="img-cover"
                      />
                    </figure>
                    <div>
                      <div className="title-wrapper">
                        <h3 className="title-3">
                          <a href="#" className="card-title">
                            Opu Fish
                          </a>
                        </h3>
                        <span className="span title-2">$49.00</span>
                      </div>
                      <p className="card-text label-1">
                        Vegetables, cheeses, ground meats, tomato sauce,
                        seasonings and spices
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <p className="menu-text text-center">
                During winter daily from <span className="span">7:00 pm</span>{" "}
                to <span className="span">9:00 pm</span>
              </p>
              <a href="#" className="btn btn-primary">
                <span class="text text-1">View All Menu</span>
                <span class="text text-2" aria-hidden="true">
                  View All Menu
                </span>
              </a>
              <img
                src={shape5}
                width="921"
                height="1036"
                loading="lazy"
                alt="shape"
                className="shape shape-2 move-anim"
              />
              <img
                src={shape6}
                width="343"
                height="345"
                loading="lazy"
                alt="shape"
                className="shape shape-3 move-anim"
              />
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
              <div className="quote">”</div>
              <p className="headline-2 testi-text">
                I wanted to thank you for inviting me down for that amazing
                dinner the other night. The food was extraordinary.
              </p>
              <div className="wrapper">
                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
              </div>
              <div className="profile">
                <img
                  src={testiAvatar}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="Sam Jhonson"
                  className="img"
                />
                <p className="label-2 profile-name">Sam Jhonson</p>
              </div>
            </div>
          </section>

          {/* RESERVATION */}
          <section className="reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form action="" className="form-left">
                  <h2 className="headline-1 text-center">Online Reservation</h2>
                  <p className="form-text text-center">
                    Booking request{" "}
                    <a href="tel:+88123123456" className="link">
                      +88-123-123456
                    </a>
                    or fill out the order form
                  </p>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="off"
                      className="input-field"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
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
                      <select name="person" className="input-field">
                        <option value="1-person">1 Person</option>
                        <option value="2-person">2 Person</option>
                        <option value="3-person">3 Person</option>
                        <option value="4-person">4 Person</option>
                        <option value="5-person">5 Person</option>
                        <option value="6-person">6 Person</option>
                        <option value="7-person">7 Person</option>
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
                      <select name="person" className="input-field">
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
                    placeholder="Message"
                    autoComplete="off"
                    className="input-field"
                  ></textarea>
                  <button type="submit" className="btn btn-secondary">
                    <span className="text text-1">Book A Table</span>
                    <span className="text text-2" aria-hidden="true">
                      Book A Table
                    </span>
                  </button>
                </form>
                <div
                  className="form-right text-center"
                  style={{
                    backgroundImage: `url(${formPattern})`,
                  }}
                >
                  <h2 className="headline-1 text-center">Contact Us</h2>
                  <p className="contact-label">Booking Request</p>
                  <a
                    href="tel:+88123123456"
                    className="body-1 contact-number hover-underline"
                  >
                    +88-123-123456
                  </a>
                  <div className="separator"></div>
                  <p className="contact-label">Location</p>
                  <address className="body-4">
                    Restaurant St, Delicious City, <br />
                    London 9578, UK
                  </address>
                  <p className="contact-label">Lunch Time</p>
                  <p className="body-4">
                    Monday to Sunday <br />
                    11.00 am - 2.30pm
                  </p>
                  <p className="contact-label">Dinner Time</p>
                  <p className="body-4">
                    Monday to Sunday <br />
                    05.00 pm - 10.00pm
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
              <p className="section-subtitle label-2">Why Choose Us</p>
              <h2 className="headline-1 section-title">Our Strength</h2>
              <ul className="grid-list">
                <li className="feature-item !shadow-[6px_5px_6px_#000]">
                  <div className="feature-card ">
                    <div className="card-icon">
                      <GiSewingMachine className="text-[75px]" />
                    </div>
                    <h3 className="title-2 card-title">Hygienic Food</h3>
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
                    <h3 className="title-2 card-title"> Environment</h3>
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
                    <h3 className="title-2 card-title">Skilled Chefs</h3>
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
                    <h3 className="title-2 card-title">Event & Party</h3>
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
              <p className="section-subtitle label-2 text-center">
                Recent Updates
              </p>
              <h2 className="section-title headline-1 text-center">
                Upcoming Event
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
                      <time
                        className="publish-date label-2"
                        dateTime="2022-09-15"
                      >
                        15/09/2022
                      </time>
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        Food, Flavour
                      </p>
                      <h3 className="card-title title-2 text-center">
                        Flavour so good you’ll try to eat with your eyes.
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
                      <time
                        className="publish-date label-2"
                        dateTime="2022-09-08"
                      >
                        08/09/2022
                      </time>
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        Healthy Food
                      </p>
                      <h3 className="card-title title-2 text-center">
                        Flavour so good you’ll try to eat with your eyes.
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
                      <time
                        className="publish-date label-2"
                        dateTime="2022-09-03"
                      >
                        03/09/2022
                      </time>
                    </div>
                    <div className="card-content">
                      <p className="card-subtitle label-2 text-center">
                        Recipie
                      </p>
                      <h3 className="card-title title-2 text-center">
                        Flavour so good you’ll try to eat with your eyes.
                      </h3>
                    </div>
                  </div>
                </li>
              </ul>
              <a href="#" className="btn btn-primary">
                <span class="text text-1">View Our Blog</span>
                <span class="text text-2" aria-hidden="true">
                  View Our Blog
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
              <p className="title-1 !text-[#082c55]">Get News & Offers</p>
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
          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2022 Grilli. All Rights Reserved | Crafted by{" "}
              <a
                href="https://github.com/codewithsadee"
                target="_blank"
                className="link"
              >
                codewithsadee
              </a>
            </p>
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
        <ion-icon
          name="chevron-up"
          aria-hidden="true"
          style={{ color: "white" }}
        ></ion-icon>
      </a>
    </div>
  );
};

export default Nosotros;
