React = require 'react'

{div} = React.DOM

cx = require '../ClassNames.coffee'


StatelessChildComponent = ->
  div className: 'base-inner',
    div className: 'inner',
      'Inner'


StatelessComponent = (props, children) ->
  div
    className:
      className: 'my-base-class'
      element: 'base',
    div className: 'header',
      'Header'
    div className: 'main',
      div className: cx('first', ['hover', 'active']),
        'First'
      div className: cx('second',
        active: true
        hovered: false
      ),
        children
    div className: 'footer',
      'Footer'


module.exports.StatelessComponent = StatelessComponent
module.exports.StatelessChildComponent = StatelessChildComponent
