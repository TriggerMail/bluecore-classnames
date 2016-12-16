React = require 'react'
{Component} = React

{div} = React.DOM

cx = require '../ClassNames.coffee'


class ChildStrictTestComponent extends Component
  render: ->
    div className: cx('base-inner'),
      div className: cx('inner'),
        'Inner'


class StrictTestComponent extends Component
  render: ->
    div
      className:
        className: 'my-base-class'
        element: 'base'
        _qaClassName: 'test-base',
      div className: cx('header'),
        'Header'
      div className: cx('main'),
        div className: cx('first', ['hover', 'active'], 'test-first'),
          'First'
        div className: cx('second',
          active: true
          hovered: false,
          'test-second'
        ),
          @props.children
      div className: cx('footer'),
        'Footer'


module.exports.StrictTestComponent = StrictTestComponent
module.exports.ChildStrictTestComponent = ChildStrictTestComponent
