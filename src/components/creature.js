import { createRef, useEffect, useRef, useState } from "react";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
const Creature = (props) => {
  const { status, speed } = useGlobalState();
  //   console.log(earthDimensions);
  const creatureRef = useRef(null);
  const size = 6;
  const [color, setColor] = useState(props.color ? props.color : "#0000000");
  const [position, setPosition] = useState({
    x: Math.floor(props.dim.w * Math.random() + props.dim.left - size / 2),
    y: Math.floor(props.dim.h * Math.random() + props.dim.top - size / 2),
  });

  function changePosition() {
    const pos = [1, -1];
    const skipX = Math.floor(Math.random() * 20);
    const skipY = Math.floor(Math.random() * 20);

    const plusMinusX = Math.floor(Math.random() * 2);
    const plusMinusY = Math.floor(Math.random() * 2);

    const newPosition = {
      x: position.x + pos[plusMinusX] * skipX,
      y: position.y + pos[plusMinusY] * skipY,
    };

    if (newPosition.x + size > props.dim.w + props.dim.left) {
      newPosition.x = props.dim.w + props.dim.left - size;
    }
    if (newPosition.y + size > props.dim.h + props.dim.top) {
      newPosition.y = props.dim.h + props.dim.top - size;
    }
    if (newPosition.x < props.dim.left) {
      newPosition.x = props.dim.left;
    }
    if (newPosition.y < props.dim.top) {
      newPosition.y = props.dim.top;
    }

    setPosition(newPosition);
  }

  function getNeighbourHood() {
    const neighbours = [];
    if (creatureRef?.current) {
      const children = creatureRef.current?.parentNode?.childNodes;
      if (children) {
        Object.keys(children).forEach((key) => {
          if (
            children[key]?.nodeName === "DIV" &&
            Math.abs(children[key].offsetLeft - position.x) < 10 &&
            Math.abs(children[key].offsetTop - position.y) < 10 &&
            children[key].id.localeCompare(props.uid) !== 0
          ) {
            neighbours.push(children[key]);
          }
        });
      }
    }

    return { neighbours };
  }

  useEffect(() => {
    // console.log(props.uid);
    if (status.localeCompare("Playing") === 0) {
      const interval = setInterval(() => {
        changePosition();
        setColor("#000000");
        const { neighbours } = getNeighbourHood();
        if (neighbours.length > 0) {
          const event = new CustomEvent("birth", {
            detail: { mother: props.uid, candidates: neighbours },
          });
          props.earthRef?.current?.dispatchEvent(event);
        }
      }, Math.floor((Math.random() * 5000) / speed) + 10);
      return () => {
        clearInterval(interval);
      };
    }
  }, [position, status, speed]);
  return (
    <div
      ref={creatureRef}
      id={props.uid}
      style={{
        borderRadius: size / 2,
        height: size,
        width: size,
        backgroundColor: props.color,
        position: "absolute",
        top: position.y,
        left: position.x,
        transition: "all 0.5s ease-in-out",
      }}
    ></div>
  );
};

export default Creature;
