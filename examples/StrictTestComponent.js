// @flow

import React, {Component} from 'react';

import {cx} from '../index';

// types
import type {Node} from 'react';
type TProps = {
  children: Node
};

export class ChildStrictTestComponent extends Component<{}> {
  render() {
    return (
      <div className={cx('base-inner')}>
        <div className={cx('inner')}>Inner</div>
      </div>
    );
  }
}

export class StrictTestComponent extends Component<TProps> {
  render() {
    return (
      <div
        className={{
          className: 'my-base-class',
          element: 'base'
        }}
      >
        <div className={cx('header')}>Header</div>
        <div className={cx('main')}>
          <div className={cx('first', ['hover', 'active'])}>First</div>
          <div
            className={cx('second', {
              active: true,
              hovered: false
            })}
          >
            {this.props.children}
          </div>
        </div>
        <div className={cx('footer')}>Footer</div>
      </div>
    );
  }
}
