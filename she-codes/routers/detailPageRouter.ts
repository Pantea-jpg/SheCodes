import express from "express";
import { getFullArtistData } from "../fetch";

export function detailPageRouter() {
  const router = express.Router();

  router.get("/:mbid", async (req, res) => {
    const mbid = req.params.mbid;

    if (!mbid) {
      return res.status(400).render("error", { message: "Artist ID is required" });
    }

    try {
      const data = await getFullArtistData(mbid);
      res.render("detailPage", { data });
    } catch (err) {
      console.error("Detail page error:", err);
      res.status(500).render("error", { message: "Could not load artist data" });
    }
  });

  return router;
}