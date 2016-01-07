compiler = require './Compiler.coffee'

module.exports = (BaseClass) ->
  class ClassNamesDecorator extends BaseClass
    render: ->
      if @_render
        compiler.traverse @_render()
      else if window.console
        console.error 'Warning: bluecore-classnames requires _render
          method to be defined'
