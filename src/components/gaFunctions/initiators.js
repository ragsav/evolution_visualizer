import { randInt } from "../utils/util";
import { Creature } from "../core/creature";
import { Food } from "../core/food";
export function makeInitialPopulation(n, creatures) {
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
}

export function makeInitialFood(foods) {
  foods.current = [];
  for (let i = 0; i < 200; i++) {
    const food = new Food(
      randInt(10, window.innerWidth - 300 - 10),
      randInt(10, window.innerHeight - 10),
      foods
    );
  }
}
