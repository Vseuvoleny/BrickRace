const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = columns * fieldSize;
canvas.height = rows * fieldSize;

const game = new Game(3 * fieldSize, 0);
const player = new PlayerCar(0, 0);
const app = new Controller(new View());

function play() {
  if (!settings.isGameOver) {
    game.update();
    player.draw();
    player.update();
  } else {
    game.endGame();
  }
}

document.addEventListener("keydown", app.keyDownHandler);
app.view.soundsCtrl.addEventListener("change", app.soundsHandler);
app.view.trackCtrl.addEventListener("change", app.SoundTrackHandler);

document.addEventListener("DOMContentLoaded", () => {
  setInterval(play, 100);
  setInterval(app.view.updateScore, 100);
  setInterval(app.view.updateSpeed, 500);
});
