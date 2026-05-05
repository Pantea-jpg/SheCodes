let likedSongsCache = [];
let currentAudio = null;
let currentButton = null;

// =======================================
// 1. LIKES LADEN
// =======================================
async function toonMijnCollectie() {
  const res = await fetch("/collection/api/liked");
  likedSongsCache = await res.json();
  renderCollection(likedSongsCache);
}

// =======================================
// 2. COLLECTION RENDERN
// =======================================
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
        <img src="${track.image}" alt="${track.name}">
        <span class="liked active">❤</span>
      </div>

      <div class="card-info">
        <h2>${track.name}</h2>
        <p>${track.artist}</p>
      </div>

      <button class="play-preview">▶ Afspelen</button>
    `;

    // ===============================
    // PLAY PREVIEW
    // ===============================
    const btn = card.querySelector(".play-preview");

    btn.addEventListener("click", () => {
      // Stop vorheriges Audio
      if (currentAudio) {
        currentAudio.pause();
        if (currentButton) currentButton.textContent = "▶ Afspelen";
      }

      // Wenn derselbe Button → stoppen
      if (currentButton === btn) {
        currentAudio = null;
        currentButton = null;
        return;
      }

      if (!track.previewUrl) {
        alert("Geen preview beschikbaar");
        return;
      }

      currentAudio = new Audio(track.previewUrl);
      currentAudio.play();

      btn.textContent = "⏸ Stop";
      currentButton = btn;

      currentAudio.addEventListener("ended", () => {
        btn.textContent = "▶ Afspelen";
        currentAudio = null;
        currentButton = null;
      });
    });

    // ===============================
    // LIKE ENTFERNEN
    // ===============================
    const heart = card.querySelector(".liked");

    heart.addEventListener("click", async () => {
      const res = await fetch("/generator/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(track),
      });

      const data = await res.json();

     if (!data.liked) {
  // Herz visuell deaktivieren
  heart.classList.remove("active");

  // Animation starten
  card.classList.add("removing");

  // Nach der Animation Karte entfernen
  setTimeout(() => {
    if (currentAudio) {
  currentAudio.pause();
  currentAudio = null;
  if (currentButton) currentButton.textContent = "▶ Afspelen";
}

    card.remove();
    likedSongsCache = likedSongsCache.filter((t) => t.id !== track.id);
  }, 250); // muss zur CSS transition passen
}

    });

    container.appendChild(card);
  });
}

// =======================================
// 3. SEARCH
// =======================================
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("search").value.toLowerCase();

  const filtered = likedSongsCache.filter((track) =>
    track.name.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query)
  );

  renderCollection(filtered);
});

// =======================================
// 4. SORT
// =======================================
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

// =======================================
// 5. INIT
// =======================================
document.addEventListener("DOMContentLoaded", toonMijnCollectie);
