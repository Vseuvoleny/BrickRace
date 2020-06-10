class View {
  constructor() {
    this.app = this.getElement("#root");
    this.section = this.createElement("section", "settings");
    this.score = this.createElement("p", "score_field");
    this.score.innerText = `Current score: ${setInterval(this.update, 100)}`;
    this.speed = this.createElement("p", "speed_field");
    this.speed.innerText = `Current speed: ${settings.speed}`;
    this.record = this.createElement("p", "record_field");
    this.record.innerText = this.checkRecord();
    this.audioBlock = this.createElement("div", "audio_block");
    this.audioInputs = this.createElement("div", "audio_control");
    this.trackCtrl = this.createElement("input", "track_check");
    this.trackCtrl.id = "track";
    this.trackCtrl.type = "checkbox";
    this.trackLabel = this.createElement("label", "track_label");
    this.trackLabel.for = "track";
    this.trackLabel.innerText = "Soundtrack";
    this.soundsCtrl = this.createElement("input", "sounds_check");
    this.soundsCtrl.id = "sounds";
    this.soundsCtrl.type = "checkbox";
    this.soundsLabel = this.createElement("label", "sounds_label");
    this.soundsLabel.for = "sounds";
    this.soundsLabel.innerText = "Sounds";
    this.soundsCollec = this.createElement("div", "audio_coll");
    this.soundTrack = this.createElement("audio", "soundtrack");
    this.soundTrack.volume = settings.volume;
    this.soundTrack.src = "./sounds/forrace.mp3";
    this.soundEffect = this.createElement("audio", "sounds");
    this.soundEffect.src = "./sounds/slides.mp3";
    this.soundEffect.volume = settings.volume;
    this.soundsCollec.append(this.soundTrack, this.soundEffect);
    this.audioInputs.append(
      this.trackCtrl,
      this.trackLabel,
      this.soundsCtrl,
      this.soundsLabel
    );
    this.section.append(this.score, this.speed, this.record);
    this.audioBlock.append(this.soundsCollec, this.audioInputs);
    this.app.append(this.section, this.audioBlock);
  }

  createElement = (tag, className) => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  };
  getElement = selector => {
    const element = document.querySelector(selector);

    return element;
  };

  checkRecord = () => {
    let currentScore = settings.score;
    if (settings.score > localStorage.getItem("record")) {
      localStorage.setItem("record", currentScore);
    } else {
      localStorage.setItem("record", localStorage.getItem("record"));
    }
    if (localStorage.getItem("record") === null) {
      this.record.innerText = `Current record: 0`;
    } else {
      this.record.innerText = `Current record: ${localStorage.getItem(
        "record"
      )}`;
    }

    return this.record.innerText;
  };

  update = () => {
    settings.score++;
    this.score.innerText = `Current score: ${settings.score}`;
  };
}
