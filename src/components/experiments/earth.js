import { useEffect, useRef, useState } from "react";
import { Vector } from "./vector";
import { Ball } from "./ball";
import { Wall } from "./wall";
const BALLZ = [];
const WALLZ = [];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Earth = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = document.getElementById("canvas");
      const ctx_2 = canvas.getContext("2d");
      canvasRef.current.focus();
      setCtx(ctx_2);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (ctx) {
      for (let i = 0; i < 20; i++) {
        let newBall = new Ball(
          randInt(0, window.innerWidth - 20),
          randInt(0, window.innerHeight - 20),
          5,
          BALLZ
        );
        newBall.elasticity = randInt(0, 10) / 10;
      }
      BALLZ[0].player = true;
      let edge1 = new Wall(0, 0, canvasRef.current.clientWidth, 0, WALLZ);
      let edge2 = new Wall(
        canvasRef.current.clientWidth,
        0,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
        WALLZ
      );
      let edge3 = new Wall(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
        0,
        canvasRef.current.clientHeight,
        WALLZ
      );
      let edge4 = new Wall(0, canvasRef.current.clientHeight, 0, 0, WALLZ);
      requestAnimationFrame(mainLoop);
    }
  }, [ctx]);

  function mainLoop(timestamp) {
    ctx.clearRect(
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    BALLZ.forEach((b, index) => {
      b.drawBall(ctx);
      b.reposition(ctx);
    });

    // if (Math.random() > 0.7) {
    //   BALLZ.push(
    //     new Ball(randInt(100, 500), randInt(50, 400), 5, randInt(0, 10), BALLZ)
    //   );
    // }

    requestAnimationFrame(mainLoop);
  }

  return (
    <canvas
      tabIndex={1}
      id="canvas"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ backgroundColor: "#222222" }}
    ></canvas>
  );
};

export default Earth;
