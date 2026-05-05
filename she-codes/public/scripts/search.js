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
