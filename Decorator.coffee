Compiler = require './Compiler.coffee'

getDisplayName = (WrappedComponent) ->
  WrappedComponent.displayName or WrappedComponent.name or 'Component'

module.exports = (config) ->
  decorator = (WrappedComponent) ->
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

    return ClassNames

  if typeof config is 'function'
    compiler = new Compiler()
    return decorator(config)
  else
    compiler = new Compiler(config)
    return decorator
