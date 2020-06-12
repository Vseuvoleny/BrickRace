const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = columns * fieldSize;
canvas.height = rows * fieldSize;

const app = new Controller(
  new View(),
  new PlayerCar(0, 0),
  new Game(3 * fieldSize, 0)
);

function play() {
  if (!settings.isGameOver) {
    app.game.update();
    app.playerCar.draw();
    app.playerCar.update();
  } else {
    app.game.endGame();
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
