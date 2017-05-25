const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  node: {
    //in order to make webpack disable __dirname/__filename injection
    __dirname: false,
    __filename: false
  },
  entry: "./src/server",
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/", //required for the ignore-file plugin to correctly construct filenames
    filename: "server.js"
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      client: path.join(__dirname, "../src/client"),
      server: path.join(__dirname, "../src/server")
    },
    extensions: [".js", ".json", ".scss"]
  },
  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          babelrc: false,
          plugins: [
            //for es2015 preset on node6 only those are required
            "transform-es2015-function-name",
            "transform-es2015-shorthand-properties",

            //object rest spread plugins
            //https://babeljs.io/docs/plugins/transform-object-rest-spread/
            "transform-es2015-destructuring",
            "transform-object-rest-spread",
            "syntax-object-rest-spread"
          ]
        }
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "images/[name].[ext]?[hash]",
          emitFile: false
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "fonts/[name].[ext]?[hash]",
          emitFile: false
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: "file-loader",
        options: {
          emitFile: false
        }
      }
    ]
  }
};
