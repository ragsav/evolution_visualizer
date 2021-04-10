import { createRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Creature from "./creature";

import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import Statisitcs from "./statistics";

const demo = Array.from(Array(20).keys());

const Earth = () => {
  const { status, restarted } = useGlobalState();
  const [creatures, setCreatures] = useState([]);
  const [earthDimensions, setEarthDimensions] = useState(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const earthRef = createRef();
  const creaturesRef = useRef([]);

  useEffect(() => {
    if (earthRef && earthRef.current && !earthDimensions) {
      const handler = (e) => {
        if (e.detail) {
          e.detail.candidates.forEach(() => {
            addNewCreature({ color: "#FF0000" });
          });
        }
      };
      earthRef.current.addEventListener("birth", handler);
      return () => earthRef?.current?.removeEventListener("birth", handler);
    }
  }, [earthRef, earthRef.current]);

  function addNewCreature(props) {
    const creaturesTemp = creaturesRef.current;
    creaturesTemp.push({
      uid: uuidv4(),
      color: props?.color ? props.color : "#000000",
    });
    setCreatures([...creaturesTemp]);
    creaturesRef.current = creaturesTemp;
  }

  function removeRandom() {
    const creaturesTemp = creaturesRef.current;
    creaturesTemp.splice(
      Math.floor(Math.random() * creaturesRef.current.length),
      1
    );
    setCreatures([...creaturesTemp]);
    creaturesRef.current = creaturesTemp;
  }

  function InitializeCreatures() {
    creaturesRef.current = [];
    for (var i = 0; i < 20; i++) {
      addNewCreature({ color: "#111111" });
    }
  }
  useEffect(() => {
    if (restarted) {
      InitializeCreatures();
    }
  }, [restarted]);

  useEffect(() => {
    if (earthRef && earthRef.current && !earthDimensions) {
      setEarthDimensions({
        top: earthRef.current.offsetTop,
        left: earthRef.current.offsetLeft,
        w: earthRef.current.offsetWidth,
        h: earthRef.current.offsetHeight,
      });
    }
  }, [earthRef]);
  return (
    <div
      ref={earthRef}
      style={{ backgroundColor: "#2C931D", height: "100%", width: "100%" }}
      onMouseDown={(e) => {
        // console.log(onClick);
        e.preventDefault();
        if (e.button === 0) {
          addNewCreature({ color: "#004CFF" });
        } else {
          removeRandom();
        }
      }}
    >
      {earthRef && earthDimensions
        ? creatures.map((creature) => {
            return (
              <Creature
                color={creature.color}
                key={creature.uid}
                uid={creature.uid}
                earthRef={earthRef}
                dim={earthDimensions}
              ></Creature>
            );
          })
        : null}
      {isStatsVisible === false ? (
        <IconButton
          style={{ position: "absolute", top: 5, left: 5 }}
          onClick={(e) => {
            e.preventDefault();
            setIsStatsVisible(true);
          }}
        >
          <DehazeIcon style={{ color: "white" }}></DehazeIcon>
        </IconButton>
      ) : (
        <Statisitcs
          setIsStatsVisible={setIsStatsVisible}
          style={{ position: "absolute", top: 5, left: 5 }}
        ></Statisitcs>
      )}
    </div>
  );
};

export default Earth;
