
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const tabBtns = document.querySelectorAll(".tab-btn");
const resultsGrid = document.getElementById("resultsGrid");
const resultsHeader = document.getElementById("resultsHeader");
const queryLabel = document.getElementById("queryLabel");
const resultCount = document.getElementById("resultCount");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");
const noResults = document.getElementById("noResults");
const trendingSection = document.getElementById("trendingSection");
const playerBar = document.getElementById("playerBar");
const playerClose = document.getElementById("playerClose");
const audioEl = document.getElementById("audioEl");
const playerImg = document.getElementById("playerImg");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

let currentType = "tracks"; // "tracks" | "artists"


tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
  });
});


searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

async function runSearch() {
  const q = searchInput.value.trim();
  if (!q) return;

  showState("loading");

  try {
    const url =
      currentType === "tracks"
        ? `/api/search/tracks?q=${encodeURIComponent(q)}`
        : `/api/search/artists?q=${encodeURIComponent(q)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      showState("noResults");
      return;
    }

    renderResults(data, q);
    showState("results");
  } catch (err) {
    console.error(err);
    showState("noResults");
  }
}

function renderResults(items, query) {
  queryLabel.textContent = `"${query}"`;
  resultCount.textContent = `${items.length} resultaten`;

  resultsGrid.innerHTML = items
    .map((item) => {
      const name = item.name || "—";
      const sub =
        item.artist ||
        (item.listeners
          ? `${Number(item.listeners).toLocaleString()} luisteraars`
          : "");
      const img = item.image || "/assets/default.png";
      const preview = item.previewUrl || "";

      return `
      <div class="track-card" data-preview="${preview}" data-img="${img}" data-name="${name}" data-sub="${sub}">
        <div class="card-img-wrap">
          <img src="${img}" alt="${name}" class="card-img" onerror="this.src='/assets/default.png'" />
          <div class="card-overlay">
            <button class="play-btn" ${!preview ? 'disabled title="Geen preview beschikbaar"' : ""}>
              ${preview ? "▶" : "✕"}
            </button>
          </div>
        </div>
        <div class="card-info">
          <p class="card-title">${name}</p>
          <p class="card-artist">${sub}</p>
        </div>
        <button class="fav-btn" aria-label="Toevoegen aan favorieten">♡</button>
      </div>
    `;
    })
    .join("");

  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll(".track-card").forEach((card) => {
    const playBtn = card.querySelector(".play-btn");
    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const preview = card.dataset.preview;
        if (!preview) return;
        openPlayer(
          preview,
          card.dataset.img,
          card.dataset.name,
          card.dataset.sub,
        );
      });
    }

    const favBtn = card.querySelector(".fav-btn");
    if (favBtn) {
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        favBtn.classList.toggle("active");
        favBtn.textContent = favBtn.classList.contains("active") ? "♥" : "♡";
      });
    }
  });
}


function openPlayer(previewUrl, img, title, artist) {
  audioEl.src = previewUrl;
  audioEl.play();
  playerImg.src = img;
  playerTitle.textContent = title;
  playerArtist.textContent = artist;
  playerBar.style.display = "flex";
}

playerClose.addEventListener("click", () => {
  audioEl.pause();
  audioEl.src = "";
  playerBar.style.display = "none";
});


function showState(state) {
  emptyState.style.display = "none";
  noResults.style.display = "none";
  loadingState.style.display = "none";
  resultsHeader.style.display = "none";
  resultsGrid.innerHTML = "";
  trendingSection.style.display = "block";

  if (state === "loading") {
    loadingState.style.display = "flex";
    trendingSection.style.display = "none";
  } else if (state === "noResults") {
    noResults.style.display = "block";
    trendingSection.style.display = "none";
  } else if (state === "results") {
    resultsHeader.style.display = "block";
    trendingSection.style.display = "none";
  } else {
    emptyState.style.display = "block";
  }
}


const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
}

function closeMenuFn() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
}

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (closeMenu) closeMenu.addEventListener("click", closeMenuFn);
if (overlay) overlay.addEventListener("click", closeMenuFn);

document.querySelectorAll(".trending-card .fav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("active");
    btn.textContent = btn.classList.contains("active") ? "♥" : "♡";
  });
});
