const path = require("path");

module.exports = {
  // tell webpack to run babel through every file

  module: {
    rules: [
      {
        test: /\.js?$/, // select every file with extension .js
        loader: "babel-loader",
        exclude: path.join(__dirname, "./node_modules"),
        options: {
          presets: [
            "@babel/preset-react",
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 2 versions"],
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
