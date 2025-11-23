import { sounds } from "./soundData.js";
import { SoundManager } from "./soundManager.js";
import { UI } from "./ui.js";

class AmbientMixer {
  constructor() {
    this.soundManager = new SoundManager();
    this.ui = new UI();
    this.presetManager = null;
    this.timer = null;
    this.masterVolume = 100;
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
      sounds.forEach((sound) => {
        this.currentSoundState[sound.id] = 0;
      });
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize app: ", error);
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
      }
    });
    const masterVolumeSlider = document.getElementById("masterVolume");
    if (masterVolumeSlider) {
      masterVolumeSlider.addEventListener("input", (e) => {
        if (e.target.classList.contains("volume-slider")) {
          const volume = +e.target.value;
          this.setMasterVolume(volume);
        }
      });
    }
    if (this.ui.playPauseButton) {
      this.ui.playPauseButton.addEventListener("click", () => {
        this.toggleAllSounds();
      });
    }
    if (this.ui.resetButton) {
      this.ui.resetButton.addEventListener("click", () => {
        this.resetAll();
      });
    }
  }
  resetAll() {
    this.soundManager.stopAll();
    this.masterVolume = 100;
    this.ui.resetUI();
    console.log("All sounds and settings reset");
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
      // Get current slider value
      const card = document.querySelector(`[data-sound="${soundId}"]`);
      const slider = card.querySelector(".volume-slider");
      let volume = +slider.value;
      if (volume === 0) {
        volume = 50;
        this.ui.updateVolumeDisplay(soundId, volume);
      }
      this.soundManager.setVolume(soundId, volume);
      await this.soundManager.playSound(soundId);
      this.ui.updateSoundPlayButton(soundId, true);
    } else {
      await this.soundManager.pauseSound(soundId);
      this.ui.updateSoundPlayButton(soundId, false);
    }
    this.updateMainPlayButtonState();
  }

  toggleAllSounds() {
    if (this.soundManager.isPlaying) {
      this.soundManager.pauseAll();
      this.ui.updateMainPlayButton(false);
      sounds.forEach((sound) => {
        this.ui.updateSoundPlayButton(sound.id, false);
      });
    } else {
      for (const [soundId, audio] of this.soundManager.audioElements) {
        const card = document.querySelector(`[data-sound="${soundId}"]`);
        const slider = card?.querySelector(".volume-slider");

        if (slider) {
          let volume = +slider.value;
          if (volume === 0) {
            volume = 50;
            slider.value = 50;
            this.ui.updateVolumeDisplay(soundId, 50);
          }
          this.currentSoundState[soundId] = volume;

          const effectiveVolume = (volume * this.masterVolume) / 100;
          audio.volume = effectiveVolume / 100;
          this.ui.updateSoundPlayButton(soundId, true);
        }
      }

      this.soundManager.playAll();
      this.setMasterVolume(50);

      this.ui.updateMainPlayButton(true);
    }
  }

  setSoundVolume(soundId, volume) {
    const effectiveVolume = (volume * this.masterVolume) / 100;
    const audio = this.soundManager.audioElements.get(soundId);
    if (audio) {
      audio.volume = effectiveVolume / 100;
    }
    // this.soundManager.setVolume(soundId, volume);
    this.ui.updateVolumeDisplay(soundId, volume);
  }
  setMasterVolume(volume) {
    this.masterVolume = volume;
    const masterVolumeValue = document.querySelector(".master-volume-bar");
    masterVolumeValue.previousElementSibling.value = volume;
    masterVolumeValue.querySelector(".volume-bar-fill").style.width =
      `${volume}%`;
    this.applyMasterVolumeToAll();
  }
  applyMasterVolumeToAll() {
    for (const [soundId, audio] of this.soundManager.audioElements) {
      if (!audio.paused) {
        const card = document.querySelector(`[data-sound=${soundId}]`);
        const slider = card?.querySelector(".volume-slider");
        if (slider) {
          const individualVolume = +slider.value;
          const effectiveVolume = (individualVolume * this.masterVolume) / 100;
          audio.volume = effectiveVolume / 100;
        }
      }
    }
  }

  updateMainPlayButtonState() {
    let anySoundsPlaying = false;
    for (const [soundId, audio] of this.soundManager.audioElements) {
      if (!audio.paused) {
        anySoundsPlaying = true;
        break;
      }
    }

    this.soundManager.isPlaying = anySoundsPlaying;
    this.ui.updateMainPlayButton(anySoundsPlaying);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new AmbientMixer();
  app.init();
});
