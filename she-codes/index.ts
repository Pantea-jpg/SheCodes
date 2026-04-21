import express, { Express } from "express";
import { connect } from "./database";
import dotenv from "dotenv";
import path from "path";
import { searchPageRouter } from "./routers/searchRouter";
import { generatorRouter } from "./routers/generatorRouter";
import { collectionRouter } from "./routers/collectionRouter";
import { detailPageRouter } from "./routers/detailPageRouter";
import { newSearch } from "./routers/newsearch";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);
app.use("/search", searchPageRouter());
app.use("/generator", generatorRouter());
app.use("/collection", collectionRouter());
app.use("/detail", detailPageRouter());
//trial
app.use("/newsearch", newSearch());
//trial
app.get("/", (req, res) => {
  res.render("landingPage");
});

app.listen(app.get("port"), async() => {
  await connect();
  console.log("Server started on http://localhost:" + app.get("port"));
});
