import express from "express";
import { register } from "../database";
import { User } from "../interfaces/interface";

export function registerPage() {
  const router = express.Router();
  router.get("/", async (req, res) => {
    if (req.session.user) {
      return res.redirect("/search");
    }
    res.render("register", { error: "" });
  });
  router.post("/", async (req, res) => {
    if (req.session.user) {
      return res.redirect("/search");
    }
    try {
      const { fname, lname, email, password } = req.body;

      const user: User = {
        fname,
        lname,
        email,
        password,
      };

      await register(user);
      return res.redirect("/search");
    } catch (e: any) {
      console.error(e.message);
      return res.status(400).render("register", {
        error: e.message,
      });
    }
  });
  return router;
}
