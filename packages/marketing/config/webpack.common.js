/*
  - -
*/
module.exports = {
  /*  #SUBAPPTS01 
    - this is important so webpack knows 
      which types of files it needs to
      to resolve for the import statements
  */
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            /*
              - @babel/preset-react
                - take care of JSX tags
              - @babel/preset-env
                - coverts everything down to ES5
              - @babel/preset-typescript #SUBAPPTS02
                - take care of typescript 
            */
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
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
};
