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

let audio = null;
let currentButton = null;

window.togglePlay = function (btn, url) {
  // Als dit dezelfde knop is en audio speelt → STOPPEN
  if (audio && !audio.paused && currentButton === btn) {
    audio.pause();
    btn.textContent = "▶";
    return;
  }

  // Als er al iets anders speelt → pauzeer en reset vorige knop
  if (audio && !audio.paused) {
    audio.pause();
    if (currentButton) currentButton.textContent = "▶";
  }

  // Nieuwe audio starten
  audio = new Audio(url);
  audio.play();

  // Knop veranderen naar pauze
  btn.textContent = "⏸";
  currentButton = btn;

  // Als audio klaar is → terug naar play
  audio.onended = () => {
    btn.textContent = "▶";
  };
};
// window.playPreview = playPreview;
