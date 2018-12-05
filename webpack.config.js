const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.*css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|jepg|png|svg|webp)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
            outputPath: 'img/',
            context: 'src/img'
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/index.html'
    }),
    new DashboardPlugin({ port: 8080 }) 
  ]
};
