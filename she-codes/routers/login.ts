import express from "express";
import { login } from "../database";

export function loginPage() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.render("login");
  });
  router.post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
      await login(username, password);
      res.redirect("/search");
    } catch (error: any) {
      res.status(401).render("login", {
        error: error.message,
      });
    }
  });
  return router;
}
