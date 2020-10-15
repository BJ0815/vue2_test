const MAX_X = 800
const MAX_Y = 600


export const DEFAULT = {
  TOTAL: 100
}

export const Particle = function () {
  this.r = 3;
  this.p = {
    x: Math.random() * MAX_X,
    y: Math.random() * MAX_Y,
  }
  this.v = {
    x: 4 * Math.random() - 2,
    y: 4 * Math.random() - 2
  }

  this.hitsWallX = function () {
    return this.p.x > MAX_X || this.p.x < 0;
  };

  this.hitsWallY = function () {
    return this.p.y > MAX_Y || this.p.y < 0;
  };
};


export const genBubbles = (count) =>
  Array(+count)
    .fill(0)
    .map(() => new Particle());
