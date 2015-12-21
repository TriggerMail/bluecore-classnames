path = require 'path'

module.exports =

  entry:
    examples: './index.coffee'

  output:
    path: path.resolve './dist'
    filename: 'index.js'
    libraryTarget: 'commonjs2'

  externals:
    'react': 'react'

  module:
    loaders: [
      {test: /\.coffee/, loader: 'coffee'}
    ]
