// client bundle

const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const config = {
  // root file of our client
  entry: "./src/client/index.js",

  // specify output directory for bundle js
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
};

module.exports = merge(baseConfig, config);
