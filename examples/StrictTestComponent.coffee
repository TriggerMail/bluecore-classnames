React = require 'react'
{Component} = React

{div} = React.DOM

ClassNamesDecorator = require '../Decorator.coffee'
cx = require '../ClassNames.coffee'


class ChildStrictTestComponent extends ClassNamesDecorator Component
  _render: ->
    div className: cx('base-inner'),
      div className: cx('inner'),
        'Inner'

ChildStrictTestComponent = React.createFactory ChildStrictTestComponent


class StrictTestComponent extends ClassNamesDecorator Component
  _render: ->
    div
      className:
        className: 'my-base-class'
        element: 'base',
      div className: cx('header'),
        'Header'
      div className: cx('main'),
        div className: cx('first', ['hover', 'active']),
          'First'
        div className: cx('second',
          active: true
          hovered: false
        ),
          ChildStrictTestComponent {}
      div className: cx('footer'),
        'Footer'


module.exports = React.createFactory StrictTestComponent
