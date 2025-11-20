import { sounds } from "./soundData.js";
import { SoundManager } from "./soundManager.js";
import { UI } from "./ui.js";

class AmbientMixer {
  constructor() {
    this.soundManager = new SoundManager();
    this.ui = new UI();
    this.presetManager = null;
    this.timer = null;
    this.currentSoundState = {};
    this.isInitialized = false;
  }
  init() {
    try {
      // Initialize UI
      this.ui.init();

      // Render sound cards using our sound data
      this.ui.renderSoundCards(sounds);
      this.setupEventListeners();
      // Load all sound files
      this.loadAllSounds();
      // this.soundManager.setVolume("rain", 30);
      // this.soundManager.playSound("rain");
      this.isInitialized = true;
    } catch (error) {
      console.error("Fialed to initialize app: ", error);
    }
  }

  setupEventListeners() {
    document.addEventListener("click", async (e) => {
      let soundId = e.target.closest(".play-btn");
      if (soundId) {
        soundId = soundId.dataset.sound;
        await this.toggleSound(soundId);
      }
    });
    document.addEventListener("input", (e) => {
      if (e.target.classList.contains("volume-slider")) {
        const soundId = e.target.dataset.sound;
        const volume = +e.target.value;
        this.setSoundVolume(soundId, volume);
        console.log(soundId, volume);
      }
    });
  }
  loadAllSounds() {
    sounds.forEach((sound) => {
      const audioUrl = `audio/${sound.file}`;
      const success = this.soundManager.loadSound(sound.id, audioUrl);
      if (!success) {
        console.warn(`Could not load sound: ${sound.name} from ${audioUrl}`);
      }
    });
  }
  async toggleSound(soundId) {
    const audio = this.soundManager.audioElements.get(soundId);
    if (!audio) {
      console.log(`Audio ${soundId} not found`);
      return false;
    }

    if (audio.paused) {
      this.soundManager.setVolume(soundId, 50);
      await this.soundManager.playSound(soundId);
      this.ui.updateSoundPlayButton(soundId, true);
    } else {
      await this.soundManager.pauseSound(soundId);
      this.ui.updateSoundPlayButton(soundId, false);
    }
  }

  setSoundVolume(soundId, volume) {
    this.soundManager.setVolume(soundId, volume);
    this.ui.updateVolumeDisplay(soundId, volume);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AmbientMixer();
  app.init();
});
