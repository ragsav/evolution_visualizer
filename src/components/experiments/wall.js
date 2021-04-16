import { Vector } from "./vector";
export class Wall {
  constructor(x1, y1, x2, y2, WALLZ) {
    this.start = new Vector(x1, y1);
    this.end = new Vector(x2, y2);
    WALLZ.push(this);
  }

  drawWall(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

  wallUnit() {
    return this.end.subtr(this.start).unit();
  }
}
