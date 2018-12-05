const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: { 
    main: "./src/index.js"
  },
  plugins: 
  [
    new DashboardPlugin({ port: 8080 }),
  ]
}