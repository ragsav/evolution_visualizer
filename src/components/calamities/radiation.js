import React, { useRef, useEffect, useState, useCallback } from "react";

import mojs from "@mojs/core";

import animationData from "../../assets/radiation.json";

import Lottie from "react-lottie";
const Radiation = ({ earthRef, position, amplitude, size, duration }) => {
  const animDom = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const ring4 = useRef();

  useEffect(() => {
    if (animDom && animDom.current) {
      ring1.current = new mojs.Shape({
        parent: animDom.current,
        shape: "circle",
        fill: "none",
        scale: { 0: 1 },

        radius: { 0: Math.floor((4 * size) / 5) },
        strokeWidth: { 30: 0 },
        stroke: "#E96BFF",
        delay: "rand(75, 150)",

        angle: { "rand(-35, -70)": 0 },
        duration: Math.floor(3000 / amplitude),
        left: 0,
        top: 0,
        easing: "cubic.inout",
        className: "no-pointer",
        repeat: Math.floor(duration / Math.floor(3000 / amplitude)),
      });

      ring2.current = new mojs.Shape({
        parent: animDom.current,
        shape: "circle",
        fill: "none",
        scale: { 0: 1 },

        radius: { 0: Math.floor((2 * size) / 3) },
        strokeWidth: { 15: 0 },
        stroke: "#F57657",
        delay: "rand(75, 150)",

        angle: { "rand(-35, -70)": 0 },
        duration: Math.floor(3000 / amplitude),
        left: 0,
        top: 0,
        easing: "cubic.inout",
        className: "no-pointer",
        repeat: Math.floor(duration / Math.floor(3000 / amplitude)),
      });

      ring3.current = new mojs.Shape({
        parent: animDom.current,
        shape: "circle",
        fill: "none",
        scale: { 0: 1 },

        radius: { 0: size },
        strokeWidth: { 10: 0 },
        stroke: "#F57657",
        delay: "rand(75, 150)",

        angle: { "rand(-35, -70)": 0 },
        duration: Math.floor(3000 / amplitude),
        left: 0,
        top: 0,
        easing: "cubic.inout",
        className: "no-pointer",
        repeat: Math.floor(duration / Math.floor(3000 / amplitude)),
      });
      ring4.current = new mojs.Shape({
        parent: animDom.current,
        shape: "circle",
        fill: "none",
        scale: { 0: 1 },

        radius: { 0: Math.floor((3 * size) / 4) },
        strokeWidth: { 10: 0 },
        stroke: "#F57657",
        delay: "rand(75, 150)",

        angle: { "rand(-35, -70)": 0 },
        duration: Math.floor(3000 / amplitude),
        left: 0,
        top: 0,
        easing: "cubic.inout",
        className: "no-pointer",
        repeat: Math.floor(duration / Math.floor(3000 / amplitude)),
      });

      ring1.current.tune(position).play();
      ring2.current.tune(position).play();
      ring3.current.tune(position).play();
      ring4.current.tune(position).play();
    }
  }, [animDom]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div ref={animDom} className="Radiation" style={{ position: "absolute" }}>
      {position ? (
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
      ) : null}
    </div>
  );
};

export default Radiation;
