const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|jepg|png|svg|webp)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
            outputPath: "img/",
            context: "src/img"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html"
    })
  ]
};
