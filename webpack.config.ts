import path from 'path';

import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

function withPath(pathToFile: string): string {
  return path.resolve(__dirname, pathToFile);
}

function getEnvParam(param: string): string | undefined {
  return process.env?.[param];
}

module.exports = (): Configuration => {
  const isProd = getEnvParam('NODE_ENV') === 'production';
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'];

  const getPluginsList = () => {
    return [
      new HtmlWebpackPlugin({
        template: withPath('./src/index.html'),
        title: 'HTDev Test',
        minify: isProd,
      }),
      new MiniCssExtractPlugin({
        filename: 'styles-[fullhash].css'
      }),
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        failOnError: true,
      })
    ]
  }


  return {
    mode: isProd ? 'production' : 'development',
    entry: withPath('./src/index.tsx'),
    resolve: {
      extensions,
      plugins: [new TsconfigPathsPlugin({})],
    },
    devtool: !isProd ? 'inline-source-map' : false,
    output: {
      publicPath: '/',
      path: withPath('build'),
      filename: 'bundle-[fullhash].js',
      clean: true,
    },
    plugins: getPluginsList(),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
        },
      ],
    },
    devServer: {
      static: {
        directory: withPath('./build'),
      },
      hot: !isProd,
      port: getEnvParam('PORT') || 3000,
      watchFiles: withPath('./src'),
      compress: isProd,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
  }
};
