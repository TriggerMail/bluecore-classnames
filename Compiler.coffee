React = require 'react'
_ = require 'underscore'


defaultElementDelimeter = '_'
defaultModifierDelimeter = '--'


class Compiler
  constructor: (config={}) ->
    @config = _.defaults config,
      elementDelimeter: defaultElementDelimeter
      modifierDelimeter: defaultModifierDelimeter

  setDelimeters: (elementDelimeter, modifierDelimeter) ->
    @config =
      elementDelimeter: elementDelimeter
      modifierDelimeter: modifierDelimeter

  buildClassName: (parentClass, config) ->
    {elementDelimeter, modifierDelimeter} = @config

    {element, modifiers} = config
    newParentClass = parentClass
    modifiersClasses = ''

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

      if className and _.isObject className
        # generate new parentClass to pass it futher and new className
        {parentClass, className} = @buildClassName parentClass, className
        props.className = className

      React.cloneElement child, props,
        React.Children.map child.props.children, (child) =>
          @traverseChild child, parentClass
    else
      child

  traverse: (root) =>
    @traverseChild root, ''


module.exports = new Compiler
