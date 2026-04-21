// ===============================
// GLOBALE STATE
// ===============================
let selectedMood = "";
let selectedGenre = "";
let selectedDuration = 15;
let selectedTempo = 50;
let selectedPopularity = "Populair";

// Alleen 1 audio tegelijk
let currentAudio = null;
let currentButton = null;

window.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.querySelector(".playList-generate");
  const playlistEl = document.getElementById("playlist");

  // ===============================
  // TOGGLE BUTTONS (mood + genre)
  // ===============================
  function setupToggleButtons(selector, setter) {
    document.querySelectorAll(selector).forEach((btn) => {
      btn.addEventListener("click", () => {
        const isActive = btn.classList.contains("active");

        // Eerst alles uitzetten
        document
          .querySelectorAll(selector)
          .forEach((b) => b.classList.remove("active"));

        // Dan deze activeren of leegmaken
        if (!isActive) {
          btn.classList.add("active");
          setter(btn.textContent.trim());
        } else {
          setter("");
        }
      });
    });
  }

  setupToggleButtons(".mood-section button", (v) => (selectedMood = v));
  setupToggleButtons(".genre-section button", (v) => (selectedGenre = v));

  // ===============================
  // INPUTS
  // ===============================
  document.getElementById("duration").addEventListener("change", (e) => {
    selectedDuration = Number(e.target.value);
  });

  document.getElementById("tempo").addEventListener("input", (e) => {
    selectedTempo = Number(e.target.value);
  });

  document.getElementById("popularity").addEventListener("change", (e) => {
    selectedPopularity = e.target.value;
  });

  // ===============================
  // GENERATE PLAYLIST
  // ===============================
  generateBtn.addEventListener("click", async () => {
    if (!selectedMood && !selectedGenre) {
      alert("Kies minstens een mood of genre!");
      return;
    }

    generateBtn.textContent = "Loading...";

    const res = await fetch("/generator/api/generate-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood: selectedMood,
        genre: selectedGenre,
        duration: selectedDuration,
        tempo: selectedTempo,
        popularity: selectedPopularity,
      }),
    });

    const data = await res.json();

    renderPlaylist(data.playlist || []);

    generateBtn.textContent = "Afspeellijst Genereren";
  });

  // ===============================
  // RENDER PLAYLIST
  // ===============================
  function renderPlaylist(tracks) {
    playlistEl.innerHTML = "";

    tracks.forEach((track) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="img">
          <img src="${track.image}" alt="cover" />
          <span class="liked">❤</span>
        </div>

        <h2>${track.name}</h2>
        <p>${track.artist}</p>

        <button class="play-preview">▶ Afspelen</button>
      `;

      // ===============================
      // PLAY PREVIEW (simpel & duidelijk)
      // ===============================
      const btn = card.querySelector(".play-preview");

      btn.addEventListener("click", () => {
        // 1. Stop ALTIJD eerst wat er al speelt
        if (currentAudio) {
          currentAudio.pause();
          if (currentButton) {
            currentButton.textContent = "▶ Afspelen";
          }
        }

        // 2. Als je op dezelfde knop klikt → gewoon stoppen
        if (currentButton === btn) {
          currentAudio = null;
          currentButton = null;
          return;
        }

        // 3. Nieuw nummer starten
        if (!track.previewUrl) {
          alert("Geen preview beschikbaar");
          return;
        }

        currentAudio = new Audio(track.previewUrl);
        currentAudio.play();

        btn.textContent = "⏸ Stop";
        currentButton = btn;

        // 4. Als audio klaar is → reset
        currentAudio.addEventListener("ended", () => {
          btn.textContent = "▶ Afspelen";
          currentAudio = null;
          currentButton = null;
        });
      });

      // ===============================
      // LIKE BUTTON
      // ===============================
      const heart = card.querySelector(".liked");

      heart.addEventListener("click", async () => {
        const res = await fetch("/generator/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: track.id,
            name: track.name,
            artist: track.artist,
            image: track.image,
            previewUrl: track.previewUrl,
          }),
        });

        const data = await res.json();

        if (data.liked) {
          heart.classList.add("active");
        } else {
          heart.classList.remove("active");
        }
      });

      playlistEl.appendChild(card);
    });
  }
});
