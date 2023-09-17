import React, { useEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";
import banner from "../../images/headerBanner.png";

const HeaderBanner = () => {
  let logoItemImg = useRef(null);
  let logoItemText = useRef(null);

  useEffect(() => {
    console.log(logoItemImg);
    gsap.to(logoItemImg, 4.3, {
      opacity: 1,
      x: 260,
      ease: Power3.easeInOut,
    });
    gsap.to(logoItemText, 4.3, {
      opacity: 1,
      x: -260,
      scale: 1.7,
      color: "red",
      ease: Power3.easeInOut,
    });
  }, []);
  return (
    <div className="header__banner">
      <h1 className="header__banner-text" ref={(el) => (logoItemText = el)}>
        Самый крутой магазин
      </h1>
      <img
        ref={(el) => {
          logoItemImg = el;
        }}
        className="header__banner-img"
        src={`${banner}`}
        alt="banner"
      />
    </div>
  );
};

export default HeaderBanner;
