import { Creature } from "../core/creature";
export function matingPool(creatures) {
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
