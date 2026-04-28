let likedSongsCache = [];

async function toonMijnCollectie() {
  const res = await fetch("/collection/api/liked");
  likedSongsCache = await res.json();
  renderCollection(likedSongsCache);
}

function renderCollection(list) {
  const container = document.getElementById("collection-container");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>Geen favorieten 😢</p>";
    return;
  }

  list.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="img">
        <span class="liked active">❤</span>
        <img src="${track.image}" alt="${track.name}">
      </div>

      <div class="card-info">
        <h2>${track.name}</h2>
        <p>${track.artist}</p>
      </div>

      <button class="play-preview">▶ Preview</button>
    `;

    container.appendChild(card);
  });
}

// 🔍 SEARCH
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("search").value.toLowerCase();

  const filtered = likedSongsCache.filter((track) =>
    track.name.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query)
  );

  renderCollection(filtered);
});

// 🔽 SORT
document.getElementById("sort").addEventListener("change", function () {
  const value = this.value;

  let sorted = [...likedSongsCache];

  if (value === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (value === "artist") {
    sorted.sort((a, b) => a.artist.localeCompare(b.artist));
  }

  if (value === "popularity") {
    sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  renderCollection(sorted);
});

document.addEventListener("DOMContentLoaded", toonMijnCollectie);
