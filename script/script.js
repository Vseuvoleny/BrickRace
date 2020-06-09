const canv = document.querySelector("#canvas");
const ctx = canv.getContext("2d");
const scoreField = document.querySelector(".score");
const recordField = document.querySelector(".record");
const soundtrackCheck = document.querySelector("#soundtrack");
const soundsCheck = document.querySelector("#sounds");
const soundtrack = document.querySelector(".audio");
soundtrack.volume = 0.2;
const speedLimit = document.querySelector(".speed");
const slideSound = document.querySelector(".slide");
slideSound.volume = 0.2;
const fieldSize = 25;
const columns = 9;
const rows = 27;
let score = 0;
let left,
  right,
  isGameOver = false;
let speed = 8;
speedLimit.innerText = `Current speed: ${speed}`;
canv.width = columns * fieldSize;
canv.height = rows * fieldSize;

class Main {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < columns * fieldSize; i += fieldSize) {
      for (let k = 0; k < rows * fieldSize; k += fieldSize) {
        ctx.beginPath();
        ctx.rect(i, k, fieldSize, fieldSize);
        ctx.stroke();
        ctx.closePath();
      }
    }
    ctx.beginPath();
    ctx.rect(this.x, this.y + 3 * fieldSize, 3 * fieldSize, fieldSize);
    ctx.rect(this.x, this.y + fieldSize, 3 * fieldSize, fieldSize);
    ctx.rect(this.x + fieldSize, this.y + fieldSize, fieldSize, fieldSize * 4);
    ctx.fillStyle = "red";
    ctx.fill();
  }
  update() {
    if (!isGameOver) {
      this.y += speed;
    }
    if (this.y > canv.height + fieldSize) {
      this.x =
        Math.random() < 0.3
          ? 0
          : Math.random() > 0.6
          ? 3 * fieldSize
          : 6 * fieldSize;
          console.log(this.x)
      this.y = 0;
    }
    if (this.x == player.x && this.y + 4 * fieldSize > 24 * fieldSize) {
      isGameOver = true;
    }
    this.draw();
  }
}

class PlayerCar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(
      this.x + fieldSize,
      this.y + 23 * fieldSize,
      fieldSize,
      fieldSize * 4
    );
    ctx.rect(this.x, this.y + 24 * fieldSize, 3 * fieldSize, fieldSize);
    ctx.rect(this.x, this.y + 26 * fieldSize, 3 * fieldSize, fieldSize);
    ctx.fillStyle = "black";
    ctx.fill();
  }
  update() {
    if (left && !isGameOver && this.x > 0) {
      this.x -= 3 * fieldSize;
      slideSound.play();
      left = false;
    }

    if (right && !isGameOver && this.x + 3 * fieldSize < canv.width) {
      this.x += 3 * fieldSize;
      slideSound.play();
      right = false;
    }
    setInterval(() => {
      score += 1;
    }, 1000);
    scoreField.innerText = `Score: ${score}`;
    recordField.innerText = `Record: ${
      localStorage.getItem("record") === null
        ? 0
        : localStorage.getItem("record")
    }`;
    this.draw();
  }
}

const main = new Main(3 * fieldSize, 0);
const player = new PlayerCar(0, 0);

function init() {
  if (!isGameOver) {
    main.update();
    player.draw();
    player.update();
  } else {
    let currentscore = score;
    if (score > localStorage.getItem("record")) {
      localStorage.setItem("record", currentscore);
    }
    window.location.reload();
  }
}
function upSpeed() {
  speed++;
  speedLimit.innerHTML = `Current speed: ${speed}`;
}
document.addEventListener("keydown", keyDownHandler);
function keyDownHandler(e) {
  if (e.keyCode === 37) {
    left = true;
  } else if (e.keyCode === 39) {
    right = true;
  }
}

soundtrackCheck.addEventListener("change", () => {
  soundtrack.play();
  if (soundtrackCheck.checked) {
    soundtrack.volume = 0.2;
  } else {
    soundtrack.volume = 0;
  }
});

soundsCheck.addEventListener("change", () => {
  if (soundsCheck.checked) {
    slideSound.volume = 0.2;
  } else {
    slideSound.volume = 0;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setInterval(upSpeed, 1000);
  setInterval(init, 100);
});
