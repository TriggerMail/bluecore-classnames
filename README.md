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

Just apply `ClassNames` decorator and rename `render` method into `_render`.

`ClassNames` decorator accept className in format
```
className: ?<String>, additional className
element: <String>, name of your element
modifiers: ?<[String] || Object>, where object key is modifier name
```

`cx` has the following declaration:
```
cx(element: <String>, modifiers: ?<Array, Object>)
```

Also you can set delimeters:

```coffee
Compiler = require 'bluecore-classnames/Compiler.coffee'
Compiler.setDelimeters '__', '_'
```
