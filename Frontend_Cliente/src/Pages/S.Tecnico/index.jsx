import { useEffect, useRef } from "react";
import "./style.css";

import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
import image9 from "./images/image9.png";

export default function ServicioTecnico() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const items = [
    {
      id: 1,
      img: image1,
      author: "MAQUINAS",
      title: "MAQUINAS CASERAS",
      topic: "SERVICIO DE MANTENIMIENTO",
      desc: "Mantenimiento preventivo y correctivo para todo tipo de máquinas de coser domésticas.",
    },
    {
      id: 2,
      img: image2,
      author: "MAQUINAS",
      title: "MAQUINAS INDUSTRIALES",
      topic: "REPARACIÓN ESPECIALIZADA",
      desc: "Servicio técnico experto para maquinaria industrial de confección y textiles.",
    },
    {
      id: 3,
      img: image3,
      author: "REPUESTOS",
      title: "REFACCIONES ORIGINALES",
      topic: "VENTA Y ASESORÍA",
      desc: "Contamos con un amplio catálogo de repuestos originales para garantizar la durabilidad.",
    },
    {
      id: 4,
      img: image4,
      author: "MAQUINAS",
      title: "BORDADORAS",
      topic: "SOPORTE TÉCNICO",
      desc: "Diagnóstico y reparación de bordadoras computarizadas de múltiples cabezales.",
    },
    {
      id: 5,
      img: image5,
      author: "MAQUINAS",
      title: "REMALLADORAS",
      topic: "AJUSTE Y CALIBRACIÓN",
      desc: "Puesta a punto de remalladoras para asegurar costuras perfectas y eficientes.",
    },
    {
      id: 6,
      img: image6,
      author: "SERVICIO",
      title: "VISITAS TÉCNICAS",
      topic: "ATENCIÓN A DOMICILIO",
      desc: "Nuestros técnicos visitan tu taller o domicilio para solucionar problemas in situ.",
    },
    {
      id: 7,
      img: image7,
      author: "MAQUINAS",
      title: "RECUBRIDORAS",
      topic: "MANTENIMIENTO INTEGRAL",
      desc: "Servicio completo para recubridoras, optimizando el rendimiento de tu producción.",
    },
    {
      id: 8,
      img: image8,
      author: "MAQUINAS",
      title: "CORTADORAS DE TELA",
      topic: "AFILADO Y REPARACIÓN",
      desc: "Mantenimiento de cortadoras verticales y circulares para cortes precisos.",
    },
    {
      id: 9,
      img: image9,
      author: "CONSULTAS",
      title: "ASESORÍA TÉCNICA",
      topic: "SOLUCIONES TEXTILES",
      desc: "Te orientamos en la compra y mantenimiento de tu parque de maquinaria.",
    },
  ];

  useEffect(() => {
    const nextDom = nextRef.current;
    const prevDom = prevRef.current;
    const carouselDom = carouselRef.current;
    const listItemDom = listRef.current;
    const thumbnailDom = thumbnailRef.current;

    let timeRunning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runAutoRun;

    const showSlider = (type) => {
      const itemSlider = listItemDom.querySelectorAll(".st-item");
      const itemThumbnail = thumbnailDom.querySelectorAll(".st-item");

      if (type === "next") {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add("next");
      } else {
        const positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    nextDom.onclick = () => showSlider("next");
    prevDom.onclick = () => showSlider("prev");

    runAutoRun = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runAutoRun);
    };
  }, []);

  return (
    <section className="st-wrapper">
      <div className="st-carousel" ref={carouselRef}>
        <div className="st-list" ref={listRef}>
          {items.map((item) => (
            <div className="st-item" key={item.id}>
              <img src={item.img} alt={`Imagen ${item.id}`} />
              <div className="st-content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.desc}</div>
                <div className="buttons">
                  <button>SOLICITAR MANTENIMIENTO</button>
                  <button>SOLICITAR MANTENIMIENTO</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* THUMBNAILS (Miniaturas) */}
        <div className="st-thumbnail" ref={thumbnailRef}>
          {/* Rotamos el array para que la miniatura empiece desde la segunda imagen (efecto visual original) */}
          {[...items.slice(1), items[0]].map((item) => (
            <div className="st-item" key={item.id}>
              <img src={item.img} alt={`Thumbnail ${item.id}`} />
              <div className="st-content">
                <div className="title">{item.title}</div>
                <div className="des">{item.topic}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FLECHAS */}
        <div className="st-arrows">
          <button ref={prevRef} id="prev">
            {"<"}
          </button>
          <button ref={nextRef} id="next">
            {">"}
          </button>
        </div>

        {/* BARRA DE TIEMPO */}
        <div className="st-time"></div>
      </div>
    </section>
  );
}
