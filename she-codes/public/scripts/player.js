// public/scripts/player.js
// Connects .play-btn buttons (data-url) to the sticky player at the bottom

const audio = new Audio();
audio.volume = 0.8;

let currentBtn = null;
let isPlaying = false;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const trackNameEl = document.getElementById("track-name");
const artistNameEl = document.getElementById("artist-name");
const playBtnEl = document.getElementById("play-btn");
const playIconEl = document.getElementById("play-icon");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress-bar");
const curTimeEl = document.getElementById("cur-time");
const coverArt = document.querySelector(".cover-art");

// ── Icons ─────────────────────────────────────────────────────────────────────
const PLAY_ICON = `<polygon points="5 3 19 12 5 21 5 3"/>`;
const PAUSE_ICON = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;

// ── Wire up every .play-btn on the page ───────────────────────────────────────
document.querySelectorAll(".play-btn[data-url]").forEach((btn) => {
  btn.addEventListener("click", () => handlePlayBtn(btn));
});

function handlePlayBtn(btn) {
  const url = btn.dataset.url;
  const name =
    btn
      .closest(".track-item")
      ?.querySelector(".track-name")
      ?.textContent?.trim() ?? "—";
  const artist =
    btn
      .closest(".track-item")
      ?.querySelector(".track-artist")
      ?.textContent?.trim() ?? "—";
  const img = btn.closest(".track-item")?.querySelector("img")?.src ?? null;

  // Clicking same track → toggle play/pause
  if (currentBtn === btn) {
    togglePlayPause();
    return;
  }

  // New track
  currentBtn = btn;
  loadTrack({ url, name, artist, img });
}

function loadTrack({ url, name, artist, img }) {
  if (!url) {
    showNoPreview();
    return;
  }

  audio.src = url;
  audio.load();
  audio.play().catch(console.warn);
  isPlaying = true;

  // Update sticky player info
  trackNameEl.textContent = name;
  artistNameEl.textContent = artist;

  // Cover art
  if (img) {
    coverArt.innerHTML = `<img src="${img}" style="width:100%;height:100%;border-radius:inherit;object-fit:cover;" alt="" />`;
  } else {
    coverArt.innerHTML = defaultCoverSVG();
  }

  setPlayIcon(true);
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    setPlayIcon(false);
  } else {
    audio.play().catch(console.warn);
    isPlaying = true;
    setPlayIcon(true);
  }
}

// Sticky player play/pause button
playBtnEl?.addEventListener("click", togglePlayPause);

// ── Progress bar ──────────────────────────────────────────────────────────────
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + "%";
  curTimeEl.textContent = fmt(audio.currentTime);
});

audio.addEventListener("ended", () => {
  isPlaying = false;
  setPlayIcon(false);
  progressFill.style.width = "0%";
  curTimeEl.textContent = "0:00";
});

progressBar?.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function setPlayIcon(playing) {
  if (!playIconEl) return;
  playIconEl.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
}

function fmt(sec) {
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function defaultCoverSVG() {
  return `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="white" opacity="0.9"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="white" opacity="0.4"/>
    </svg>`;
}

function showNoPreview() {
  trackNameEl.textContent = "Geen preview beschikbaar";
  artistNameEl.textContent = "—";
}
