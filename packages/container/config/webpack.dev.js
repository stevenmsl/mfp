const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      /*
        - remotes contains key-value pairs
        - the key (marketing) is used in the import statements
        - the prefix of the value (marketing) needs to match
          the name property of the ModuleFederationPlugin
          configured in the project (marketing) 
          the container is loading up 
      */

      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

/*
  - list devConfig in the second parameter
    allows it to override the commonConig  
*/
module.exports = merge(commonConfig, devConfig);
