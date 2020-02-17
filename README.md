# bluecore-classnames

Utility to build [BEM](https://en.bem.info/) class names for React components.

### Example

```js
import React from 'react';
import {cx, ClassNames} from 'bluecore-classnames';

@ClassNames
class MyComponent extends React.Component {
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

### How to use

!!! To use es6 decorators you need to compile your code with [babel](https://babeljs.io/) compiler with [stage-1](https://babeljs.io/docs/plugins/preset-stage-1/) preset enabled.

Just apply `ClassNames` decorator to your React class.

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

Also you can set default values for compiler:

```js
import {Compiler} from 'bluecore-classnames';
Compiler.setDefaults({
  isStrict: false,
  elementDelimeter: '-',
  modifierDelimeter: '__'
});
```

If decorator found `className`s with `<string>` type it treats them as usual classNames.
```js
import {Compiler} from 'bluecore-classnames';
Compiler.setDefaults({isStrict: false});
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

or you can pass config directly to decorator:
```js
@ClassNames({isStrict: false})
class MyComponent extends React.Component {
  ...
}
```

### License: MIT
