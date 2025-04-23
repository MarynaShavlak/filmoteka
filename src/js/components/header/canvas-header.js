class Circle {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.canvas = document.querySelector('.canvas-header');
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }

  move() {
    const header = document.querySelector('.header');
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (
      this.y + this.radius > header.offsetHeight ||
      this.y - this.radius < 0
    ) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

class CanvasAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.getInitialCanvasHeight();
    this.colorsArr = ['#FF001B', '#F7F7F7', '#FF001B'];
    this.circlesArr = [];
    this.initCircles();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.resetAllCircles();
    });

    this.initAnimation();
  }

  getInitialCanvasHeight() {
    let height;
    const windowWidth = window.innerWidth;
    switch (true) {
      case windowWidth >= 320 && windowWidth < 768:
        height = 490;
        break;
      case windowWidth >= 768 && windowWidth < 1280:
        height = 350;
        break;
      case windowWidth >= 1280:
        height = 311;
        break;
      default:
        height = 606;
    }
    return height;
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = header.offsetHeight;
    // this.canvas.style.left = '0';
  }
  initCircles() {
    const windowWidth = window.innerWidth;
    let circlesQuantity;
    let minCircleRadius;
    let maxCircleRadius;

    switch (true) {
      case windowWidth >= 320 && windowWidth < 768:
        circlesQuantity = 100;
        minCircleRadius = 1;
        maxCircleRadius = 3;
        break;
      case windowWidth >= 768 && windowWidth < 1280:
        circlesQuantity = 50;
        minCircleRadius = 3;
        maxCircleRadius = 5;
        break;
      case windowWidth >= 1280:
        circlesQuantity = 60;
        minCircleRadius = 5;
        maxCircleRadius = 15;
        break;
      default:
        circlesQuantity = 20;
        minCircleRadius = 1;
        maxCircleRadius = 3;
    }

    this.circlesArr = Array.from({ length: circlesQuantity }, () => {
      const radius = randomRadius(minCircleRadius, maxCircleRadius);
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const speedX = (Math.random() - 0.1) * 2;
      const speedY = (Math.random() - 0.1) * 2;
      const color = this.colorsArr[randomNumber(0, this.colorsArr.length - 1)];

      return new Circle(x, y, radius, speedX, speedY, color);
    });
  }

  resetAllCircles() {
    this.circlesArr.forEach(circle => {
      circle.x =
        Math.random() * (this.canvas.width - circle.radius * 2) + circle.radius;
      circle.y =
        Math.random() * (this.canvas.height - circle.radius * 2) +
        circle.radius;
    });
  }

  initAnimation() {
    requestAnimationFrame(() => this.initAnimation());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circlesArr.forEach(circle => {
      circle.update(this.ctx);
    });
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRadius(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

const header = document.querySelector('.header');

const canvas = document.querySelector('.canvas-header');
export const canvasAnimation = new CanvasAnimation(canvas);
