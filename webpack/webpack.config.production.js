const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = merge(config, {
  devtool: "nosources-source-map",
  entry: {
    application: ["babel-polyfill", "client/js/index"],
    vendor: [
      "bootstrap",
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter",
      "@webcomponents/webcomponentsjs/webcomponents-loader",
      "web-component"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/client/assets/images"),
        to: "images"
      }
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourceMap: false
    // })
  ],
  module: {
    noParse: /\.min\.js$/
  }
});
