import express from "express";

export function registerPage() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.render("register");
  });
  return router;
}
