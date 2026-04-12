// import express from "express";
// import { FullArtistData } from "../interfaces/interface";
// import { getFullArtistData } from "../fetch";

// export function searchPageRouter() {
//   const router = express.Router();

//   router.get("/", async (req, res) => {
//     const query = req.query.q;

//     if (!query || typeof query !== "string") {
//       return res.render("searchPage", { data: null, query: null });
//     }

//     try {
//       const data: FullArtistData = await getFullArtistData(query);
//       res.render("searchPage", { data,query });
//     } catch (err) {
//       console.error(err);
//       res.render("searchPage", { data: null, query });
//     }
//   });

//   return router;
// }
import express from "express";
import { getFullArtistData } from "../fetch";

export function searchPageRouter() {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const query = req.query.q as string;

    if (!query) {
      const trendingArtists = [
        await getFullArtistData("Drake")
      ];

      return res.render("searchPage", {
        trending: trendingArtists,
        data: null,
      });
    }

    const data = await getFullArtistData(query);

    res.render("searchPage", {
      trending: null,
      data,
    });
  });

  return router;
}
