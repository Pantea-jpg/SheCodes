// VARIABLES
// ==============================
const moodButtons = document.querySelectorAll(".mood-section button");
const genreButtons = document.querySelectorAll(".genre-section button");
const durationSelect = document.getElementById("duration");
const tempoSlider = document.getElementById("tempo");
const popularitySelect = document.getElementById("popularity");
const playlist = document.getElementById("playlist");
const generateBtn = document.querySelector(".playList-generate");
const durationText = document.getElementById("playlist-duration"); // optional

let selectedMood = "";
let selectedGenre = "";
let selectedDuration = 15;
let selectedTempo = 50;
let selectedPopularity = "Populair";

let artistsData = [];
let currentAudio = null;

// ==============================
// LOAD JSON
// ==============================
async function loadArtists() {
  const response = await fetch("../json/data.json");
  artistsData = await response.json();
}

loadArtists();

// ==============================
// MOOD BUTTONS
// ==============================
moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      selectedMood = "";
      return;
    }
    moodButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMood = btn.textContent.trim();
  });
});

// ==============================
// GENRE BUTTONS
// ==============================
genreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      selectedGenre = "";
      return;
    }
    genreButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedGenre = btn.textContent.trim();
  });
});

// ==============================
// SELECTS
// ==============================
durationSelect.addEventListener("change", () => {
  selectedDuration = Number(durationSelect.value);
});

tempoSlider.addEventListener("input", () => {
  selectedTempo = Number(tempoSlider.value);
});

popularitySelect.addEventListener("change", () => {
  selectedPopularity = popularitySelect.value;
});

// ==============================
// SHUFFLE FUNCTION
// ==============================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ==============================
// GENERATE PLAYLIST
// ==============================
generateBtn.addEventListener("click", async () => {
  if (artistsData.length === 0) {
    await loadArtists();
  }

  let tracks = [];

  artistsData.forEach((artist) => {
    // FILTER genre case-insensitive
    if (
      selectedGenre &&
      !artist.genres.some((g) =>
        g.toLowerCase().includes(selectedGenre.toLowerCase()),
      )
    ) {
      return;
    }

    artist.tracks.forEach((track) => {
      tracks.push({
        id: track.title,
        name: track.title,
        artist: artist.artist,
        album: track.album,
        releaseDate: track.releaseDate,
        genre: track.genre,
        image: artist.image,
      });
    });
  });

  // ==========================
  // MOOD FILTER
  // ==========================
  if (selectedMood === "😎 Chill") {
    tracks = tracks.filter(
      (t) =>
        t.genre.includes("Pop") ||
        t.genre.includes("R&B") ||
        t.genre.includes("Alternative") ||
        t.genre.includes("Jazz"),
    );
  } else if (selectedMood === "🏃Energiek") {
    tracks = tracks.filter(
      (t) =>
        t.genre.includes("Hip-Hop") ||
        t.genre.includes("Pop/Funk") ||
        t.genre.includes("Pop/Electropop") ||
        t.genre.includes("R&B/Pop"),
    );
  } else if (selectedMood === "😴 Slaap") {
    tracks = tracks.filter(
      (t) =>
        t.genre.includes("Pop/Soul") ||
        t.genre.includes("Pop/Folk") ||
        t.genre.includes("Pop/Alternative") ||
        t.genre.includes("Jazz"),
    );
  } else if (selectedMood === "💔 Verdrietig") {
    tracks = tracks.filter(
      (t) => t.genre.includes("Pop/Soul") || t.genre.includes("Pop/R&B"),
    );
  }
  // ==========================
  // TEMPO FILTER
  // ==========================
  if (selectedTempo < 33) {
    tracks = tracks.slice(0, 4);
  } else if (selectedTempo > 66) {
    tracks = tracks.slice(0, 8);
  }

  // ==========================
  // POPULARITY FILTER
  // ==========================
  if (selectedPopularity === "Nieuw") {
    tracks = tracks.filter((t) => Number(t.releaseDate) >= 2016);
  } else if (selectedPopularity === "Trending") {
    tracks = tracks.slice(0, 6);
  } else if (selectedPopularity === "Populair") {
    tracks = tracks.slice(0, 10);
  }

  // ==========================
  // SHUFFLE PLAYLIST
  // ==========================
  tracks = shuffleArray(tracks);

  // ==========================
  // RENDER PLAYLIST
  // ==========================
  renderPlaylist(tracks);
});

// ==============================
// RENDER PLAYLIST FUNCTION
// ==============================
function renderPlaylist(tracks) {
  playlist.innerHTML = "";

  if (tracks.length === 0) {
    playlist.innerHTML = "<p>Geen nummers gevonden 😢</p>";
    return;
  }

  tracks.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("card");

   const previewUrl= "https://samplelib.com/lib/preview/mp3/sample-15s.mp3";
    card.innerHTML = `
      <div class="img">
        <img src="${track.image}" alt="cover" />
        <div class="liked" data-id="${track.id}">&#10084;</div>
      </div>
      <h2>${track.name}</h2>
      <p>${track.artist}</p>
      <button class="play-preview" data-preview="${previewUrl}">
        ▶ Afspeel Preview
      </button>
    `;
    playlist.appendChild(card);
  });

  activatePreviewButtons();
  activateLikeButtons();
}

// ==============================
// PLAY PREVIEW FUNCTION
// ==============================

  
function activatePreviewButtons() {
  const buttons = document.querySelectorAll(".play-preview");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.preview;

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;

        buttons.forEach((b) => (b.textContent = "▶ Afspeel Preview"));


        return;
      }

      currentAudio = new Audio(url);
      currentAudio.play();

      btn.textContent = "⏸ Stop Preview";

      currentAudio.onended = () => {
        btn.textContent = "▶ Afspeel Preview";
        currentAudio = null;
      };
    });
  });
}
// ==============================
// LIKE SYSTEM
// ==============================
function activateLikeButtons() {
  const hearts = document.querySelectorAll(".liked");

  hearts.forEach((heart) => {
    const id = heart.dataset.id;
    let liked = JSON.parse(localStorage.getItem("likedTracks")) || [];

    if (liked.includes(id)) heart.classList.add("active");

    heart.addEventListener("click", () => {
      liked = JSON.parse(localStorage.getItem("likedTracks")) || [];

      if (!liked.includes(id)) {
        liked.push(id);
        heart.classList.add("active");
      } else {
        liked = liked.filter((x) => x !== id);
        heart.classList.remove("active");
      }

      localStorage.setItem("likedTracks", JSON.stringify(liked));
    });
  });
}
async function renderLikedSongs() {
  if (artistsData.length === 0) {
    await loadArtists();
  }

  let liked = JSON.parse(localStorage.getItem("likedTracks")) || [];
  let likedTracks = [];

  artistsData.forEach((artist) => {
    artist.tracks.forEach((track) => {
      if (liked.includes(track.title)) {
        likedTracks.push({
          id: track.title,
          name: track.title,
          artist: artist.artist,
          album: track.album,
          releaseDate: track.releaseDate,
          genre: track.genre,
          image: artist.image,
        });
      }
    });
  });

  renderPlaylist(likedTracks);
}
document.getElementById("open-liked").addEventListener("click", () => {
  renderLikedSongs();
});