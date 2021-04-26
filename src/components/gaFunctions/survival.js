export function findFood(creatures, foods) {
  creatures.current.forEach((creature, index) => {
    if (!creature.isFoodFound && creature.canEatFood) {
      for (let i = 0; i < foods.current.length; i++) {
        const food = foods.current[i];
        if (food.pos.subtr(creature.pos).mag() < creature.smellRange) {
          creature.updateFoodFound(food.pos, food.id);
          break;
        }
      }
    } else {
      if (
        creature.isFoodFound &&
        creature.canEatFood &&
        creature.pos.subtr(creature.foundFoodPosition).mag() <
          creature.sightRange
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
