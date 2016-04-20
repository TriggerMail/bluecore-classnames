React = require 'react'
_ = require 'underscore'

defaultConfig =
  elementDelimeter: '_'
  modifierDelimeter: '--'
  isStrict: true


class Compiler
  constructor: (config={}) ->
    @config = _.defaults(config, defaultConfig)

  setDelimeters: (elementDelimeter, modifierDelimeter) ->
    @config =
      elementDelimeter: elementDelimeter
      modifierDelimeter: modifierDelimeter

  buildClassName: (parentClass, config) ->
    {elementDelimeter, modifierDelimeter} = @config

    element = null
    modifiers = null
    newParentClass = parentClass
    modifiersClasses = ''

    if _.isString config
      if @config.isStrict
        # pass if strict mode is enabled
        return {
          parentClass: newParentClass
          className: config
        }
      else
        element = config
    else
      {element, modifiers} = config

    if element
      if newParentClass
        newParentClass += "#{elementDelimeter}#{element}"
      else
        newParentClass = element

    if modifiers
      modifiersClasses = _(modifiers)
        .chain()
        .map (isEnabled, modifier) ->
          if isEnabled
            "#{newParentClass}#{modifierDelimeter}#{modifier}"
        .compact()
        .value()
        .join(' ')

    parentClass: newParentClass
    className: _.compact([config.className, newParentClass, modifiersClasses])
      .join ' '

  traverseChild: (child, parentClass) ->
    if React.isValidElement child
      {className} = child.props
      props = {}

      if className
        # generate new parentClass to pass it futher and new className
        {parentClass, className} = @buildClassName parentClass, className
        props.className = className

      React.cloneElement child, props,
        if Array.isArray child.props.children
          React.Children.map child.props.children, (child) =>
            @traverseChild child, parentClass
        else
          @traverseChild child.props.children, parentClass
    else
      child

  traverse: (root) =>
    @traverseChild root, ''

  setStrict: (isStrict) ->
    @config.isStrict = isStrict


module.exports = Compiler
module.exports.setDefaults = (config) ->
  _.extend(defaultConfig, config)
