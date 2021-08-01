const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    fallback: { 
      fs: false,
      path: require.resolve("path-browserify")
     }
  }
});