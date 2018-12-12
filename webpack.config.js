const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  module: {},
  plugins: [
    new DashboardPlugin({ port: 8080 })
  ]
};
