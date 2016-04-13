compiler = require './Compiler.coffee'

getDisplayName = (WrappedComponent) ->
  WrappedComponent.displayName or WrappedComponent.name or 'Component'

module.exports = (WrappedComponent) ->
  class ClassNames extends WrappedComponent
    @displayName = "ClassNames(#{getDisplayName(WrappedComponent)})"

    render: ->
      if WrappedComponent::render
        compiler.traverse(super())
      else if @_render
        compiler.traverse @_render()
      else if window.error
        console.error 'Warning: bluecore-classnames requires _render
          method to be defined'
