const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    /*
      - a global variable called "marketing"
        will be created when the container
        loaded up the marketing JS files
      - webapck can then access the code
        of marketing via the created global
        variable from within the container
    */
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      /* #SUBAPPTS03 */
      exposes: {
        "./MarketingApp": "./src/bootstrap", // TSX file
      },

      /*
        - we are delegating the selection of 
          shared modules to webpack
        - the candidates are from the dependencies
          section in the package.json 
      */
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

/*
  - list devConfig in the second parameter
    allows it to override the commonConig  
*/
module.exports = merge(commonConfig, devConfig);
