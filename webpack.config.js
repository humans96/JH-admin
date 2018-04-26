const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', 'whatwg-fetch', './src/index.js' ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js?[hash]',
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader?url=false'
          }, {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader',
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              js: 'babel-loader'
            }
          }
        }
      }
    ]
  },
  externals: {
    jQuery: '$',
    moment: 'moment',
    loadash: '_',
    window: 'window',
    document: 'document'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, './src/components'),
      api: path.join(__dirname, './src/api'),
      utils: path.join(__dirname, './src/utils'),
      scss: path.join(__dirname, './src/assets/scss'),
      'request$': path.join(__dirname, './src/api/request.js'),
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: [ '.js', '.vue' ],
  },
  devServer: {
    host: '127.0.0.1',
    publicPath:'http://localhost:7110',
    port: 7110,
    historyApiFallback: true,
    noInfo: false,
    disableHostCheck: true,
    proxy: {
      '/images': 'http://localhost:7110/dist',
      '/fonts': 'http://localhost:7110/dist',
      '/JH-api': {
        pathRewrite: {"^/JH-api" : ""},
        target: 'http://127.0.0.1:3010/JH-api/',
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval',
  plugins: [
    new ExtractTextPlugin('style.css?[hash]'),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/assets/images'),
        to: './images'
      },
      {
        from: './index.html',
        to: '.'
      },
      {
        from: path.join(__dirname, './src/assets/fonts'),
        to: './fonts'
      },
      {
        from: './favicon*',
        to: '.'
      }
    ])
  ]

};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#cheap-module-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\"production\"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
};
