React = require 'react'
{Component} = React

{div} = React.DOM

ClassNamesDecorator = require '../Decorator.coffee'
cx = require '../ClassNames.coffee'


class ChildTestComponent extends ClassNamesDecorator Component
  _render: ->
    div className: 'base-inner',
      div className: 'inner',
        'Inner'

ChildTestComponent = React.createFactory ChildTestComponent


class TestComponent extends Component
  render: ->
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
          ChildTestComponent {}
      div className: 'footer',
        'Footer'


module.exports = React.createFactory(ClassNamesDecorator(TestComponent))
