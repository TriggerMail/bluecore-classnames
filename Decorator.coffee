compiler = require './Compiler.coffee'

module.exports = (BaseClass) ->
  class ClassNamesDecorator extends BaseClass
    render: ->
      compiler.traverse @_render()
