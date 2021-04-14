import { createRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Creature from "./creature";

import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import Statisitcs from "./statistics";
import EarthQuake from "./earthQuake";
import Volcano from "./volcana";
import Radiation from "./radiation";
import WaterBody from "./waterBody";

// const demo = Array.from(Array(100).keys());





const isPairEqual = (a1, b1, a2, b2) => {
  // console.log(a1,b1,a2,b2);
  if (
    (a1.localeCompare(a2) === 0 || a1.localeCompare(b2) === 0) &&
    (b1.localeCompare(a2) === 0 || b1.localeCompare(b2) === 0)
  ) {
    return true;
  }
  return false;
};

const Earth = () => {
  const {
    restarted,
    calamityType,
    calamities,
    resources,
    resourceType,
    initialPopulation,
  } = useGlobalState();
  const { setCalamityPosition, setResourcePosition,setTotalPopulation } = useGlobalActions();
  const [creatures, setCreatures] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [earthDimensions, setEarthDimensions] = useState(null);
  const earthRef = createRef();
  const creaturesRef = useRef([]);
  const birthCache = useRef([]);

  //initial population of creatures
  function InitializeCreatures(initialPopulation) {
    creaturesRef.current = [];
    for (var i = 0; i < initialPopulation; i++) {
      addNewCreature();
    }
  }

  //add new creature to creaturesRef
  function addNewCreature(props) {
    const creaturesTemp = creaturesRef.current;
    const gender = Math.random()>0.5?"M":"F";
    const uid = `${gender}-${uuidv4()}`;
    creaturesTemp.push({
      uid: uid,
      birth: Date.now(),
      x: props?.x,
      y: props?.y,
      size: props?.size,
      gender:gender
    });
    setCreatures([...creaturesTemp]);
    creaturesRef.current = creaturesTemp;
    return uid;
  }

  //remove creature by id from creatureRef
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

  //remove random creature
  function removeRandom() {
    const creaturesTemp = creaturesRef.current;
    creaturesTemp.splice(
      Math.floor(Math.random() * creaturesRef.current.length),
      1
    );
    setCreatures([...creaturesTemp]);
    creaturesRef.current = creaturesTemp;
  }

  //handle new births wheather the parents have mate recently or not
  function newBirth({ mother, father }) {
    const birthCacheTemp = birthCache.current;
    const l = birthCacheTemp.length;

    var canGiveBirth = true;
    for (var i = 0; i < l; i++) {
      if (
        isPairEqual(
          birthCacheTemp[i].mother.id,
          birthCacheTemp[i].father.id,
          mother.id,
          father.id
        )
      ) {
        console.log("birth not allowed!");
        canGiveBirth = false;
        break;
      }
    }

    if (canGiveBirth) {
      const childId = addNewCreature({
        x: (mother.position.x + father.position.x) / 2,
        y: (mother.position.y + father.position.y) / 2,
        size: (mother.size + father.size) / 2,
      });
      birthCacheTemp.push({ mother, father });
    }
    if (birthCacheTemp.length > 100) {
      birthCacheTemp.shift();
    }
    birthCache.current = birthCacheTemp;
  }

  //handle left click
  function handleLeftClick(e) {
    e.preventDefault();
    if (e.button === 0) {
      if (
        calamityType.localeCompare("none") !== 0 &&
        calamities.length < 5 &&
        resourceType.localeCompare("none") === 0
      ) {
        setCalamityPosition({
          x: e.clientX - earthDimensions.left,
          y: e.clientY - earthDimensions.top,
        });
      } else if (
        resourceType.localeCompare("none") !== 0 &&
        resources.length < 5 &&
        calamityType.localeCompare("none") === 0
      ) {
        setResourcePosition({
          x: e.clientX - earthDimensions.left,
          y: e.clientY - earthDimensions.top,
        });
      }
    } else if (e.button === 2) {
      handleRightClick(e);
    }
  }

  //handle right click
  function handleRightClick(e) {
    e.preventDefault();
    setContextMenuPosition({
      x: e.clientX - earthDimensions.left,
      y: e.clientY - earthDimensions.top,
    });
  }

  //set dimensions of earth when reference is available
  useEffect(() => {
    if (earthRef && earthRef.current && !earthDimensions) {
      setEarthDimensions({
        top: earthRef.current.offsetTop,
        left: earthRef.current.offsetLeft,
        w: earthRef.current.offsetWidth,
        h: earthRef.current.offsetHeight,
      });
      console.log(earthDimensions);
    }
  }, [earthRef]);

  //adding contectmenu listener to hide contect menu on right click
  useEffect(() => {
    if (earthRef && earthRef.current) {
      earthRef.current.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

      return () => {
        earthRef?.current?.removeEventListener("contextmenu", handleRightClick);
      };
    }
  }, [earthRef]);

  //restart effect
  useEffect(() => {
    if (restarted) {
      InitializeCreatures(initialPopulation);
    }
  }, [restarted,  initialPopulation]);

  //add birth and death event handlers when earth reference is available
  useEffect(() => {
    if (earthRef && earthRef.current && !earthDimensions) {
      const birthHandler = (e) => {
        if (e.detail) {
          newBirth({
            mother: e.detail.mother,
            father: e.detail.father,
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


  //save population size in global state
  useEffect(()=>{
    setTotalPopulation(creatures.length);
  },[creatures])


  return (
    <div
      id="earth"
      ref={earthRef}
      style={{
        backgroundColor: "#2A2A2A",
        height: "100%",
        width: window.innerWidth - 300,
        overflow: "hidden",
        position: "relative",
      }}
      onMouseDown={handleLeftClick}
    >
      {resources
        ? resources.map((resource) => {
            if (resource.type.localeCompare("waterBody") === 0) {
              return (
                <WaterBody
                  key={`${resource.id}+resource`}
                  uid={resource.id}
                  size={resource.size}
                  position={resource.position}
                ></WaterBody>
              );
            }
          })
        : null}
      {calamities
        ? calamities.map((calamity) => {
            if (calamity.type.localeCompare("earthQuake") === 0) {
              return (
                <EarthQuake
                  key={`${calamity.id}+calamity`}
                  size={calamity.size}
                  amplitude={calamity.amplitude}
                  duration={calamity.duration}
                  position={calamity.position}
                />
              );
            } else if (calamity.type.localeCompare("volcano") === 0) {
              return (
                <Volcano
                  key={`${calamity.id}+calamity`}
                  size={calamity.size}
                  amplitude={calamity.amplitude}
                  duration={calamity.duration}
                  position={calamity.position}
                />
              );
            } else if (calamity.type.localeCompare("radiation") === 0) {
              return (
                <Radiation
                  key={`${calamity.id}+calamity`}
                  size={calamity.size}
                  amplitude={calamity.amplitude}
                  duration={calamity.duration}
                  position={calamity.position}
                />
              );
            }
          })
        : null}
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
                size={creature.size}
                gender={creature.gender}
              ></Creature>
            );
          })
        : null}
    </div>
  );
};

export default Earth;
