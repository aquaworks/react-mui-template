const path = require('path')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')

const _resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const hot = env && env.WEBPACK_SERVE && argv.hot !== false

  const cssUse = (modules) => [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules,
      },
    },
    'postcss-loader',
  ]

  const config = {
    devServer: {
      historyApiFallback: true,
      hot: hot ? 'only' : false,
      liveReload: false,
      port: 3000,
      static: {
        directory: _resolve('build'),
      },
    },
    devtool: !isProduction ? 'inline-source-map' : false,

    entry: {
      main: _resolve('./src'),
    },

    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: !isProduction,
              plugins: [hot && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              use: cssUse({
                localIdentName: isProduction ? '[hash:base64]' : '[path][name]__[local]',
                mode: 'local',
              }),
            },
          ],
        },
      ],
    },

    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: _resolve('build'),
      publicPath: isProduction ? '/react-mui-template-deploy/' : '/',
    },

    plugins: [
      hot && new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new WebpackManifestPlugin({
        writeToFileEmit: true,
      }),
      new Dotenv(),
      new HtmlWebpackPlugin({
        chunks: ['main'],
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: false,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        template: 'src/index.html',
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@src': _resolve('src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }

  return config
}
