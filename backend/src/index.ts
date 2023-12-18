import "reflect-metadata";

import express from "express";
import datasource from "./lib/datasource";

import adsRouter from "./routes/ads.routes";
import categoriesRouter from "./routes/categories.routes";
import tagsRouter from "./routes/tags.routes";

import cors from "cors";

const port = 4000;
const app = express();

app.use(cors({ origin: ["http://localhost:3000"] })); //permet de spécifier QUI a le droit de contacter le backend
app.use(express.json()); // middleware (modifie les req)

app.get("/", function (req, res) {
  res.send("Hello");
});
app.use("/ads", adsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);

app.listen(port, () => {
  datasource.initialize();
  console.log("lancé sur le port " + port);
});
