import { getTrendingTracks } from "../fetch";
import express from "express";

export function newSearch() {
  const router = express.Router();
  router.get("/", async (req, res) => {
    const trending = await getTrendingTracks(5);
    res.render("anothersearch", { trending });
  });
  return router;
}
