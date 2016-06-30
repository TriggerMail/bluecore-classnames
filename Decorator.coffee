Compiler = require './Compiler.coffee'
_ = require 'underscore'
{Component} = require 'react'

getDisplayName = (WrappedComponent) ->
  WrappedComponent.displayName or WrappedComponent.name or 'Component'

module.exports = (config) ->
  decorator = (WrappedComponent) ->
    isStateless = not WrappedComponent::render and not WrappedComponent::_render

    if isStateless
      class StatelessWrapper extends Component
        render: ->
          compiler.traverse(WrappedComponent(@props, @props.children))

      return _.extend(StatelessWrapper, WrappedComponent)
    else
      class Wrapper extends WrappedComponent
        @displayName = "ClassNames(#{getDisplayName(WrappedComponent)})"

        render: ->
          if WrappedComponent::render
            compiler.traverse(super())
          else if @_render
            compiler.traverse(@_render())
          else
            compiler.traverse(WrappedComponent(@props, @props.children))

      return Wrapper

  if typeof config is 'function'
    compiler = new Compiler()
    return decorator(config)
  else
    compiler = new Compiler(config)
    return decorator
