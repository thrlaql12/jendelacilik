// src/components/Banner.jsx
import React from "react";
import { Carousel } from "antd";
import "../styles/banner.css";

const banners = [
  {
    img: "/images/banner1.jpg",
    title: "One Click Demo Import",
    subtitle:
      "Save your time! Our CWS Demo Import plugin allows you reflect the demo site within a mouse click.",
  },
  {
    img: "/images/banner2.jpg",
    title: "Belajar Ceria",
    subtitle: "Yuk temukan cerita dan lagu menarik setiap harinya!",
  },
];

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel autoplay>
        {banners.map((item, index) => (
          <div className="banner-slide" key={index}>
            <img src={item.img} alt={`banner-${index}`} />
            <div className="banner-text">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
