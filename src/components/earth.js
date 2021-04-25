import { useEffect, useRef, useState } from "react";
import { Vector } from "./vector";
import { Creature } from "./creature";
import { Wall } from "./wall";
import { useGlobalState, useGlobalActions } from "../context/globalContext";
import { Food } from "./food";

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

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearCanvas(ctx, canvasRef) {
  ctx?.clearRect(
    0,
    0,
    canvasRef?.current?.clientWidth,
    canvasRef?.current?.clientHeight
  );
}

function initPopulation(n, creatures) {
  creatures.current = [];
  for (let i = 0; i < n; i++) {
    let newBall = new Creature(
      randInt(10, window.innerWidth - 300 - 10),
      randInt(10, window.innerHeight - 10),
      2,
      Math.random() > 0.5 ? "F" : "M",
      creatures
    );
  }
  //   console.log(creatures);
}

function makeInitialFood(foods) {
  foods.current = [];
  for (let i = 0; i < 50; i++) {
    const food = new Food(
      randInt(10, window.innerWidth - 300 - 10),
      randInt(10, window.innerHeight - 10),
      foods
    );
  }
}

function addRandomNumberOfFood(foods) {
  if (Math.random() > 0.8) {
    const food = new Food(
      randInt(10, window.innerWidth - 300 - 10),
      randInt(10, window.innerHeight - 10),
      foods
    );
  }
}

function matingPoolWithCacheImplementation(creatures, birthCache) {
  const vis = Array(creatures.current.length).fill(false);
  const pairs = [];
  const l = creatures.current.length;
  // var pairs = 0;
  for (let i = 0; i < l; i++) {
    const observer = creatures.current[i];
    if (!vis[i] && observer.gender == "F" && observer.isAdult) {
      vis[i] = true;
      for (let j = i + 1; j < l; j++) {
        const target = creatures.current[j];
        if (
          !vis[j] &&
          target.gender == "M" &&
          target.isAdult &&
          observer.pos.subtr(target.pos).mag() < 5
        ) {
          pairs.push({ mother: observer, father: target });
          vis[j] = true;
          break;
        }
      }
    }
  }

  pairs.forEach(({ mother, father }) => {
    let canMate = true;
    for (let i = 0; i < birthCache.current.length; i++) {
      const { cacheMother, cacheFather } = birthCache.current[i];
      if (isPairEqual(mother.id, father.id, cacheMother.id, cacheFather.id)) {
        canMate = false;
        break;
      }
    }

    if (canMate) {
      let newBall = new Creature(
        (mother.pos.x + father.pos.x) / 2,
        (mother.pos.y + father.pos.y) / 2,
        (mother.r + father.r) / 2,
        Math.random() > 0.5 ? "F" : "M",
        creatures
      );
      console.log({
        mother_y: mother.pos.y,
        father_y: father.pos.y,
        newBall: newBall.pos.y,
      });
      if (birthCache.current.length > creatures.current.length / 2) {
        birthCache.current.shift();
      }
      birthCache.current.push({ cacheMother: mother, cacheFather: father });
    }
  });
}

function matingPool(creatures) {
  const vis = Array(creatures.current.length).fill(false);
  const pairs = [];
  const l = creatures.current.length;

  for (let i = 0; i < l; i++) {
    const observer = creatures.current[i];
    if (
      !vis[i] &&
      observer.gender == "F" &&
      observer.isAdult &&
      observer.isAbleToMate
    ) {
      vis[i] = true;
      for (let j = i + 1; j < l; j++) {
        const target = creatures.current[j];
        if (
          !vis[j] &&
          target.gender == "M" &&
          target.isAdult &&
          observer.pos.subtr(target.pos).mag() < 5
        ) {
          pairs.push({ mother: observer, father: target });
          vis[j] = true;
          break;
        }
      }
    }
  }
  pairs.forEach(({ mother, father }) => {
    let newBall = new Creature(
      (mother.pos.x + father.pos.x) / 2,
      (mother.pos.y + father.pos.y) / 2,
      (mother.r + father.r) / 2,
      Math.random() > 0.5 ? "F" : "M",
      creatures
    );
    mother.updateNotAbleToMate();
  });
}

function findFood(creatures, foods) {
  creatures.current.forEach((creature, index) => {
    if (!creature.isFoodFound && creature.canEatFood) {
      for (let i = 0; i < foods.current.length; i++) {
        const food = foods.current[i];
        if (food.pos.subtr(creature.pos).mag() < 20) {
          creature.updateFoodFound(food.pos, food.id);
          break;
        }
      }
    } else {
      if (
        creature.isFoodFound &&
        creature.canEatFood &&
        creature.pos.subtr(creature.foundFoodPosition).mag() < 5
      ) {
        let foodIndex = -1;
        for (var i = 0; i < foods.current.length; i++) {
          if (foods.current[i].id.localeCompare(creature.foodId) === 0) {
            foodIndex = i;
            break;
          }
        }
        if (foodIndex !== -1) {
          foods.current.splice(foodIndex, 1);
          creature.updateFoodEaten();
          creature.updateLastFoodTime();
        }
      }
    }
  });
}

function infection(creatures) {
  let n = creatures.current.length;
  for (let i = 0; i < n; i++) {
    const observer = creatures.current[i];
    if (observer.isInfected) {
      for (let j = i + 1; j < n; j++) {
        const target = creatures.current[j];
        if (observer.pos.subtr(target.pos).mag() < 7) {
          target.infect();
        }
      }
    }
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
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const CREATURES = useRef([]);
  const FOODS = useRef([]);
  const localSpeed = useRef(0.5);
  const birthCache = useRef([]);
  const {
    restarted,
    calamityType,
    calamities,
    resources,
    resourceType,
    status,
    speed,
    initialPopulation,
  } = useGlobalState();

  const { setTotalPopulation } = useGlobalActions();
  const localStatus = useRef(status);

  useEffect(() => {
    localSpeed.current = speed;
  }, [speed]);
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
      initPopulation(initialPopulation, CREATURES);
      makeInitialFood(FOODS);
      CREATURES.current[0].infect();
    }
  }, [ctx, restarted, initialPopulation]);

  useEffect(() => {
    let reqID = null;
    localStatus.current = status;
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
    if (localStatus.current.localeCompare("Playing") === 0) {
      clearCanvas(ctx, canvasRef);
      findFood(CREATURES, FOODS);
      die(CREATURES);
      infection(CREATURES);
      matingPool(CREATURES);

      CREATURES.current.forEach((b, index) => {
        b.updateCreature(ctx, localSpeed.current);
      });

      FOODS.current.forEach((f, index) => {
        f.drawFood(ctx);
      });
      addRandomNumberOfFood(FOODS);
      setTotalPopulation(CREATURES.current.length);
      requestAnimationFrame(mainLoop);
    }
    return;
  }

  function handleCanvasClick(e) {
    console.log("clicked");
    const mouse = new Vector(e.clientX, e.clientY);
    console.log(mouse);
    const n = CREATURES.current.length;
    for (let i = 0; i < n; i++) {
      const observer = CREATURES.current[i];
      if (observer.pos.subtr(mouse).mag() < 10) {
        observer.infect();
      }
    }
  }
  return (
    <canvas
      onClick={handleCanvasClick}
      tabIndex={1}
      id="canvas"
      ref={canvasRef}
      width={window.innerWidth - 300}
      height={window.innerHeight}
      style={{ backgroundColor: "#222222" }}
    ></canvas>
  );
};

export default Earth;
