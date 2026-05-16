import express, { Express } from "express";
import { connect, login } from "./database";
import dotenv from "dotenv";
import path from "path";
import { searchPageRouter } from "./routers/searchRouter";
import { generatorRouter } from "./routers/generatorRouter";
import { collectionRouter } from "./routers/collectionRouter";
import { detailPageRouter } from "./routers/detailPageRouter";
import { logoutRoute } from "./routers/logout";
import { loginPage } from "./routers/login";
import { registerPage } from "./routers/register";
import session from "./session";
import { secureMiddleware } from "./secureMiddleware";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(session);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);
app.use("/search", secureMiddleware, searchPageRouter());
app.use("/generator", secureMiddleware, generatorRouter());
app.use("/collection", secureMiddleware, collectionRouter());
app.use("/detail", secureMiddleware, detailPageRouter());
app.use("/login", loginPage());
app.use("/register", registerPage());
app.use("/logout", logoutRoute());

app.get("/", (req, res) => {
  res.render("landingPage");
});

app.listen(app.get("port"), async () => {
  await connect();
  console.log("Server started on http://localhost:" + app.get("port"));
});
