async function toonMijnCollectie() {
    const response = await fetch("./json/data.json");
    const artists = await response.json();
    const likedSongs = JSON.parse(localStorage.getItem("likedTracks")) || [];
    const container = document.getElementById("collection-container");
    
    container.innerHTML = ""; 

    if (likedSongs.length === 0) {
        container.innerHTML = "<p>Je hebt nog geen favorieten uit de generator toegevoegd.</p>";
        return;
    }

    artists.forEach(artist => {
        artist.tracks.forEach(track => {
            if (likedSongs.includes(track.title)) {
                container.innerHTML += `
                    <article>
                        <figure><img src="${artist.image}" alt="cover" /></figure>
                        <div>
                            <h2>${track.title}</h2>
                            <p>${artist.artist}</p>
                            <p>${track.releaseDate}</p>
                            <p>${track.genre}</p>
                            <div><button type="button">❤️</button></div>
                        </div>
                    </article>`;
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", toonMijnCollectie);