"use strict";

const tracksButton = document.querySelector(".tracksbutton");
const artistsButton = document.querySelector(".artistsbutton");

//  FILTER KNOPPEN
tracksButton.addEventListener("click", () => {
  tracksButton.classList.add("active");
  artistsButton.classList.remove("active");
});

artistsButton.addEventListener("click", () => {
  artistsButton.classList.add("active");
  tracksButton.classList.remove("active");
});

function filterResults(type) {
  const items = document.querySelectorAll(".result-item");

  items.forEach((item) => {
    if (item.dataset.type === type) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

document.getElementById("filter-artists").addEventListener("click", () => {
  filterResults("artist");
});

document.getElementById("filter-tracks").addEventListener("click", () => {
  filterResults("track");
});

let currentAudio = null;
let currentButton = null;

document.addEventListener("click", (e) => {
  // PREVIEW BUTTON
  if (e.target.classList.contains("play-btn")) {
    const btn = e.target;
    const url = btn.dataset.url;

    // Zelfde knop → stoppen
    if (currentButton === btn && currentAudio) {
      currentAudio.pause();
      btn.textContent = "▶";
      currentAudio = null;
      currentButton = null;
      return;
    }

    // Andere audio speelt → stoppen
    if (currentAudio) {
      currentAudio.pause();
      if (currentButton) currentButton.textContent = "▶";
    }

    // Nieuwe audio starten
    currentAudio = new Audio(url);
    currentAudio.play();

    btn.textContent = "⏸";
    currentButton = btn;

    currentAudio.onended = () => {
      btn.textContent = "▶";
      currentAudio = null;
      currentButton = null;
    };
  }

  if (e.target.classList.contains("youtube-btn")) {
    const videoId = e.target.dataset.video;

    if (!videoId) {
      alert("Geen YouTube video gevonden");
      return;
    }

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    window.open(url, "_blank", "width=500,height=400");
  }
});
