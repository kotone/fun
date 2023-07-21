/*
  * Settings
  */
var settings = {
  particles: {
    length: 615, // maximum amount of particles
    duration: 2, // particle duration in sec
    velocity: 26, // particle velocity in pixels/sec
    effect: 0.26, // play with this for a nice effect
    size: 26, // particle size in pixels
    padding: [40, 50] // canvas padding
  },
};

/*
 * RequestAnimationFrame polyfill
 */

const requestAnimationFramePolyfill = () => {
  var b = 0;
  var c = ["ms", "moz", "webkit", "o"];
  for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
    window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[c[a] + "CancelAnimationFrame"] ||
      window[c[a] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (h, e) {
      var d = new Date().getTime();
      var f = Math.max(0, 16 - (d - b));
      var g = window.setTimeout(function () {
        h(d + f);
      }, f);
      b = d + f;
      return g;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (d) {
      clearTimeout(d);
    };
  }
}

/*
  * Point class
  */

class Point {
  constructor (x, y) {
    this.x = typeof x !== "undefined" ? x : 0;
    this.y = typeof y !== "undefined" ? y : 0;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  getLength(length) {
    if (typeof length == "undefined") return Math.sqrt(this.x * this.x + this.y * this.y);
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  }
  normalize() {
    var length = this.getLength();
    this.x /= length;
    this.y /= length;
    return this;
  }
}


/*
* Particle class
*/
class Particle {
  image = getImage()
  constructor(context) {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
    this.context = context
  }
  initialize(x, y, dx, dy) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  }
  update(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  }
  draw() {
    function ease(t) {
      return --t * t * t + 1;
    }
    var size = this.image.width * ease(this.age / settings.particles.duration);
    this.context.globalAlpha = 1 - this.age / settings.particles.duration;
    this.context.drawImage(
      this.image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size
    );
  }
}

/*
* ParticlePool class
*/

class ParticlePool {
  particles = []
  firstActive = 0
  firstFree = 0
  duration = settings.particles.duration
  constructor(length, context) {
    this.particles = new Array(length);
    this.context = context
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i] = new Particle(this.context);
    }
  }
  add(x, y, dx, dy) {
    this.particles[this.firstFree].initialize(x, y, dx, dy);
    // handle circular queue
    this.firstFree++;
    if (this.firstFree == this.particles.length) this.firstFree = 0;
    if (this.firstActive == this.firstFree) this.firstActive++;
    if (this.firstActive == this.particles.length) this.firstActive = 0;
  }
  update(deltaTime) {
    // update active particles
    if (this.firstActive < this.firstFree) {
      for (var i = this.firstActive; i < this.firstFree; i++) {
        this.particles[i].update(deltaTime);
      }
    }

    if (this.firstFree < this.firstActive) {
      for (var i = this.firstActive; i < this.particles.length; i++)
        this.particles[i].update(deltaTime);
      for (var i = 0; i < this.firstFree; i++) {
        this.particles[i].update(deltaTime);
      }
    }
    // remove inactive particles
    while (
      this.particles[this.firstActive].age >= this.duration &&
      this.firstActive != this.firstFree
    ) {
      this.firstActive++;
      if (this.firstActive == this.particles.length) this.firstActive = 0;
    }
  }
  draw(context, image) {
    // draw active particles
    if (this.firstActive < this.firstFree) {
      for (var i = this.firstActive; i < this.firstFree; i++) {
        this.particles[i].draw(context, image);
      }
    }
    if (this.firstFree < this.firstActive) {
      for (var i = this.firstActive; i < this.particles.length; i++) {
        this.particles[i].draw(context, image);
      }
      for (var i = 0; i < this.firstFree; i++) {
        this.particles[i].draw(context, image);
      }
    }
  }
}
const pointOnHeart = (t)  => {
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) -
      50 * Math.cos(2 * t) -
      20 * Math.cos(3 * t) -
      10 * Math.cos(4 * t) +
      25
  );
}
const getImage = () => {
  var canvas = document.createElement("canvas"),
       context = canvas.getContext("2d");
  canvas.width = settings.particles.size;
  canvas.height = settings.particles.size;
  // helper function to create the path
  const to = (t)  => {
    var point = pointOnHeart(t);
    point.x = settings.particles.size / 2 + (point.x * settings.particles.size) / 350;
    point.y = settings.particles.size / 2 - (point.y * settings.particles.size) / 350;
    return point;
  }
  // create the path
  context.beginPath();
  var t = -Math.PI;
  var point = to(t);
  context.moveTo(point.x, point.y);
  while (t < Math.PI) {
    t += 0.01; // baby steps!
    point = to(t);
    context.lineTo(point.x, point.y);
  }
  context.closePath();
  // create the fill
  context.fillStyle = "#E88D8D";
  context.fill();
  // create the image
  var image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

/*
 * Putting it all together
 */

export default class Heart {
  time = 0
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")
    this.particles = new ParticlePool(settings.particles.length, this.context)
    this.particleRate = settings.particles.length / settings.particles.duration, // particles/sec
    requestAnimationFramePolyfill()
  }

  onResize() {
    this.canvas.width = this.canvas.clientWidth + settings.particles.padding[0];
    this.canvas.height = this.canvas.clientHeight + settings.particles.padding[1];
  }
  render() {
    // next animation frame
    window.requestAnimationFrame(() => {
      this.onResize()
      this.render()
    })
    // update time
    var newTime = new Date().getTime() / 1000,
         deltaTime = newTime - (this.time || newTime);
    this.time = newTime;
    // clear canvas
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    // create new particles
    var amount = this.particleRate * deltaTime;
    for (var i = 0; i < amount; i++) {
      var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
      var dir = pos.clone().getLength(settings.particles.velocity);
      this.particles.add(
        canvas.width / 2 + pos.x,
        canvas.height / 2 - pos.y,
        dir.x,
        -dir.y
      );
    }
    // update and draw particles
    this.particles.update(deltaTime);
    this.particles.draw(this.context, getImage());
    return this
  }
}
