import { Vector } from "./vector";
import { v4 as uuidv4 } from "uuid";
export class Food {
  constructor(x, y, foods) {
    this.id = uuidv4();
    this.pos = new Vector(x, y);
    foods.current.push(this);
  }

  drawFood(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = "#2BFF00";
    ctx.fill();
    ctx.closePath();
  }
}
