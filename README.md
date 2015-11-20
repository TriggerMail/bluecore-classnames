# bluecore-classnames

Automatic class builder for React

### Example

```coffee
React = require 'react'
{div} = React.DOM
{cx, ClassNames} = require 'bluecore-classnames/index.coffee'

class MyComponent extends ClassNames React.Component
  constructor: (props) ->
    super props
    @state = hovered: true
    
  _render: ->
    div className: cx('base'),
      div className: cx('inner'),
        div className: cx('first', ['active'])
        div className: cx('second', hovered: @state.hovered)
  
module.exports = MyComponent

```

Will be transformed into

```coffee
div className: 'base',
  div className: 'base_inner',
    div className: 'base_inner_first base_inner_first--active'
    div className: 'base_inner_second base_inner_second--hovered'
```

### How to use

`ClassNames` decorator accept className in format
```
className: ?<String>, additional className
element: <String>, name of your element
modifiers: ?<[String] || {}>, where object key is modifier name
```

Also you can set delimeters:

```coffee
Compiler = require 'bluecore-classnames/Compiler.coffee'
Compiler.setDelimeters '__', '_'
```
