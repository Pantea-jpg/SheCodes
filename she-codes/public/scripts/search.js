"use strict";


// const resultsContainer = document.querySelector("#results");
// const homeContainer = document.querySelector("#home-sections");
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



// // 7. Home-sections tonen
// function renderHomeSections() {
//   homeContainer.style.display = "block";
//   resultsContainer.style.display = "none";

//   homeContainer.innerHTML = `
//     <h2 class="section-title">🔥 Trending artiesten</h2>
//     <div class="home-row">
//       ${artists
//         .slice(0, 3)
//         .map(
//           (a) => `
//         <div class="home-card">
//           <img src="${a.image}" class="home-img round">
//           <p>${a.artist}</p>
//         </div>
//       `,
//         )
//         .join("")}
//     </div>

//     <h2 class="section-title">🌍 Populaire artiesten</h2>
//     <div class="home-row">
//       ${artists
//         .slice(3, 6)
//         .map(
//           (a) => `
//         <div class="home-card">
//           <img src="${a.image}" class="home-img round">
//           <p>${a.artist}</p>
//         </div>
//       `,
//         )
//         .join("")}
//     </div>
//   `;
// }


// document.addEventListener("DOMContentLoaded", () => {
//   const artistItems = document.querySelectorAll(".artist-item");
//   const trackItems = document.querySelectorAll(".track-item");

//   const btnArtists = document.getElementById("filter-artists");
//   const btnTracks = document.getElementById("filter-tracks");

  

//   // Artists
//   btnArtists.addEventListener("click", () => {
//     artistItems.forEach((el) => (el.style.display = "flex"));
//     trackItems.forEach((el) => (el.style.display = "none"));
//   });

  // Tracks
//   btnTracks.addEventListener("click", () => {
//     artistItems.forEach((el) => (el.style.display = "none"));
//     trackItems.forEach((el) => (el.style.display = "flex"));
//   });
// });
function filterResults(type) {
  const items = document.querySelectorAll(".result-item");

  items.forEach(item => {
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
window.playPreview = playPreview;