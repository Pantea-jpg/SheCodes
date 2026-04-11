"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#mySearch");
const resultsContainer = document.querySelector("#results");
const homeContainer = document.querySelector("#home-sections");
const tracksButton = document.querySelector(".tracksbutton");
const artistsButton = document.querySelector(".artistsbutton");

let artists = [];
let lastSearchData = null;

// 1. JSON inladen
fetch("./json/data.json")
  .then((res) => res.json())
  .then((data) => {
    artists = data;
    renderHomeSections(); // startpagina tonen
  })
  .catch((err) => console.error("JSON error:", err));

// 2. Zoeken bij submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch();
});

// 3. Zoeken tijdens typen
input.addEventListener("input", () => {
  if (input.value.trim() === "") {
    lastSearchData = null;
    renderHomeSections();
  } else {
    handleSearch();
  }
});

// 4. FILTER KNOPPEN
tracksButton.addEventListener("click", () => {
  tracksButton.classList.add("active");
  artistsButton.classList.remove("active");

  if (lastSearchData) {
    renderResults(input.value.trim().toLowerCase());
  }
});

artistsButton.addEventListener("click", () => {
  artistsButton.classList.add("active");
  tracksButton.classList.remove("active");

  if (lastSearchData) {
    renderResults(input.value.trim().toLowerCase());
  }
});

// 5. Zoekfunctie (artiest + nummer)
function handleSearch() {
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  lastSearchData = artists.filter(
    (a) =>
      a.artist.toLowerCase().includes(query) ||
      a.tracks.some((t) => t.title.toLowerCase().includes(query)),
  );

  renderResults(query);
}

// 6. Resultaten tonen (met filters)
function renderResults(query) {
  homeContainer.style.display = "none";
  resultsContainer.style.display = "block";

  const showTracks = tracksButton.classList.contains("active");

  resultsContainer.innerHTML = "";

  // --- Alleen TRACKS tonen ---
  if (showTracks) {
    lastSearchData.forEach((a) => {
      const matchedTracks = a.tracks.filter((t) =>
        t.title.toLowerCase().includes(query),
      );

      matchedTracks.forEach((track) => {
        const html = `
          <div class="result-item">
            <img src="${a.image}" class="image" />
            <div>
              <strong>${track.title}</strong><br>
              ${a.artist}
            </div>
            <a href="${a.page}" class="details-btn">Details</a>
          </div>
        `;
        resultsContainer.insertAdjacentHTML("beforeend", html);
      });
    });
    return;
  }

  // --- Alleen ARTIESTEN tonen ---
  lastSearchData.forEach((a) => {
    const html = `
      <div class="result-item">
        <img src="${a.image}" class="image" />
        <div>
          <strong>${a.artist}</strong><br>
          ${a.genres.join(", ")}
        </div>
        <a href="${a.page}" class="details-btn">Details</a>
        
      </div>
    `;
    resultsContainer.insertAdjacentHTML("beforeend", html);
  });
}

// 7. Home-sections tonen
function renderHomeSections() {
  homeContainer.style.display = "block";
  resultsContainer.style.display = "none";

  homeContainer.innerHTML = `
    <h2 class="section-title">🔥 Trending artiesten</h2>
    <div class="home-row">
      ${artists
        .slice(0, 3)
        .map(
          (a) => `
        <div class="home-card">
          <img src="${a.image}" class="home-img round">
          <p>${a.artist}</p>
        </div>
      `,
        )
        .join("")}
    </div>

    <h2 class="section-title">🌍 Populaire artiesten</h2>
    <div class="home-row">
      ${artists
        .slice(3, 6)
        .map(
          (a) => `
        <div class="home-card">
          <img src="${a.image}" class="home-img round">
          <p>${a.artist}</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}
