import { Vector } from "../core/vector";

export function plagueInfectionToNeighbours(creatures) {
  let n = creatures.current.length;
  for (let i = 0; i < n; i++) {
    const observer = creatures.current[i];
    if (observer.isInfected) {
      for (let j = 0; j < n; j++) {
        const target = creatures.current[j];
        if (observer.pos.subtr(target.pos).mag() < 20) {
          target.infect();
        }
      }
    }
  }
}

function plagueInfectionOnMouseClick(creatures, mouse) {
  const n = creatures.current.length;
  for (let i = 0; i < n; i++) {
    const observer = creatures.current[i];
    if (observer.pos.subtr(mouse).mag() < 10) {
      observer.infect();
    }
  }
}

function findNearestCalamity(calamities, creature) {
  const creaturePos = creature.pos;
  let nearestCalamity = null;
  let minDist = 100000;
  calamities.forEach((calamity) => {
    const calamityPos = new Vector(calamity.position.x, calamity.position.y);
    if (
      minDist > calamityPos.subtr(creaturePos).mag() &&
      calamityPos.subtr(creaturePos).mag() < calamity.size
    ) {
      minDist = calamityPos.subtr(creaturePos).mag();
      nearestCalamity = calamity;
    }
  });
  return nearestCalamity;
}
export function calamityEffect(creatures, calamities) {
  if (calamities.current.length > 0) {
    creatures.current.forEach((creature, index) => {
      const nearestCalamity = findNearestCalamity(calamities.current, creature);
      if (nearestCalamity) {
        creatures.current.splice(index, 1);
        //add different effect for every calamity with different range
      }
    });
  }
}

export function handleCalamityEffect(
  creatures,
  calamities,
  calamityType,
  mouse,
  setCalamityPosition
) {
  if (calamityType.localeCompare("plague") === 0) {
    plagueInfectionOnMouseClick(creatures, mouse);
  } else if (
    calamityType.localeCompare("none") !== 0 &&
    calamities.length < 5
  ) {
    setCalamityPosition({
      x: mouse.x,
      y: mouse.y,
    });
  }
}
