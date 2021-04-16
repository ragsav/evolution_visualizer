import { Vector } from "./vector";
export class Ball {
  constructor(x, y, r, BALLZ) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 0;
    this.player = false;
    BALLZ.push(this);
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  reposition(ctx) {
    const multiplier = [1, -1];
    const plusMinusX = Math.floor(Math.random() * 2);
    const plusMinusY = Math.floor(Math.random() * 2);

    this.acc = this.acc.unit().mult(this.acceleration);

    const speed = 1;
    if (Math.random() > 0.7)
      this.vel = this.vel.add(
        new Vector(
          multiplier[plusMinusX] * speed,
          multiplier[plusMinusY] * speed
        )
      );
    this.vel = this.vel.mult(1 - 0.07);

    const newPosition = {
      x: this.pos.add(this.vel).x,
      y: this.pos.add(this.vel).y,
    };
    if (newPosition.x + this.r + 10 > window.innerWidth) {
      newPosition.x = window.innerWidth - this.r - 10;
    }
    if (newPosition.y + this.r + 10 > window.innerHeight) {
      newPosition.y = window.innerHeight - this.r - 10;
    }
    if (newPosition.x < 10) {
      newPosition.x = 10 + this.r;
    }
    if (newPosition.y < 10) {
      newPosition.y = 10 + this.r;
    }

    this.pos = new Vector(newPosition.x, newPosition.y);

    // console.log(this.pos);
  }
}
