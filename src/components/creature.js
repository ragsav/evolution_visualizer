import { createRef, useEffect, useRef, useState } from "react";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
const Creature = (props) => {
  const { status, speed,calamities } = useGlobalState();
  //   console.log(earthDimensions);

  const creatureRef = useRef(null);
  const size = 6;
  const [color, setColor] = useState(
    props.birth + 10000 > Date.now() ? "#FF4489" : "#E8FF95"
  );

  const [className, setClassName] = useState(
    props.birth + 10000 > Date.now() ? "babyCreature" : "adultCreature"
  );
  const [position, setPosition] = useState({
    x:props.x?props.x: Math.floor(props.dim.w * Math.random() + props.dim.left - size / 2),
    y:props.y?props.y: Math.floor(props.dim.h * Math.random() + props.dim.top - size / 2),
  });


  function checkCalamity(){
    // console.log(calamities.length)
    if(calamities.length>0){

      for(var i=0;i<calamities.length;i++){
        const xDiff = Math.abs(position.x + size / 2 - calamities[i].position.x);
        const yDiff = Math.abs(position.y + size / 2 - calamities[i].position.y);
        if (
          Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) < calamities[i].size
        ) {
          const event = new CustomEvent("death", {
            detail: { uid: props.uid },
          });
          props.earthRef?.current?.dispatchEvent(event);
        }
      }
      
    }
    
  }

  function changePosition() {
    checkCalamity();


    const pos = [1, -1];
    const skipX = Math.floor(Math.random() * speed);
    const skipY = Math.floor(Math.random() * speed);

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
    setColor(props.birth + 10000 > Date.now() ? "#FF4489" : "#E8FF95");

    setClassName(
      props.birth + 10000 > Date.now() ? "babyCreature" : "adultCreature"
    );
    
  }

  function getNeighbourHood() {
    const neighbourHood = {};
    const neighbours = [];
    if (creatureRef?.current) {
      const children = creatureRef.current?.parentNode?.childNodes;
      if (children) {
        Object.keys(children).forEach((key) => {
          if (
            children[key]?.className.localeCompare("adultCreature") === 0 &&
            Math.abs(children[key].offsetLeft - position.x) < 10 &&
            Math.abs(children[key].offsetTop - position.y) < 10 &&
            children[key].id.localeCompare(props.uid) !== 0
          ) {
            neighbours.push(children[key]);
          }
        });
      }
    }

    neighbourHood.neighbours = neighbours;
    return neighbourHood;
  }

  useEffect(() => {
    // console.log(props.uid);
    if (status.localeCompare("Playing") === 0) {
      const interval = setInterval(() => {
        changePosition();
        if(className.localeCompare("adultCreature")===0){
          const { neighbours } = getNeighbourHood();
          if (neighbours.length > 0) {
            const event = new CustomEvent("birth", {
              detail: {
                mother: props.uid,
                candidates: neighbours,
                position: position,
              },
            });
            props.earthRef?.current?.dispatchEvent(event);
          }
        }
        
      }, Math.floor((Math.random() * 500)) + 10);
      return () => {
        clearInterval(interval);
      };
    }
  }, [position, status, speed]);
  return (
    <div
      className={className}
      ref={creatureRef}
      id={props.uid}
      style={{
        borderRadius: size / 2,
        height: size,
        width: size,
        backgroundColor: color,
        position: "absolute",
        top: position.y,
        left: position.x,
        transition: "all 0.5s ease-in-out",
        WebkitBoxShadow:
          props.birth + 10000 > Date.now() ? "0 0 10px #FF4489" : "none",
        boxShadow:
         
         
         
          props.birth + 10000 > Date.now() ? "0 0 10px #FF4489" : "none",
      }}
    ></div>
  );
};

export default Creature;
