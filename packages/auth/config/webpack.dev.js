const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  /*
    why you need to set the public path?
    - if you don't set it, webpack will assume
      the main.js and the current path has the 
      same parent
      - if you are in http://localhost:8082/auth,
        webpack will try to load up the main.js
        from http://localhost:8082/main.js, which
        is correct
      - however, if you are in http://localhost:8082/auth/signin,
        webpack will try to load up the main.js
        from http://localhost:8082/auth/main.js, which
        is wrong

  */
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },

      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
