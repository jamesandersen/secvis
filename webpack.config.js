// @AngularClass

var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var metadata = {
  title: 'SEC VIS',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = helpers.defaults({
  // static data for index.html
  metadata: metadata,
  debug: true,
  devtool: 'eval-source-map', // for faster builds use 'eval'

  // our angular app
  entry: { 
     'polyfills': ['./src/polyfills.ts', hotMiddlewareScript ],
     'main': ['./src/main.ts', hotMiddlewareScript]
  },

  // Config for our build files
  output: {
    path: helpers.root('dist/'),
    publicPath: "/"
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs') ] }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      
      // This is for global styles
      { test: /shared\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      
      { test: /\.png$/,  loader: "file-loader?name=assets/img/[name].[ext]?[hash]" },
      
      { test: /\.less$/,  loader: "raw!less", exclude: [ helpers.root('src/app/shared.less')] }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
    
    new ExtractTextPlugin("[name].css"),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    })
  ],

  // Other module loader config

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host, 
    historyApiFallback: {
      index: '/secvis/' // serve index.html from /mathfacts/
    }
  }
});
