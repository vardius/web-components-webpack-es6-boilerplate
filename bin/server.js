// Creates a hot reloading development environment

const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const DashboardPlugin = require("webpack-dashboard/plugin");
const config = require("./../webpack/webpack.config.development");

const app = express();
const compiler = webpack(config);

// Apply CLI dashboard for your webpack dev server
compiler.apply(new DashboardPlugin());

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

function log() {
  arguments[0] = "\nWebpack: " + arguments[0];
  console.log.apply(console, arguments);
}

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  historyApiFallback: true
});

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res, next) => {
  req.url = "/index.html";
  devMiddleware(req, res, next);
});

app.listen(port, host, err => {
  if (err) {
    log(err);
    return;
  }

  log("🚧  App is listening at http://%s:%s", host, port);
});
