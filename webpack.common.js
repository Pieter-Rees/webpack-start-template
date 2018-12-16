const DashboardPlugin = require("webpack-dashboard/plugin");

var config = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "[name].[contenthash].js"
  },
  module: {},
  plugins: [new DashboardPlugin({ port: 8080 })]
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    //...
  }

  return config;
};

