import { join, resolve as _resolve } from "path";
// const webpack = require('webpack');
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const port = process.env.PORT || 3000;
export const mode = "development";
export const devtool = "inline-source-map";
export const entry = join(__dirname, "src", "index.tsx");
export const output = {
  path: _resolve(__dirname, "dist"),
  publicPath: "/",
};
export const resolve = {
  alias: {
    "react-dom": "@hot-loader/react-dom",
  },
  extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
};
export const module = {
  rules: [
    {
      test: /\.?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    },
    // {
    //     test: /\.css$/i,
    //     use: ["style-loader", "css-loader"],
    // },
    // {
    //     test: /\.css$/,
    //     use: [
    //     {
    //         loader: 'style-loader'
    //     },
    //     {
    //         loader: 'css-loader',
    //         options: {
    //             modules: true,
    //             localsConvention: 'camelCase',
    //             sourceMap: true
    //         }
    //     }
    //     ]
    // },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
      ],
    },
    // {
    //     test: /\.(png|jp(e*)g|svg|gif)$/,
    //     use: ['file-loader'],
    // },
    // {
    //     test: /\.(png|jpe?g|gif)$/i,
    //     use: [
    //       {
    //         loader: 'file-loader',
    //       },
    //     ],
    //   },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    },
    {
      test: /\.txt$/,
      use: "raw-loader",
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: "ts-loader",
    },
    {
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
    },
  ],
};
export const plugins = [
  new MiniCssExtractPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: join(__dirname, "public", "index.html"),
  }),
];
export const devServer = {
  host: "localhost",
  port,
  historyApiFallback: true,
  open: true,
  hot: true,
};
