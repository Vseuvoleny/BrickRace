class Controller {
  constructor(view) {
    this.view = view;
  }

  keyDownHandler = e => {
    if (e.keyCode === 37) {
      this.view.soundEffect.play();
      settings.left = true;
    } else if (e.keyCode === 39) {
      this.view.soundEffect.play();
      settings.right = true;
    }
  };

  soundsHandler = () => {
    console.log(23);

    if (this.view.soundsCtrl.checked) {
      this.view.soundEffect.volume = 0.2;
    } else {
      this.view.soundEffect.volume = 0;
    }
  };
}
