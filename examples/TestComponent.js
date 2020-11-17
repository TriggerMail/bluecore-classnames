// @flow

import React, {Component} from 'react';

import {cx} from '../index';

// types
import type {Node} from 'react';
type TProps = {
  children: Node
};

export class ChildTestComponent extends Component<{}> {
  render() {
    return (
      <div className="base-inner">
        <div className="inner">Inner</div>
      </div>
    );
  }
}

export class TestComponent extends Component<TProps> {
  render() {
    return (
      <div
        className={{
          className: 'my-base-class',
          element: 'base'
        }}
      >
        <div className="header">Header</div>
        <div className="main">
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
        <div className="footer">Footer</div>
      </div>
    );
  }
}
