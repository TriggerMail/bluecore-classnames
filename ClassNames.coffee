_ = require 'underscore'

toModifiers = (modifiersList) ->
  modifiers = {}
  _.each modifiersList, (modifier) ->
    modifiers[modifier] = true
  modifiers

module.exports = (element, modifiers) ->
  element: element
  modifiers:
    if _.isArray modifiers
      toModifiers modifiers
    else
      modifiers
