import express from "express";
import { searchArtists, searchTracks } from "../fetch";

export function searchPageRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const query = req.query.q as string;
  

    if (!query) {
      return res.render("searchPage", {
        artists: [],
        tracks: [],
      
      });
    }

    try {
      const artists = await searchArtists(query);
      const tracks = await searchTracks(query);

      res.render("searchPage", {
        artists,
        tracks,
      
      });
    } catch (err) {
      console.error(err);
      res.render("searchPage", {
        artists: [],
        tracks: [],
      });
    }
  });

  return router;
}