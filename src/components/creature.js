import { createRef, useEffect, useRef, useState } from "react";
import { useGlobalActions, useGlobalState } from "../context/globalContext";





const Creature = (props) => {
  const { status, speed, calamities, resources } = useGlobalState();
  const creatureRef = useRef(null);
  const size = useRef(props.size ? props.size : 6);
  const [color, setColor] = useState(
    props.birth + 10000 > Date.now() ? "#FF4489" : "#E8FF95"
  );
  const [className, setClassName] = useState(
    props.birth + 10000 > Date.now() ? "babyCreature" : "adultCreature"
  );
  const [position, setPosition] = useState({
    x: props.x
      ? props.x
      : Math.floor((props.dim.w - 20) * Math.random() - size.current / 2 + 10),
    y: props.y
      ? props.y
      : Math.floor((props.dim.h - 20) * Math.random() - size.current / 2 + 10),
  });


  function increaseSize() {
    size.current = 10;
  }

  //destroy self
  function selfDestroy() {
    const event = new CustomEvent("death", {
      detail: { uid: props.uid },
    });
    props.earthRef?.current?.dispatchEvent(event);
  }


  //check if there is any calamity nearby
  function checkCalamity() {
    if (calamities.length > 0) {
      for (var i = 0; i < calamities.length; i++) {
        const xDiff = Math.abs(
          position.x + size.current / 2 - calamities[i].position.x
        );
        const yDiff = Math.abs(
          position.y + size.current / 2 - calamities[i].position.y
        );
        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        if (distance < calamities[i].size) {
          selfDestroy();
        }
      }
    }
  }


  //check if there is any water body nearby
  function checkResources() {
    if (resources.length > 0) {
      for (var i = 0; i < resources.length; i++) {
        const xDiff = Math.abs(
          position.x + size.current / 2 - resources[i].position.x
        );
        const yDiff = Math.abs(
          position.y + size.current / 2 - resources[i].position.y
        );

        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        if (distance < resources[i].size / 2 + 30) {
          if (distance < resources[i].size / 2) {
            //do something here asumming the creature becomes wwater animal
          } else {
            increaseSize();
          }
        }
      }
    }
  }


  function changeColor(){
    if (
      props.birth + 10000 < Date.now() &&
      color.localeCompare("#FF4489") === 0
    )
      setColor("#E8FF95");
  }
  
  function changeClassName(){
    if (
      props.birth + 10000 < Date.now() &&
      className.localeCompare("babyCreature") === 0
    )
      setClassName("adultCreature");
  }
  
  function canReproduce() {
    if (className.localeCompare("adultCreature") === 0) {
      return true;
    } else {
      return false;
    }
  }


  //change position randomly *update to tendency based position change*
  function changePosition() {
    const pos = [1, -1];
    const skipX = Math.floor(Math.random() * speed);
    const skipY = Math.floor(Math.random() * speed);

    const plusMinusX = Math.floor(Math.random() * 2);
    const plusMinusY = Math.floor(Math.random() * 2);

    const newPosition = {
      x: position.x + pos[plusMinusX] * skipX,
      y: position.y + pos[plusMinusY] * skipY,
    };

    if (newPosition.x + size.current + 10 > props.dim.w) {
      newPosition.x = props.dim.w - size.current - 10;
    }
    if (newPosition.y + size.current + 10 > props.dim.h) {
      newPosition.y = props.dim.h - size.current - 10;
    }
    if (newPosition.x < 10) {
      newPosition.x = 10;
    }
    if (newPosition.y < 10) {
      newPosition.y = 10;
    }

    setPosition(newPosition);
  }



  //get all neighbouring adults
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

  //send birth request to earth
  function birthRequest(neighbour) {
    const mother = { id: props.uid, position: position, size: size.current };
    const father = {
      id: neighbour.id,
      position: {
        x: neighbour.offsetLeft,
        y: neighbour.offsetTop,
      },
      size: neighbour.clientWidth,
    };

    
    const event = new CustomEvent("birth", {
      detail: { mother, father },
    });
    props.earthRef?.current?.dispatchEvent(event);
  }

  //regular activity function
  function doActivities(){
    checkCalamity();
    checkResources();
    
    changePosition();
    changeColor();
    changeClassName();
    
    const { neighbours } = getNeighbourHood();

    if (
      canReproduce() &&
      neighbours.length > 0
    ) {
      birthRequest(neighbours[0]);
    }
  }


  useEffect(() => {
    if (status.localeCompare("Playing") === 0) {
      const interval = setInterval(() => {
        doActivities();
      }, Math.floor(Math.random() * 500) + 10);
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
        borderRadius: size.current / 2,
        height: size.current,
        width: size.current,
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
