const path = require('path');

module.exports = {
  entry: {
    examples: './index.js'
  },

  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    react: 'react'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {cacheDirectory: true}
        }
      }
    ]
  },
  mode: 'production'
};
