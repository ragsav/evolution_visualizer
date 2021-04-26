import { useEffect, useRef, useState } from "react";
import { Vector } from "./vector";
import { useGlobalState, useGlobalActions } from "../../context/globalContext";
import { Food } from "./food";
import EarthQuake from "../calamities/earthQuake";
import Volcano from "../calamities/volcana";
import Radiation from "../calamities/radiation";
import WaterBody from "../resources/waterBody";
import {
  makeInitialFood,
  makeInitialPopulation,
} from "../gaFunctions/initiators";
import { isPairEqual, randInt } from "../utils/util";
import { matingPool } from "../gaFunctions/mating";
import { findFood } from "../gaFunctions/survival";
import {
  calamityEffect,
  handleCalamityEffect,
  plagueInfectionToNeighbours,
} from "../gaFunctions/calamityEffect";

import ChartsModal from "../statistics/charts";

function clearCanvas(ctx, canvasRef) {
  ctx?.clearRect(
    0,
    0,
    canvasRef?.current?.clientWidth,
    canvasRef?.current?.clientHeight
  );
}

function addRandomNumberOfFood(foods, rate) {
  if (Math.random() < rate) {
    const food = new Food(
      randInt(10, window.innerWidth - 300 - 10),
      randInt(10, window.innerHeight - 10),
      foods
    );
  }
}

function die(creatures) {
  for (let i = 0; i < creatures.current.length; i++) {
    if (creatures.current[i].canDie()) {
      creatures.current.splice(i, 1);
    }
  }
}

const Earth = () => {
  const {
    restarted,
    calamityType,
    calamities,
    resources,
    resourceType,
    status,
    speed,
    initialPopulation,
    foodSpawnRate,
    isChartModalVisible,
  } = useGlobalState();

  const {
    setTotalPopulation,
    setCalamityPosition,
    setResourcePosition,
    setIsChartModalVisible,
  } = useGlobalActions();

  const [ctx, setCtx] = useState(null);

  const canvasRef = useRef(null);
  const foodSpawnRateRef = useRef(foodSpawnRate);
  const speedRef = useRef(0.5);
  const statusRef = useRef(status);
  const calamitiesRef = useRef(calamities);
  const CREATURES = useRef([]);
  const FOODS = useRef([]);
  const data = useRef([]);

  useEffect(() => {
    foodSpawnRateRef.current = foodSpawnRate;
  }, [foodSpawnRate]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    calamitiesRef.current = calamities;
  }, [calamities]);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvasRef.current.focus();
      setCtx(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (ctx) {
      clearCanvas(ctx, canvasRef);
      makeInitialPopulation(initialPopulation, CREATURES);
      makeInitialFood(FOODS);
      data.current = [];
    }
  }, [ctx, restarted, initialPopulation]);

  useEffect(() => {
    let reqID = null;
    statusRef.current = status;
    if (status.localeCompare("Playing") === 0) {
      reqID = requestAnimationFrame(mainLoop);
    }
    return () => {
      if (reqID) {
        cancelAnimationFrame(reqID);
      }
    };
  }, [status]);

  function mainLoop(timestamp) {
    if (statusRef.current.localeCompare("Playing") === 0) {
      data.current.push({
        timestamp,
        population: CREATURES.current.length,
        food: FOODS.current.length,
      });
      clearCanvas(ctx, canvasRef);
      calamityEffect(CREATURES, calamitiesRef);
      findFood(CREATURES, FOODS);
      die(CREATURES);
      plagueInfectionToNeighbours(CREATURES);
      matingPool(CREATURES);
      CREATURES.current.forEach((b, index) => {
        b.updateCreature(ctx, speedRef.current);
      });
      FOODS.current.forEach((f, index) => {
        f.drawFood(ctx);
      });
      addRandomNumberOfFood(FOODS, foodSpawnRateRef.current);
      setTotalPopulation(CREATURES.current.length);
      requestAnimationFrame(mainLoop);
    }
    return;
  }

  function handleCanvasClick(e) {
    const mouse = new Vector(e.clientX - 300, e.clientY);
    handleCalamityEffect(
      CREATURES,
      calamities,
      calamityType,
      mouse,
      setCalamityPosition
    );
  }
  return (
    <div>
      <ChartsModal
        show={isChartModalVisible}
        data={data.current}
        onHide={() => {
          setIsChartModalVisible(false);
        }}
      />
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
      <canvas
        onClick={handleCanvasClick}
        tabIndex={1}
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth - 300}
        height={window.innerHeight}
        style={{ backgroundColor: "#222222" }}
      ></canvas>
    </div>
  );
};

export default Earth;
