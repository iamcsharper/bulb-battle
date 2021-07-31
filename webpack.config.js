const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  target: "web",
  devServer: {
    contentBase: './dist',
    // open: true
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav|mp4)$/i,
        use: ['file-loader'],
      },
      {
        test:/\.(s*)css$/,
        use: [
          miniCss.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        exclude: [
          path.resolve(__dirname, "node_modules/excalibur")
        ],
        enforce: "pre",
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output",
      template: path.join(__dirname, './src/index.html'),
      inject: false,
    }),
    new miniCss({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
  ],
};