{Component} = require 'react'
Compiler = require './Compiler.coffee'


module.exports = (config) ->
  decorator = (func) ->
    class ClassNames extends Component
      @displayName = "ClassNames(#{func.name or 'StatelessComponent'})"

      render: ->
        compiler.traverse(func(@props, @props.children))

    if func.propTypes
      ClassNames.propTypes = func.propTypes

    if func.defaultProps
      ClassNames.defaultProps = func.defaultProps

    return ClassNames

  if typeof config is 'function'
    compiler = new Compiler()
    return decorator(config)
  else
    compiler = new Compiler(config)
    return decorator
