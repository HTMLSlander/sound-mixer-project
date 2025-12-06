export class UI {
  constructor() {
    this.soundCardsContainer = null;
    this.masterVolumeSlider = null;
    this.masterVolumeValue = null;
    this.playPauseButton = null;
    this.resetButton = null;
    this.modal = null;
    this.customPresetsContainer = null;
    this.timerDisplay = null;
    this.timerSelect = null;
    this.themeToggle = null;
  }
  init() {
    this.soundCardsContainer = document.querySelector(".grid");
    this.masterVolumeSlider = document.getElementById("masterVolume");
    this.masterVolumeValue = document.getElementById("masterVolumeValue");
    this.playPauseButton = document.getElementById("playPauseAll");
    this.resetButton = document.getElementById("resetAll");
    this.modal = document.getElementById("savePresetModal");
    this.customPresetsContainer = document.getElementById("customPresets");
    this.timerDisplay = document.getElementById("timerDisplay");
    this.timerSelect = document.getElementById("timerSelect");
    this.themeToggle = document.getElementById("themeToggle");
  }

  createSoundCards(sound) {
    const card = document.createElement("div");
    card.className =
      "sound-card bg-white/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden transition-all duration-300";
    card.dataset.sound = sound.id;

    card.innerHTML = ` <div class="flex flex-col h-full">
      <!-- Sound Icon and Name -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="sound-icon-wrapper w-12 h-12 rounded-full bg-gradient-to-br ${sound.color} flex items-center justify-center">
            <i class="fas ${sound.icon} text-white text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-lg">${sound.name}</h3>
            <p class="text-xs opacity-70">${sound.description}</p>
          </div>
        </div>
        <button type="button" class="play-btn w-[40px] h-[40px] rounded-full bg-white/10 hover:bg-white/80 hover:text-black transition-all duration-300 flex items-center justify-center" data-sound="${sound.id}">
          <i class="fas fa-play text-sm"></i>
        </button>
      </div>

      <!-- Volume Control -->
      <div class="mx-auto">
        <div class="flex items-center gap-x-2">
          <i class="fas fa-volume-low opacity-80"></i>
          <div class="relative">
            <input type="range" class="volume-slider" min="0" max="100" value="0" data-sound="${sound.id}">
            <div class="volume-bar">
              <div class="volume-bar-fill" style="width: 0%"></div>     
            </div>
          </div>
      </div>
    </div>`;

    return card;
  }

  createCustomPresetButton(name, presetId) {
    const button = document.createElement("button");
    button.className =
      "custom-preset-btn bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 relative group";
    button.dataset.preset = presetId;
    button.innerHTML = `<i class="fas fa-star mr-2 text-yellow-400"></i>
    ${name}
    <button type="button" class="delete-preset absolute -top-2 -right-2 w-6 h-6
    bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
    duration-300" data-preset="${presetId}">
    <i class="fas fa-times text-xs text-white"></i>
    </button>`;
    return button;
  }

  renderSoundCards(sounds) {
    this.soundCardsContainer.innerHTML = "";
    sounds.forEach((sound) => {
      const card = this.createSoundCards(sound);
      this.soundCardsContainer.appendChild(card);
    });
  }

  updateSoundPlayButton(soundId, isPlaying) {
    const card = document.querySelector(`[data-sound="${soundId}"]`);

    if (card) {
      const playBtn = card.querySelector(".play-btn");
      const icon = playBtn.querySelector("i");
      if (isPlaying) {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        card.classList.add("playing");
      } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        card.classList.remove("playing");
      }
    }
  }
  updateVolumeDisplay(soundId, volume) {
    const card = document.querySelector(`[data-sound="${soundId}"]`); // Select according to the attribute value
    const volumeBarFill = card.querySelector(".volume-bar-fill");
    const slider = card.querySelector(".volume-slider");
    if (!card) {
      throw "No card found";
    }

    if (!volumeBarFill) {
      throw "No volumeBarFill found";
    }
    if (!slider) {
      throw "No slider found";
    }
    slider.value = `${volume}`;
    volumeBarFill.style.width = `${volume}%`;
  }

  updateMasterVolumeDisplay(volume) {
    console.log(this.master);
    const slider = volumeBarFill.querySelector(".volume-bar-fill");
    console.log(slider);
    if (!volumeBarFill) {
      throw "No volumeBarFill found";
    }
    if (!slider) {
      throw "No slider found";
    }
    this.masterVolumeSlider.value = `${volume}`;
    volumeBarFill.style.width = `${volume}%`;
  }

  updateMainPlayButton(isPlaying) {
    const icon = this.playPauseButton.querySelector("i");
    if (isPlaying) {
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
    } else {
      icon.classList.add("fa-play");
      icon.classList.remove("fa-pause");
    }
  }

  resetUI() {
    const sliders = document.querySelectorAll(".volume-slider");
    const playButtons = document.querySelectorAll(".play-btn");
    const volumeBarFill = document.querySelector(
      ".master-volume-bar .volume-bar-fill"
    );

    playButtons.forEach((btn) => {
      btn.value = 0;
      const soundId = btn.dataset.sound;
      this.updateVolumeDisplay(soundId, 0);
    });

    playButtons.forEach((button) => {
      button.firstElementChild.classList.remove("fa-pause");
      button.firstElementChild.classList.add("fa-play");
    });

    const cards = document.querySelectorAll(".sound-card");
    cards.forEach((card) => {
      card.classList.remove("fa-playing");
    });

    this.updateMainPlayButton(false);

    this.masterVolumeSlider.value = 0;
    volumeBarFill.style.width = this.masterVolumeSlider.value;
  }
  showModal() {
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");
    document.getElementById("presetName").focus();
  }
  hideModal() {
    this.modal.classList.add("hidden");
    this.modal.classList.remove("flex");
    document.getElementById("presetName").value = "";
  }
  addCustomPreset(name, presetId) {
    const button = this.createCustomPresetButton(name, presetId);
    this.customPresetsContainer.appendChild(button);
  }
  setActivePreset(presetKey) {
    document
      .querySelectorAll(".preset-btn, custom-preset-btn")
      .forEach((btn) => {
        btn.classList.remove("preset-active");
      });
    const presetValue =
      typeof presetKey === "string" ? presetKey : presetKey?.dataset?.preset;

    const activeButton = document.querySelector(
      `.preset-btn[data-preset="${presetValue}"], .custom-preset-btn[data-preset="${presetValue}"]`
    );
    if (activeButton) {
      activeButton.classList.add("preset-active");
    }
  }
}
