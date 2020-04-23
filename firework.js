class Firework {
  constructor() {
    this.hu = random(255);
    let x = random(50, width - 100);
    this.firework = new Particle(x, height, this.hu, true);
    this.exploded = false;
    this.particles = [];
    this.allArrived = false;
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (let p of this.particles) {
      this.allArrived = true;
      if (!p.seekComplete) {
        this.allArrived = false;
        break;
      }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
      if (this.allArrived) {
        this.particles[i].applyForce(gravity);
      }
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    let x = this.firework.pos.x;
    let y = this.firework.pos.y;
    this.letters = font.textToPoints(letter[textCounter], x, y, 150);
    for (let l of this.letters) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false, true, l);
      this.particles.push(p);
    }
    textCounter++;
    if (textCounter == letter.length) {
      textCounter = 0;
    }
  }

  show() {
    if (!this.exploded) this.firework.show();
    for (let p of this.particles) p.show();
  }
}
