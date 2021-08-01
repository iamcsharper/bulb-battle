const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  target: "web",
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
          path.resolve(__dirname, "node_modules/sim-ecs")
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
    fallback: { 
      fs: false,
      path: require.resolve("path-browserify")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Output",
      template: path.join(__dirname, './src/index.html'),
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/box2d-wasm/dist/es/Box2D.js',
          to: './Box2D.js'
        },
        {
          from: './node_modules/box2d-wasm/dist/es/Box2D.wasm',
          to: './Box2D.wasm'
        },
      ]
    }),
    new miniCss({
      filename: 'style.css',
    }),
  ],
};