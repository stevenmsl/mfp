const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

/*
  - the value is defined in the Github Secrets
  - you then need to provide it to the npm build
    in the container.yml
*/
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    /*
      - use contenthash to deal with caching issue
    */
    filename: "[name].[contenthash].js",
    /*
      - this will be appended the path of the location
        of the main.js in the index.html script tag
      - example
        - script src="/container/latest/main.016d89a48d1b3d244add.js" 
    */
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@/marketing/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
