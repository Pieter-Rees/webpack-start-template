const DashboardPlugin = require("webpack-dashboard/plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "[name].[contenthash].js"
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin("dist", {}),    
    new DashboardPlugin({ port: 8080 })]
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

