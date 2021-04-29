/*
  - configuation shared both by dev and prod
  - - - -
*/

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/ /* mjs or js files only */,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            /*
              - @babel/preset-react
                - take care of JSX tags
              - @babel/preset-env
                - coverts everything down to ES5
            */
            presets: ["@babel/preset-react", "@babel/preset-env"],
            /*
              - @babel/plugin-transform-runtime
                - supprt await/async in the browser
            */
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
