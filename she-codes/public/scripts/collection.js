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
    const card = document.createElement("article");

    card.innerHTML = `
      <div class="card">
        <img src="${track.image}" alt="cover" />

        <div class="info">
          <h2>${track.name}</h2>
          <p>${track.artist}</p>
        </div>

        <button class="heart">❤️</button>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", toonMijnCollectie);
