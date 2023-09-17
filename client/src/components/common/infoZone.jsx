import React from "react";

import img1 from "../../images/1792420.png";
import img2 from "../../images/2696942.png";
import img3 from "../../images/5523947.png";
import img4 from "../../images/7984357.png";

const InfoZone = () => {
  return (
    <div className="info">
      <div className="info__item">
        <img src={`${img1}`} alt="logo" />
        <p className="info__item-text">Удобство использования </p>
      </div>
      <div className="info__item">
        <img src={`${img2}`} alt="logo" />
        <p className="info__item-text"> Прозрачность сделки </p>
      </div>
      <div className="info__item">
        <img src={`${img3}`} alt="logo" />
        <p className="info__item-text"> Помогаем природе </p>
      </div>
      <div className="info__item">
        <img src={`${img4}`} alt="logo" />
        <p className="info__item-text"> Постоянное обучение </p>
      </div>
    </div>
  );
};

export default InfoZone;
