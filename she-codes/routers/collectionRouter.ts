import express from "express";
import { getDB } from "../database";


export function collectionRouter() {
  const router = express.Router();
router.get("/", (req,res)=>{
  res.render("collection")
})
  router.get("/api/liked", async (req, res) => {
  try {
    const db = getDB();
    const liked = db.collection("liked");

    const likedSongs = await liked.find().toArray();

    res.json(likedSongs);
  } catch (err) {
    res.status(500).json({ error: "Failed to load liked songs" });
  }
});

  return router; 
}
