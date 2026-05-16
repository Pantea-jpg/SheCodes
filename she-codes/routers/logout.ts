import express from "express";
import { login } from "../database";
import session from "../session";

export function logoutRoute() {
  const router = express.Router();
  router.post("/", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  return router;
}
