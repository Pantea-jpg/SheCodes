// fetch("./json/data.json")
//   .then((response) => response.json())
//   .then((data) => {

//     // 1. Artiest uit URL halen
//     const params = new URLSearchParams(window.location.search);
//     const artistName = params.get("artist");

//     // 2. Juiste artiest zoeken in JSON
//     const artistData = data.find(a => a.artist === artistName);

//     if (!artistData) {
//       document.querySelector("main").innerHTML = "<h2>Artiest niet gevonden</h2>";
//       return;
//     }

//     const main = document.querySelector("main");

//     // --- ARTIEST INFO ---
//     const artistSection = document.createElement("section");
//     artistSection.classList.add("artist-info");

//     const artistImageDiv = document.createElement("div");
//     artistImageDiv.classList.add("artist-image");
//     const img = document.createElement("img");
//     img.src = artistData.image;
//     img.alt = artistData.artist;
//     artistImageDiv.appendChild(img);

//     const artistDetails = document.createElement("div");
//     artistDetails.classList.add("artist-details");

//     const artistNameEl = document.createElement("h1");
//     artistNameEl.classList.add("artist-name");
//     artistNameEl.textContent = artistData.artist;

//     const artistBio = document.createElement("p");
//     artistBio.classList.add("artist-bio");
//     artistBio.textContent = artistData.description;

//     const genresDiv = document.createElement("div");
//     genresDiv.classList.add("artist-genres");
//     artistData.genres.forEach((genre) => {
//       const span = document.createElement("span");
//       span.classList.add("genre-tag");
//       span.textContent = genre;
//       genresDiv.appendChild(span);
//     });

//     artistDetails.appendChild(artistNameEl);
//     artistDetails.appendChild(artistBio);
//     artistDetails.appendChild(genresDiv);

//     artistSection.appendChild(artistImageDiv);
//     artistSection.appendChild(artistDetails);

//     main.insertBefore(artistSection, main.querySelector("h1.top-songs-h2"));

//     // --- TOP SONGS ---
//     const topSongsH2 = document.createElement("h1");
//     topSongsH2.classList.add("top-songs-h2");
//     topSongsH2.textContent = "Top Songs";

//     const topSongsSection = document.createElement("section");
//     topSongsSection.classList.add("top-songs");

//     const songsList = document.createElement("div");
//     songsList.classList.add("songs-list");

//     artistData.tracks.forEach((track, index) => {
//       const songItem = document.createElement("div");
//       songItem.classList.add("song-item");

//       const songName = document.createElement("div");
//       songName.classList.add("song-name");
//       songName.textContent = `${index + 1}. ${track.title}`;

//       const album = document.createElement("div");
//       album.classList.add("album");
//       album.textContent = track.album;

//       const year = document.createElement("div");
//       year.classList.add("publication-year");
//       year.textContent = track.releaseDate;

//       const genre = document.createElement("div");
//       genre.classList.add("genre");
//       genre.textContent = track.genre;

//       songItem.appendChild(songName);
//       songItem.appendChild(album);
//       songItem.appendChild(year);
//       songItem.appendChild(genre);

//       songsList.appendChild(songItem);
//     });

//     topSongsSection.appendChild(songsList);
//     main.appendChild(topSongsH2);
//     main.appendChild(topSongsSection);
//   })
//   .catch((err) => console.error(err));

"use strict";

fetch("./json/data.json")
  .then((response) => response.json())
  .then((data) => {
    function getData(index) {
      const artistData = data[index];

      const main = document.querySelector("main");

      const artistSection = document.createElement("section");
      artistSection.classList.add("artist-info");

      const artistImageDiv = document.createElement("div");
      artistImageDiv.classList.add("artist-image");
      const img = document.createElement("img");
      img.src = artistData.image;
      img.alt = artistData.artist;
      artistImageDiv.appendChild(img);

      const artistDetails = document.createElement("div");
      artistDetails.classList.add("artist-details");

      const artistName = document.createElement("h1");
      artistName.classList.add("artist-name");
      artistName.textContent = artistData.artist;

      const artistBio = document.createElement("p");
      artistBio.classList.add("artist-bio");
      artistBio.textContent = artistData.description;

      const genresDiv = document.createElement("div");
      genresDiv.classList.add("artist-genres");
      artistData.genres.forEach((genre) => {
        const span = document.createElement("span");
        span.classList.add("genre-tag");
        span.textContent = genre;
        genresDiv.appendChild(span);
      });

      artistDetails.appendChild(artistName);
      artistDetails.appendChild(artistBio);
      artistDetails.appendChild(genresDiv);

      artistSection.appendChild(artistImageDiv);
      artistSection.appendChild(artistDetails);

      main.insertBefore(artistSection, main.querySelector("h1.top-songs-h2"));

      const topSongsH2 = document.createElement("h1");
      topSongsH2.classList.add("top-songs-h2");
      topSongsH2.textContent = "Top Songs";

      const topSongsSection = document.createElement("section");
      topSongsSection.classList.add("top-songs");

      const songsList = document.createElement("div");
      songsList.classList.add("songs-list");

      artistData.tracks.forEach((track, index) => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");

        const songName = document.createElement("div");
        songName.classList.add("song-name");
        songName.textContent = `${index + 1}. ${track.title}`;

        const album = document.createElement("div");
        album.classList.add("album");
        album.textContent = track.album;

        const year = document.createElement("div");
        year.classList.add("publication-year");
        year.textContent = track.releaseDate;

        const genre = document.createElement("div");
        genre.classList.add("genre");
        genre.textContent = track.genre;

        songItem.appendChild(songName);
        songItem.appendChild(album);
        songItem.appendChild(year);
        songItem.appendChild(genre);

        songsList.appendChild(songItem);
      });

      topSongsSection.appendChild(songsList);
      main.appendChild(topSongsH2);
      main.appendChild(topSongsSection);
    }
    getData(4);
  })
  .catch((err) => console.error("Error loading JSON:", err));
