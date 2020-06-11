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
    if (settings.left && !settings.isGameOver && this.x > 0) {
      this.x -= 3 * fieldSize;
      settings.left = false;
    }

    if (
      settings.right &&
      !settings.isGameOver &&
      this.x + 3 * fieldSize < canvas.width
    ) {
      this.x += 3 * fieldSize;
      settings.right = false;
    }
    this.draw();
  }
}
