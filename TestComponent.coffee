React = require 'react'
{Component} = React

{div} = React.DOM

ClassNamesDecorator = require './Decorator.coffee'
cx = require './ClassNames.coffee'


class ChildTestComponent extends ClassNamesDecorator Component
  _render: ->
    div className: cx('base-inner'),
      div className: cx('inner'),
        'Inner'

ChildTestComponent = React.createFactory ChildTestComponent


class TestComponent extends ClassNamesDecorator Component
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
          ChildTestComponent {}
      div className: cx('footer'),
        'Footer'


module.exports = React.createFactory TestComponent
