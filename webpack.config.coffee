path = require 'path'

module.exports =

  entry:
    examples: './index.coffee'

  output:
    path: path.resolve './dist'
    filename: 'index.js'

  module:
    loaders: [
      {test: /\.coffee/, loader: 'coffee'}
    ]
