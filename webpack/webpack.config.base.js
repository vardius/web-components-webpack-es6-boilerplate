// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const e2c = require("electron-to-chromium");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const postcssLoaderOptions = {
  plugins: [
    autoprefixer({
      browsers: e2c.electronToBrowserList("1.4")
    })
  ]
};

module.exports = {
  output: {
    filename: "js/[name].[chunkhash].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      client: path.join(__dirname, "../src/client"),
      server: path.join(__dirname, "../src/server")
    },
    extensions: [".js", ".json", ".scss"]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch", // fetch API
      $: "jquery",
      jQuery: "jquery"
    }),
    // Shared code
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/[name].[hash].js",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/client/index.html",
      inject: false
    }),
    new ExtractTextPlugin({
      filename: "css/[name].[contenthash].css"
    })
  ],
  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "../src"),
        use: "babel-loader"
      },
      //HTML
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, "../src/client/js")],
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name].[ext]?[hash]"
          }
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "fonts/[name].[ext]?[hash]"
          }
        }
      },
      // Application-wide styles
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "../src/client/assets/styles")],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: postcssLoaderOptions
            },
            {
              loader: "sass-loader",
              options: {
                outputStyle: "compressed"
              }
            }
          ]
        })
      },
      // Component-scoped styles
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "../src/client/js")],
        use: [
          {
            loader: "raw-loader"
          },
          {
            loader: "postcss-loader",
            options: postcssLoaderOptions
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "compressed"
            }
          }
        ]
      }
    ]
  }
};
