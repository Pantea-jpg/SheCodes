import express from "express";
import { login } from "../database";
import session from "../session";

export function loginPage() {
  const router = express.Router();
  router.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("/search");
    }
    let message = req.session.message ?? { success: true, text: "" };
    delete req.session.message;
    res.render("login", { message });
  });
  router.post("/", async (req, res) => {
    if (req.session.user) {
      return res.redirect("/search");
    }
    let username = req.body.username;
    let password = req.body.password;
    try {
      const user = await login(username, password);
      if (user) {
        req.session.user = user;
        return res.redirect("/search");
      }
    } catch (error: any) {
      req.session.message = { success: false, text: error.message };
      res.redirect("/login");
    }
  });
  return router;
}
