React = require 'react'
{Component} = React

{div} = React.DOM

cx = require '../ClassNames.coffee'


class ChildQaClassesComponent extends Component
  render: ->
    div className: 'base-inner',
      div className: 'inner',
        'Inner'


class QaClassesComponent extends Component
  render: ->
    div
      className:
        className: 'my-base-class'
        element: 'base'
        _qaClassName: 'test-base',
      div className: 'header',
        'Header'
      div className: 'main',
        div className: cx('first', ['hover', 'active'], 'test-first'),
          'First'
        div className: cx('second',
          active: true
          hovered: false,
          'test-second'
        ),
          @props.children
      div className: 'footer',
        'Footer'


module.exports.QaClassesComponent = QaClassesComponent
module.exports.ChildQaClassesComponent = ChildQaClassesComponent
