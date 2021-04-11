import { createRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Creature from "./creature";

import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import Statisitcs from "./statistics";
import EarthQuake from "./earthQuake";

// const demo = Array.from(Array(100).keys());

const Earth = () => {
  const {
    status,
    restarted,
    earthQuakePosition,
    earthQuakeDuration,
  } = useGlobalState();
  const { setEarthQuakePosition } = useGlobalActions();
  const [creatures, setCreatures] = useState([]);
  const [earthDimensions, setEarthDimensions] = useState(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [mouseOnStats, setMouseOnStats] = useState(false);
  const earthRef = createRef();
  const creaturesRef = useRef([]);
  const birthCache = useRef([]);

  function newBirth(parents) {
    const birthCacheTemp = birthCache.current;
    const l = birthCacheTemp.length;

    var canGiveBirth = true;
    for (var i = 0; i < l; i++) {
      if (
        (birthCacheTemp[i].mother.localeCompare(parents.mother) === 0 ||
          birthCacheTemp[i].mother.localeCompare(parents.father) === 0) &&
        (birthCacheTemp[i].father.localeCompare(parents.mother) === 0 ||
          birthCacheTemp[i].father.localeCompare(parents.father) === 0)
      ) {
        // console.log("BirthCache hit!", parents, birthCacheTemp);
        canGiveBirth = false;
        break;
      }
    }

    if (birthCacheTemp.length === 0 || canGiveBirth) {
      addNewCreature({ x: parents.x, y: parents.y });
      birthCacheTemp.push({ ...parents });
    }
    if (birthCacheTemp.length > 100) {
      birthCacheTemp.shift();
    }
    birthCache.current = birthCacheTemp;
  }
  useEffect(() => {
    if (earthRef && earthRef.current && !earthDimensions) {
      const birthHandler = (e) => {
        if (e.detail) {
          newBirth({
            mother: e.detail.mother,
            father: e.detail.candidates[0].id,
            x:
              Math.floor(
                e.detail.position.x + e.detail.candidates[0].offsetLeft
              ) / 2,
            y:
              Math.floor(
                e.detail.position.y + e.detail.candidates[0].offsetTop
              ) / 2,
            positionM: e.detail.position,
            positionF: {
              x: e.detail.candidates[0].offsetLeft,
              y: e.detail.candidates[0].offsetTop,
            },
          });
        }
      };
      const deathHandler = (e) => {
        if (e.detail) {
          removeCreatureByUid(e.detail.uid);
        }
      };
      earthRef.current.addEventListener("birth", birthHandler);
      earthRef.current.addEventListener("death", deathHandler);
      return () => {
        earthRef?.current?.removeEventListener("birth", birthHandler);
        earthRef?.current?.removeEventListener("death", deathHandler);
      };
    }
  }, [earthRef, earthRef.current]);

  function addNewCreature(props) {
    const creaturesTemp = creaturesRef.current;
    creaturesTemp.push({
      uid: uuidv4(),
      birth: Date.now(),
      x: props ? props.x : null,
      y: props ? props.y : null,
    });
    setCreatures([...creaturesTemp]);
    creaturesRef.current = creaturesTemp;
  }

  function removeCreatureByUid(uid) {
    const creaturesTemp = creaturesRef.current;
    for (var i = 0; i < creaturesTemp.length; i++) {
      if (creaturesTemp[i].uid.localeCompare(uid) === 0) {
        creaturesTemp.splice(i, 1);
        setCreatures([...creaturesTemp]);
        creaturesRef.current = creaturesTemp;
        break;
      }
    }
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
      addNewCreature();
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

  function makeEarthQuake(x, y) {
    const event = new CustomEvent("earthQuake", {
      detail: { x, y },
    });
    earthRef?.current?.dispatchEvent(event);
  }
  useEffect(() => {
    if (earthQuakePosition) {
      const interval = setInterval(() => {
        setEarthQuakePosition(null);
      }, [earthQuakeDuration]);

      return () => {
        clearInterval(interval);
      };
    }
  }, [earthQuakePosition, earthQuakeDuration]);

  function handleEarthMouseDown(e) {
    e.preventDefault();
    if (!mouseOnStats && !isStatsVisible) {
      if (e.button === 0) {
        makeEarthQuake(
          e.clientX - earthDimensions.left,
          e.clientY - earthDimensions.top
        );
        setEarthQuakePosition({
          x: e.clientX - earthDimensions.left,
          y: e.clientY - earthDimensions.top,
        });
        // addNewCreature({ color: "#004CFF" });
      } else {
        removeRandom();
      }
    }
  }
  return (
    <div
      id="earth"
      ref={earthRef}
      style={{ backgroundColor: "#222222", height: "100%", width: "100%" }}
      onMouseDown={handleEarthMouseDown}
    >
      <EarthQuake duration={3000} earthRef={earthRef}></EarthQuake>
      {earthRef && earthDimensions
        ? creatures.map((creature) => {
            return (
              <Creature
                birth={creature.birth}
                key={creature.uid}
                uid={creature.uid}
                earthRef={earthRef}
                dim={earthDimensions}
                x={creature.x}
                y={creature.y}
              ></Creature>
            );
          })
        : null}
      {isStatsVisible === false ? (
        <IconButton
          onMouseEnter={(e) => {
            e.preventDefault();
            setMouseOnStats(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setMouseOnStats(false);
          }}
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
          closeStats={() => {
            setIsStatsVisible(false);
            setMouseOnStats(false);
          }}
          style={{ position: "absolute", top: 5, left: 5 }}
        ></Statisitcs>
      )}
    </div>
  );
};

export default Earth;
