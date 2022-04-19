// client and server bundle

const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

// node_modules from app.js should not be included in bundle.js. The modules in app.js can be called at runtime
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  // inform that we are building for node
  target: "node",

  // root file of our server
  entry: "./src/app.js",

  // output directory for bundle.js
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },

  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
