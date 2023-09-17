/* eslint-disable react/prop-types */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import couruselService from "../../services/courusel.services";

const CarouselItem = () => {
  const [index, setIndex] = useState(0);

  const [foto, setFoto] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    couruselService.get().then(({ list }) => {
      setFoto(list);
    });
  }, []);

  return (
    <div className="carousel__slide">
      <Carousel
        className="mr-auto"
        activeIndex={index}
        onSelect={handleSelect}
        fade
      >
        {foto &&
          foto.map((fotos, index) => (
            <Carousel.Item key={fotos._id}>
              <img
                className="d-block w-100"
                src={fotos.couresel}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{index + 1}slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
