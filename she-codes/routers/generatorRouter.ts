import express from "express";
import { getDB } from "../database";
import { searchTracks } from "../fetch";

export function generatorRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.render("generator");
  });

  // Playlist genereren via API
  router.post("/api/generate-playlist", async (req, res) => {
    try {
      const { mood, genre, duration, tempo, popularity } = req.body;

      //  Zoek op basis van genre + mood
      const query = `${mood} ${genre}`.trim();
      let tracks = await searchTracks(query);

      //  Filter: preview only
      tracks = tracks.filter((t) => t.previewUrl);

      //  Populariteit
      if (popularity === "Trending") {
        tracks = tracks.slice(0, 6);
      } else if (popularity === "Nieuw") {
        tracks = tracks.slice(0, 8);
      } else if (popularity === "Populair") {
        tracks = tracks.slice(0, 12);
      }

      //  Tempo
      if (tempo < 33) tracks = tracks.slice(0, 4);
      else if (tempo > 66) tracks = tracks.slice(0, 10);

      //  Shuffle
      tracks = tracks.sort(() => Math.random() - 0.5);

      res.json({ playlist: tracks });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Playlist genereren mislukt" });
    }
  });

  //liked
  router.post("/api/likes", async (req, res) => {
    try {
      const track = req.body;
      const db = getDB();
      const liked = db.collection("liked");

      const exists = await liked.findOne({ id: track.id });

      if (exists) {
        await liked.deleteOne({ id: track.id });
        return res.json({ liked: false });
      }

      await liked.insertOne(track);
      res.json({ liked: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Like opslaan mislukt" });
    }
  });

  return router;
}

//liked
// router.post("/api/likes", async (req, res) => {
//   const track = req.body;

//   // check if exists
//   const exists = await Likes.findOne({ id: track.id });

//   if (exists) {
//     await Likes.deleteOne({ id: track.id });
//     return res.json({ liked: false });
//   }

//   await Likes.create(track);
//   res.json({ liked: true });
// });
