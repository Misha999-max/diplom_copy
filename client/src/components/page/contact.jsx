/* eslint-disable react/prop-types */

import React from "react";
import {
  YMaps,
  Map,
  SearchControl,
  TrafficControl,
  Placemark,
} from "@pbe/react-yandex-maps";

const ContactPage = () => {
  return (
    <div className="map">
      <YMaps>
        <div className="map__item">
          <Map
            style={{
              width: "520px",
              height: "340px",
              border: "3px solid black",
            }}
            defaultState={{ center: [59.99, 30.43], zoom: 10 }}
          >
            <SearchControl options={{ float: "left" }} />
            <TrafficControl options={{ float: "right" }} />
            <Placemark geometry={[59.994958, 30.438521]} />
          </Map>
          <div className="map__contact">
            <h1>My contacts:</h1>
            <p>email: mihailkalacev9@gmail.com</p>
            <p>Phone: +7952-350-46-44</p>
          </div>
        </div>
      </YMaps>
    </div>
  );
};

export default ContactPage;
