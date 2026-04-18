let selectedMood = "";
let selectedGenre = "";
let selectedDuration = 15;
let selectedTempo = 50;
let selectedPopularity = "Populair";

let currentAudio = null;

window.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.querySelector(".playList-generate");
  const playlistEl = document.getElementById("playlist");

  // =========================
  // TOGGLES
  // =========================
  function setupToggleButtons(selector, setter) {
    document.querySelectorAll(selector).forEach((btn) => {
      btn.addEventListener("click", () => {
        const isActive = btn.classList.contains("active");

        document
          .querySelectorAll(selector)
          .forEach((b) => b.classList.remove("active"));

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

  // =========================
  // INPUTS
  // =========================
  document.getElementById("duration").addEventListener("change", (e) => {
    selectedDuration = Number(e.target.value);
  });

  document.getElementById("tempo").addEventListener("input", (e) => {
    selectedTempo = Number(e.target.value);
  });

  document.getElementById("popularity").addEventListener("change", (e) => {
    selectedPopularity = e.target.value;
  });

  // =========================
  // GENERATE
  // =========================
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

  // =========================
  // RENDER
  // =========================
  function renderPlaylist(tracks) {
    playlistEl.innerHTML = "";

    tracks.forEach((track) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="img">
          <img src="${track.image}" alt="cover" />
          <div class="liked">❤</div>
        </div>

        <h2>${track.name}</h2>
        <p>${track.artist}</p>

        <button class="play-preview">▶ Afspelen</button>
      `;

      // ================= PLAY =================
      const btn = card.querySelector(".play-preview");

      btn.addEventListener("click", () => {
        if (currentAudio && !currentAudio.paused) {
          currentAudio.pause();
          btn.textContent = "▶ Aspelen";
          currentAudio = null;
          return;
        }

        if (currentAudio) {
          currentAudio.pause();
        }

        if (track.previewUrl) {
          currentAudio = new Audio(track.previewUrl);
          currentAudio.play();
          btn.textContent = "⏸ Stop";
        } else {
          alert("No preview available");
        }

        currentAudio?.addEventListener("ended", () => {
          btn.textContent = "▶ Afspelen";
          currentAudio = null;
        });
      });

      // ================= LIKE (API) =================
      const heart = card.querySelector(".liked");

      heart.addEventListener("click", async () => {
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(track),
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
