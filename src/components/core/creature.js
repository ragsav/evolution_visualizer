import { Vector } from "./vector";
import { v4 as uuidv4 } from "uuid";
export class Creature {
  constructor(x, y, r, gender, creatures) {
    //gene
    this.id = uuidv4();
    this.r = r;
    this.gender = gender;
    this.sightRange = 5;
    this.smellRange = 20;
    this.dob = Date.now();
    this.color = "#ffffff";
    this.parents = null;
    this.children = null;
    this.isSightActivated = true;
    this.isSmellActivated = true;

    //food
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;
    this.lastFoodTime = Date.now();
    this.energy = 600;

    //reproduction
    this.fertility = "fertile";
    this.fertilityChance = 1;
    this.fertilityType = "all";
    this.fertilityConstraints = "all";
    this.minFertilityEnergy = 600;
    this.isFertilityMemoryActivated = true;
    this.lastBirth = Date.now();

    //movement
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);

    //immunity
    this.isInfected = false;
    this.infectionTime = null;

    creatures.current.push(this);
  }

  isAdult() {
    return this.dob + 10000 < Date.now();
  }

  isMale() {
    return this.gender == "M";
  }

  isFemale() {
    return this.gender == "F";
  }

  isBisexual() {
    return this.gender == "B";
  }

  isFertile() {
    if (this.fertility.localeCompare("infertile") === 0) return false;
    if (
      this.fertility.localeCompare("semiFertile") === 0 &&
      this.fertilityChance < Math.random()
    )
      return false;
    return true;
  }

  canReproduce(partner) {
    if (partner.isMale()&&this.lastBirth+5000<Date.now()) {
      if (
        this.isFertilityMemoryActivated &&
        this.energy > this.minFertilityEnergy
      ) {
        return true;
      } else if (!this.isFertilityMemoryActivated) {
        return true;
      } else if (
        this.isFertilityMemoryActivated &&
        this.energy < this.minFertilityEnergy
      ) {
        return false;
      }
    }
    return false;
  }


  canSearchFood(){
    return this.isSightActivated&&this.isSmellActivated;
  }
  updateFoodFound(pos, fid) {
    this.isFoodFound = true;
    this.foundFoodPosition = pos;
    this.foodId = fid;
  }

  updateFoodEaten() {
    this.energy = this.energy + 800 + Math.random() * 400;
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;
  }

  updateFoodNotFound() {
    this.isFoodFound = false;
    this.foundFoodPosition = null;
    this.foodId = null;
  }

  canEatFood() {
    return this.energy < 2000;
  }

  canDie() {
    return this.energy < 20;
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
    } else if (this.isAdult()) {
      this.color = this.gender == "F" ? "#FF75BF" : "#2ED9FF";
    } else {
      this.color = "#ffffff";
    }
  }

  updateEnergy() {
    if (this.energy > 0) {
      if (this.isInfected) {
        this.energy -= 3;
      } else {
        this.energy -= 1;
      }
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

    if (this.vel.mag() > 0) {
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

  updateCreature(ctx, speed) {
    this.reposition(ctx, speed);
    this.disInfect();
    this.updateColor();
    this.drawBall(ctx);
  }
}
