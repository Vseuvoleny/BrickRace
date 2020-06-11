class Game {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
  };

  update() {
    if (!settings.isGameOver) {
      this.y += settings.speed;
    }
    if (this.y > canvas.height + fieldSize) {
      this.x =
        Math.random() < 0.3
          ? 0
          : Math.random() > 0.6
          ? 3 * fieldSize
          : 6 * fieldSize;
      this.y = 0;
    }
    if (this.x == player.x && this.y + 4 * fieldSize > 24 * fieldSize) {
      settings.isGameOver = true;
    }
    this.draw();
  }

  endGame = () => {
    let currentScore = settings.score;
    if (settings.score > localStorage.getItem("Record")) {
      localStorage.setItem("Record", currentScore);
    } else {
      localStorage.setItem("Record", localStorage.getItem("Record"));
    }

    window.location.reload();
  };
}
