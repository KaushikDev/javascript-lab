let animationId;
let resizeObserver;
let lasers = [];

const keys = {
  ArrowUp: false,
  KeyW: false,
  ArrowDown: false,
  KeyS: false,
  ArrowLeft: false,
  KeyD: false,
  ArrowRight: false,
  KeyA: false,
  Space: false,
};

function handleKeyDown(e) {
  keys[e.code] = true;
  console.log(e.code);
}

function handleKeyUp(e) {
  keys[e.code] = false;
}

export function setupCanvasIP(interactivePanelPlayArea) {
  const canvas = document.createElement("canvas");
  const parentDiv = document.createElement("div");

  parentDiv.classList.add("ip__canvas-container");
  interactivePanelPlayArea.appendChild(parentDiv);

  parentDiv.appendChild(canvas);
  canvas.classList.add("ip__canvas");
  const ctx = canvas.getContext("2d");

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  let player = new Player(100, 100);

  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      canvas.width = width;
      canvas.height = height;

      player.cWidth = width;
      player.cHeight = height;

      player.y = height / 2 - player.size / 2;
    }
  });
  resizeObserver.observe(parentDiv);

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#101040";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);
    lasers.forEach((laser) => {
      laser.update();
      laser.draw(ctx);
    });

    animationId = requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

class Player {
  constructor(cWidth, cHeight) {
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    this.size = 40;
    this.speed = 5;
    this.gunWidth = 20;
    this.gunHeight = 10;

    this.x = 50;
    this.y = this.cHeight / 2 - this.size / 2;

    this.cooldown = 0;
  }

  update() {
    if (keys.ArrowUp || keys.KeyW) {
      this.y = this.y - this.speed;
    }
    if (keys.ArrowDown || keys.KeyS) {
      this.y = this.y + this.speed;
    }
    if (keys.ArrowLeft || keys.KeyA) {
      this.x = this.x - this.speed;
    }
    if (keys.ArrowRight || keys.KeyD) {
      this.x = this.x + this.speed;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x > this.cWidth - this.size - this.gunWidth) {
      this.x = this.cWidth - this.size - this.gunWidth;
    }
    if (this.y > this.cHeight - this.size) {
      this.y = this.cHeight - this.size;
    }

    if (this.cooldown > 0) {
      this.cooldown--;
    }

    if (keys.Space && this.cooldown === 0) {
      let gunTipX = this.x + this.size + this.gunWidth;
      let gunTipY = this.y + this.size / 2 - 5;
      lasers.push(new Laser(gunTipX, gunTipY));
      this.cooldown = 10;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    ctx.fillRect(
      this.x + this.size,
      this.y + this.size / 2 - this.gunHeight / 2,
      this.gunWidth,
      this.gunHeight,
    );
  }
}

class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 10;
  }

  update() {
    this.x = this.x + this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export function removeCanvasIP() {
  cancelAnimationFrame(animationId);
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);

  resizeObserver.disconnect();
}
