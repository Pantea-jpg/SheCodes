import express from "express";
import { searchArtists, searchTracks } from "../fetch";
import { getTrendingArtists, getTrendingTracks } from "../fetch";

export function searchPageRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const q: string = typeof req.query.q === "string" ? req.query.q : "";

    // TRENDING
    if (!q) {
      try {
        const artists = await getTrendingArtists(5);
        const tracks = await getTrendingTracks(5);

        return res.render("searchPage", {
          artists,
          tracks,
          q: null,
        });
      } catch (er) {
        return res.status(404).render("404", {
          artists: [],
          tracks: [],
          q: null,
        });
      }
    }

    // ZOEKRESULTATEN
    try {
      const artists = await searchArtists(q);
      const tracks = await searchTracks(q);

      //  previewUrl
      const tracksMetPreview = tracks.filter((t) => t.previewUrl);

      const mixedResults = [
        ...artists.map((a) => ({ type: "artist", data: a })),
        ...tracksMetPreview.map((t) => ({ type: "track", data: t })),
      ];

      mixedResults.sort(() => Math.random() - 0.5);
      
      res.render("searchPage", {
        results: mixedResults,
        artists,
        tracks: tracksMetPreview,
        q,
      });
    } catch (er) {
      console.error("SEARCH ERROR", er);
      return res.render("searchPage", {
        results: [],
        artists: [],
        tracks: [],
        q: "",
      });
      // }
      // ZOEKRESULTATEN Exact match filtering
      // try {
      //   const artists = await searchArtists(q);
      //   const tracks = await searchTracks(q);

      //   const tracksMetPreview = tracks.filter((t) => t.previewUrl);

      //   // Exact match filtering
      //   const exactArtists = artists.filter(
      //     (a) => a.name.toLowerCase() === q.toLowerCase(),
      //   );

      //   const exactTracks = tracksMetPreview.filter(
      //     (t) => t.name.toLowerCase() === q.toLowerCase(),
      //   );

      //   // Use exact matches if available
      //   const finalArtists = exactArtists.length ? exactArtists : artists;
      //   const finalTracks = exactTracks.length ? exactTracks : tracksMetPreview;

      //   const mixedResults = [
      //     ...finalArtists.map((a) => ({ type: "artist", data: a })),
      //     ...finalTracks.map((t) => ({ type: "track", data: t })),
      //   ];

      //   mixedResults.sort(() => Math.random() - 0.5);

      //   res.render("searchPage", {
      //     results: mixedResults,
      //     artists: finalArtists,
      //     tracks: finalTracks,
      //     q,
      //   });
      // } catch (er) {
      //   console.error("SEARCH ERROR", er);
      //   return res.render("searchPage", {
      //     results: [],
      //     artists: [],
      //     tracks: [],
      //     q: "",
      //   });
    }
  });

  return router;
}
