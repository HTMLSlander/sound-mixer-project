export class SoundManager {
  constructor() {
    this.audioElements = new Map();
    this.isPlaying = false;
    console.log("SoundManager created");
  }

  loadSound(soundId, filePath) {
    try {
      const audio = new Audio();
      audio.src = filePath;
      audio.loop = true;
      audio.preload = "metadata"; // helps to avoid delay issues on playing sounds while using a smartphone
      this.audioElements.set(soundId, audio);
      return true;
    } catch (error) {
      console.error(`Failed to load sound ${soundId} from ${filePath}`);
      return false;
    }
  }
  async playSound(soundId) {
    const audio = this.audioElements.get(soundId);
    if (audio) {
      try {
        await audio.play();
        console.log(`Playing: ${soundId}`);
        return true;
      } catch (error) {
        console.error(`Failed to play ${soundId} ${error}`);
      }
    }
  }
  async pauseSound(soundId) {
    const audio = this.audioElements.get(soundId);
    if (audio && !audio.paused) {
      await audio.pause();
      console.log(`Paused: ${soundId}`);
      return true;
    }
  }
  setVolume(soundId, volume) {
    const audio = this.audioElements.get(soundId);
    if (!audio) {
      console.error(`Sound ${soundId} not found`);
      return false;
    }
    audio.volume = volume / 100;
  }
}
