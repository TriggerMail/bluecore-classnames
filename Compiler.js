// @flow

import React from 'react';

// types
import type {Element, Node} from 'react';
export type TConfig = {
  elementDelimiter: string,
  modifierDelimiter: string,
  isStrict: boolean,
  stripQaClasses: boolean
};

class Compiler {
  config: TConfig;

  static defaultConfig: TConfig = {
    elementDelimiter: '_',
    modifierDelimiter: '--',
    isStrict: true,
    stripQaClasses: false
  };

  constructor(config: TConfig = {}) {
    this.config = {
      ...Compiler.defaultConfig,
      ...config
    };
  }

  setDelimeters = (elementDelimiter: string, modifierDelimiter: string) => {
    this.config = {
      ...this.config,
      elementDelimiter,
      modifierDelimiter
    };
  };

  buildClassName(parentClass: string, config: string | Object) {
    const {elementDelimiter, modifierDelimiter} = this.config;

    let element = null;
    let modifiers = null;
    let newParentClass = parentClass;
    let modifiersClasses = '';
    let _qaClassName = null;

    if (typeof config == 'string') {
      if (this.config.isStrict) {
        // pass if strict mode is enabled
        return {
          parentClass: newParentClass,
          className: config
        };
      } else {
        element = config;
      }
    } else {
      element = config.element;
      modifiers = config.modifiers;
      _qaClassName = config._qaClassName;
    }

    if (this.config.stripQaClasses) {
      _qaClassName = null;
    }

    if (element) {
      if (newParentClass) {
        newParentClass += `${elementDelimiter}${element}`;
      } else {
        newParentClass = element;
      }
    }

    if (modifiers) {
      modifiersClasses = Object.entries(modifiers)
        .reduce((res: string[], [key, value]: [string, mixed]) => {
          if (value) {
            return [...res, `${newParentClass}${modifierDelimiter}${key}`];
          }
          return res;
        }, [])
        .join(' ');
    }

    return {
      parentClass: newParentClass,
      className: [
        config.className || '',
        element ? newParentClass : undefined,
        modifiersClasses,
        _qaClassName
      ]
        .filter((val: any) => Boolean(val))
        .join(' ')
    };
  }

  traverseChild(child: Element<any>, parentClass: string, rootChildren: Node) {
    if (React.isValidElement(child)) {
      let {className} = child.props;
      let usedParentClass = parentClass;

      const props = {};

      if (className) {
        // generate new parentClass to pass it futher and new className
        const generatedClassName = this.buildClassName(parentClass, className);
        props.className = generatedClassName.className;
        usedParentClass = generatedClassName.parentClass;
      }

      return React.cloneElement(
        child,
        props,
        child.props.children === rootChildren
          ? child.props.children
          : Array.isArray(child.props.children)
          ? React.Children.map(child.props.children, (child: Element<any>) => {
              return this.traverseChild(child, usedParentClass, rootChildren);
            })
          : this.traverseChild(
              child.props.children,
              usedParentClass,
              rootChildren
            )
      );
    } else {
      return child;
    }
  }

  traverse = (root: Element<any>, rootChildren: Node) => {
    return this.traverseChild(root, '', rootChildren);
  };

  setStrict(isStrict: boolean) {
    this.config.isStrict = isStrict;
  }

  static setDefaults(config: TConfig) {
    Compiler.defaultConfig = {...Compiler.defaultConfig, ...config};
  }
}

export default Compiler;
