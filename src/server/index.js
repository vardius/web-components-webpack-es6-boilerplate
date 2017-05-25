import express from "express";
import fspath from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
import { createServerRenderer } from "./render";

const htmlTemplate = fs.readFileSync(
  fspath.join(__dirname, "index.html"),
  "utf-8"
);
const serverRenderer = createServerRenderer(htmlTemplate);

const serverRenderMiddleware = (req, res, next) => {
  serverRenderer(req.url).then(
    ({ html }) => {
      res.send(html);
    },
    err => {
      next(err);
    }
  );
};

const app = express();

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(404);
});

app.use("/css", express.static(fspath.join(__dirname, "css")));
app.use("/fonts", express.static(fspath.join(__dirname, "fonts")));
app.use("/images", express.static(fspath.join(__dirname, "images")));
app.use("/js", express.static(fspath.join(__dirname, "js")));

app.use(cookieParser());
app.get("*", serverRenderMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${port}`);
});
