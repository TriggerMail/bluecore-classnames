// @flow

import React, {Component} from 'react';

import {cx} from '../index';

// types
import type {Node} from 'react';
type TProps = {
  children: Node
};

export class ChildQaClassesComponent extends Component<{}> {
  render() {
    return (
      <div className="base-inner">
        <div className="inner">Inner</div>
      </div>
    );
  }
}

export class QaClassesComponent extends Component<TProps> {
  render() {
    return (
      <div
        className={{
          className: 'my-base-class',
          element: 'base',
          _qaClassName: 'test-base'
        }}
      >
        <div className="header">Header</div>
        <div className="main">
          <div className={cx('first', ['hover', 'active'], 'test-first')}>
            First
          </div>
          <div
            className={cx(
              'second',
              {
                active: true,
                hovered: false
              },
              'test-second'
            )}
          >
            {this.props.children}
          </div>
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
