import React, { useRef, useEffect, useState, useCallback } from "react";
import animationData from "../../assets/volcana.json";
import mojs from "@mojs/core";
import Lottie from "react-lottie";
const Volcano = ({ earthRef, position, amplitude, size, duration }) => {
  const animDom = useRef();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="Volcano" style={{ position: "absolute" }} ref={animDom}>
      <div
        className="Volcano"
        style={{
          position: "absolute",
          top: position.y - size / 2,
          left: position.x - size / 2,
        }}
      >
        <Lottie
          options={defaultOptions}
          height={size}
          width={size}
          style={{ transition: "all 2s linear" }}
        />
      </div>
    </div>
  );
};

export default Volcano;
