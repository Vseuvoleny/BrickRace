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

app.view.trackCtrl.addEventListener("change", () => {
  app.view.soundTrack.play();
  if (app.view.trackCtrl.checked) {
    app.view.soundTrack.volume = 0.2;
  } else {
    app.view.soundTrack.volume = 0;
  }
});

setInterval(play, 100);

function x() {
  setInterval(() => {
    settings.speed++;
    app.view.speed.innerText = `Current speed: ${settings.speed}`;
  }, 500);
}

setInterval(app.view.update, 100);
x();
