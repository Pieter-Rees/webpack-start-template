const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
      new DashboardPlugin({ port: 8080 }),
      new HtmlWebpackPlugin()
    ]
};
