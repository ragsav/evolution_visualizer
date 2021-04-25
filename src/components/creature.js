import { Vector } from "./vector";
import { v4 as uuidv4 } from "uuid";
export class Creature {
  constructor(x, y, r, gender, creatures) {
    this.id = uuidv4();
    this.pos = new Vector(x, y);
    this.r = r;
    this.orignalR = r;
    this.gender = gender;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 0;
    this.birth = Date.now();
    this.color = "#ffffff";
    this.isAdult = false;
    this.lastBirth = Date.now();
    this.isAbleToMate = false;
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;
    this.lastFoodTime = Date.now();
    this.canEatFood = false;
    this.isInfected = false;
    this.infectionTime = null;
    this.energy = 600;
    creatures.current.push(this);
  }

  updateToAdult() {
    if (this.birth + 10000 < Date.now()) {
      this.isAdult = true;
    }
  }
  updateAbleToMate() {
    if (this.lastBirth + 10000 < Date.now()) {
      this.isAbleToMate = true;
    }
  }

  updateNotAbleToMate() {
    this.isAbleToMate = false;
    this.lastBirth = Date.now();
  }

  updateFoodFound(pos, fid) {
    this.isFoodFound = true;
    this.foundFoodPosition = pos;
    this.foodId = fid;
  }
  updateFoodEaten() {
    this.r = this.r * 1.5;
    this.energy = this.energy + 600;
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;

  }

  updateFoodNotFound() {
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;
  }

  updateLastFoodTime() {
    this.lastFoodTime = Date.now();
  }

  updateCanEatFood() {
    // if (this.lastFoodTime + 10000 < Date.now()) {
    //   this.canEatFood = true;
    //   this.r = this.orignalR;
    // } else {
    //   this.canEatFood = false;
    // }
    if(this.energy<300){
      this.canEatFood = true;
      this.r = this.orignalR;
    }else{
      this.canEatFood = false;
    }
  }

  canDie() {
    // return this.energy<20;
    return false;
  }

  infect() {
    if (!this.isInfected) {
      this.isInfected = true;
      this.infectionTime = Date.now();
    }
  }

  disInfect() {
    if (this.isInfected && this.infectionTime + 10000 < Date.now()) {
      this.isInfected = false;
      this.infectionTime = null;
    }
  }

  updateColor() {
    if (this.isInfected) {
      this.color = "#FF0000";
    } else if (this.isAdult) {
      this.color = this.gender == "F" ? "#FF75BF" : "#2ED9FF";
    } else {
      this.color = "#ffffff";
    }
  }

  updateEnergy() {
    if (this.energy > 0) {
      this.energy -= 1;
    }
  }
  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  reposition(ctx, speed) {
    const multiplier = [1, -1];
    const plusMinusX = Math.floor(Math.random() * 2);
    const plusMinusY = Math.floor(Math.random() * 2);

    // this.acc = this.acc.unit().mult(this.acceleration);

    if (this.isFoodFound && this.pos.subtr(this.foundFoodPosition).mag() < 2) {
      this.updateFoodNotFound();
    }

    if (this.isFoodFound) {
      this.vel = this.foundFoodPosition.subtr(this.pos).unit();
    } else {
      if (Math.random() > 0.991)
        this.vel = this.vel.add(
          new Vector(
            multiplier[plusMinusX] * speed,
            multiplier[plusMinusY] * speed
          )
        );
      this.vel = this.vel.mult(1 - 0.01);
    }

    if(this.vel.mag()>0){
      this.updateEnergy();
    }
    let newPosition = {
      x: this.pos.add(this.vel).x,
      y: this.pos.add(this.vel).y,
    };

    let isAtBoundary = false;
    if (newPosition.x + this.r + 10 > window.innerWidth - 300) {
      newPosition.x = window.innerWidth - 300 - this.r - 10;
      isAtBoundary = true;
    }
    if (newPosition.y + this.r + 10 > window.innerHeight) {
      newPosition.y = window.innerHeight - this.r - 10;
      isAtBoundary = true;
    }
    if (newPosition.x < 10) {
      newPosition.x = 10 + this.r;
      isAtBoundary = true;
    }
    if (newPosition.y < 10) {
      newPosition.y = 10 + this.r;
      isAtBoundary = true;
    }

    if (isAtBoundary) {
      this.vel = this.vel.mult(-1);
      newPosition = {
        x: this.pos.add(this.vel).x,
        y: this.pos.add(this.vel).y,
      };
    }

    this.pos = new Vector(newPosition.x, newPosition.y);

    // console.log(this.pos);
  }





  updateCreature(ctx,speed){
    this.reposition(ctx,speed);
    this.updateToAdult();
    this.updateAbleToMate();
    this.updateCanEatFood();
    // this.disInfect();
    this.updateColor();
    this.drawBall(ctx);
  }
}
