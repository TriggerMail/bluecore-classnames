# bluecore-classnames

Utility to build [BEM](https://en.bem.info/) class names for React components.

### Example

```js
import React from 'react';
import {cx, ClassNames} from 'bluecore-classnames';

@ClassNames
class MyComponent extends React.Component
  constructor(props) {
    super(props);
    this.state = {hovered: true};
  }
  
  render() {
    return (
      <div className={cx('base')}>
        <div className={cx('inner')}>
          <div className={cx('first', ['active'])}>
          <div className>={cx('second', {hovered: this.state.hovered})}</div>
        </div>
      </div>
    );
  }

export default MyComponent

```

Will be transformed into

```jade
div className: 'base',
  div className: 'base_inner',
    div className: 'base_inner_first base_inner_first--active'
    div className: 'base_inner_second base_inner_second--hovered'
```

It can be very helpfull if you're using [less](http://lesscss.org/) or [sass](http://sass-lang.com/).

If you're using coffeescript:

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

### How to use

!!! To use es6 decorators you need to compile your code with [babel](https://babeljs.io/) compiler with [stage-1](https://babeljs.io/docs/plugins/preset-stage-1/) preset enabled.

Just apply `ClassNames` decorator to your React class.
To apply decorator to coffeescript class like in the example, you need to rename `render` method to `_render`.

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

```js
import {compiler} from 'bluecore-classnames';
compiler.setDelimeters('__', '_');
```

If decorator found `className`s with `<string>` type it treats them as usual classNames.
```js
import {compiler} from 'bluecore-classnames';
compiler.setStrict(false);
```
will make compiler to treat string classNames as element,
so code below will work too:
```js

<div className={'base'}>
  <div className={'inner'}>
    <div className={cx('first', ['active'])}>
    <div className>={cx('second', {hovered: this.state.hovered})}</div>
  </div>
</div>

```

### License: MIT
