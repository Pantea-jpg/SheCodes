
import express from "express";
import { searchArtists, searchTracks } from "../fetch";
import { getTrendingArtists,getTrendingTracks } from "../fetch";

export function searchPageRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const query = req.query.q as string;

    // trending
    
if (!query) {
  try {
    const artists = await getTrendingArtists(5);
    const tracks = await getTrendingTracks(5);

    return res.render("searchPage", {
      artists,
      tracks,
      query: null,
    });
  } catch (err) {
    console.error("Trending error:", err);
    return res.render("searchPage", {
      artists: [],
      tracks: [],
      query: null,
    });
  }
}
    // zoekterm 
    try {
      const artists = await searchArtists(query);
      const tracks = await searchTracks(query);
console.log(tracks)

      res.render("searchPage", {
        artists,
        tracks,
        query,
      });
      
    } catch (err) {
      console.error("Search error:", err);
      res.render("searchPage", {
        artists: [],
        tracks: [],
        query,
      });
    }
    
  });
  return router;
}
