export function findFood(creatures, foods) {
  const l = creatures.current.length;
  for (let i = 0; i < l; i++) {
    const creature = creatures.current[i];
    
    if (
      !creature.isFoodFound &&
      creature.canSearchFood() &&
      creature.canEatFood()
    ) {
      
      for (let j = 0; j < foods.current.length; j++) {
        const food = foods.current[j];
        if (food.pos.subtr(creature.pos).mag() < creature.smellRange) {
          creature.updateFoodFound(food.pos, food.id);
          break;
        }
      }
    } if (
      creature.isFoodFound &&
      creature.canEatFood() &&
      creature.canSearchFood() &&
      creature.pos.subtr(creature.foundFoodPosition).mag() < creature.sightRange
    ) {
     
      let foodIndex = -1;
      for (var j = 0; j < foods.current.length; j++) {
        if (foods.current[j].id.localeCompare(creature.foodId) === 0) {
          foodIndex = j;
          break;
        }
      }
      if (foodIndex !== -1) {
        foods.current.splice(foodIndex, 1);
        creature.updateFoodEaten();        
      }
    }
  }
}
