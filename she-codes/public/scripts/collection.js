async function toonMijnCollectie() {
  const res = await fetch("/collection/api/liked");
  const likedSongs = await res.json();

  const container = document.getElementById("collection-container");
  container.innerHTML = "";

  if (!likedSongs.length) {
    container.innerHTML = "<p>Geen favorieten 😢</p>";
    return;
  }

  likedSongs.forEach((track) => {
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

document.addEventListener("DOMContentLoaded", toonMijnCollectie);

