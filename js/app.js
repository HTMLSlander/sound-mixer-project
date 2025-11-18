import { defaultPresets, sounds } from "./soundData.js";
import { SoundManager } from "./soundManager.js";

class AmbientMixer {
  constructor() {
    this.soundManager = new SoundManager();
    this.ui = null;
    this.presetManager = null;
    this.timer = null;
    this.currentSoundState = {};
    this.isInitialized = false;
  }
  init() {
    try {
      // Load all sound files
      this.loadAllSounds();
      this.isInitialized = true;
    } catch (error) {
      console.error("Fialed to initialize app: ", error);
    }
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
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AmbientMixer();
  app.init();
});
