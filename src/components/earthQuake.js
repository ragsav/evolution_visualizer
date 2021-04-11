import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGlobalState } from "../context/globalContext";
import mojs from "@mojs/core";
const EarthQuake = ({ duration, earthRef }) => {
  const animDom = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const ring4 = useRef();
  const ring5 = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    earthQuakeDuration,
    earthQuakeAmplitude,
    earthQuakeRadius,
  } = useGlobalState();
  useEffect(() => {
    if (animDom && animDom.current) {
      if (!ring1.current) {
        ring1.current = new mojs.Shape({
          parent: animDom.current,
          shape: "circle",
          fill: "none",
          scale: { 0: 1 },

          radius: { 0: Math.floor(earthQuakeRadius / 3) },
          strokeWidth: { 30: 0 },
          stroke: "#E96BFF",
          delay: "rand(75, 150)",

          angle: { "rand(-35, -70)": 0 },
          duration: Math.floor(3000 / earthQuakeAmplitude),
          left: 0,
          top: 0,
          easing: "cubic.inout",
          className: "no-pointer",
          repeat: Math.floor(
            earthQuakeDuration / Math.floor(3000 / earthQuakeAmplitude)
          ),
        });
      }
      if (!ring2.current) {
        ring2.current = new mojs.Shape({
          parent: animDom.current,
          shape: "circle",
          fill: "none",
          scale: { 0: 1 },

          radius: { 0: Math.floor((2 * earthQuakeRadius) / 3) },
          strokeWidth: { 15: 0 },
          stroke: "#F57657",
          delay: "rand(75, 150)",

          angle: { "rand(-35, -70)": 0 },
          duration: Math.floor(3000 / earthQuakeAmplitude),
          left: 0,
          top: 0,
          easing: "cubic.inout",
          className: "no-pointer",
          repeat: Math.floor(
            earthQuakeDuration / Math.floor(3000 / earthQuakeAmplitude)
          ),
        });
      }
      if (!ring3.current) {
        ring3.current = new mojs.Shape({
          parent: animDom.current,
          shape: "circle",
          fill: "none",
          scale: { 0: 1 },

          radius: { 0: earthQuakeRadius },
          strokeWidth: { 10: 0 },
          stroke: "#F57657",
          delay: "rand(75, 150)",

          angle: { "rand(-35, -70)": 0 },
          duration: Math.floor(3000 / earthQuakeAmplitude),
          left: 0,
          top: 0,
          easing: "cubic.inout",
          className: "no-pointer",
          repeat: Math.floor(
            earthQuakeDuration / Math.floor(3000 / earthQuakeAmplitude)
          ),
        });
      }
    }
  }, [animDom, earthQuakeDuration, earthQuakeAmplitude, earthQuakeRadius]);

  // Update the animation values when the prop changes
  useEffect(() => {
    if (earthRef && earthRef.current) {
      const handler = (e) => {
        if (e.detail) {
          ring1.current.tune({ x: e.detail.x, y: e.detail.y }).play();
          ring2.current.tune({ x: e.detail.x, y: e.detail.y }).play();
          ring3.current.tune({ x: e.detail.x, y: e.detail.y }).play();
        }
      };
      earthRef.current.addEventListener("earthQuake", handler);
      return () =>
        earthRef?.current?.removeEventListener("earthQuake", handler);
    }
  });

  return (
    <div
      ref={animDom}
      className="EarthQuake"
      style={{ position: "absolute" }}
    ></div>
  );
};

export default EarthQuake;
