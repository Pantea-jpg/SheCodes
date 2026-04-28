import express from "express";
import { getFullArtistData } from "../fetch";

export function detailPageRouter() {
  const router = express.Router();

  router.get("/:mbid", async (req, res) => {
    const mbid = req.params.mbid;
    const q: string = typeof req.query.q === "string" ? req.query.q : "";

    if (!mbid) {
      return res
        .status(400)
        .render("404", { message: "Artist ID is required" });
    }

    try {
      const data = await getFullArtistData(mbid);
      res.render("detailPage", { data, q });
    } catch (err) {
      console.error("Detail page error:", err);
      res.status(500).render("404", {
        message: "De artiestengegevens konden niet worden geladen.",
        q,
      });
    }
  });

  return router;
}
