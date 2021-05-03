/*
  -
*/

const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        /* 
         - tell webpack how to load images and fonts 
        */
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.scss|\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/ /* mjs or js files only */,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
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
  plugins: [new VueLoaderPlugin()],
};
