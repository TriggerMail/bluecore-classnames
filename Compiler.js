// @flow

import React from 'react';
import _ from 'underscore';

const defaultConfig = {
  elementDelimeter: '_',
  modifierDelimeter: '--',
  isStrict: true,
  stripQaClasses: false
};

class Compiler {
  config: {[string]: string | boolean};

  constructor(config: {[string]: string | boolean} = {}) {
    this.config = {
      ...config,
      ...defaultConfig
    };
  }

  setDelimeters = (elementDelimeter: string, modifierDelimeter: string) => {
    this.config = {
      ...this.config,
      elementDelimeter,
      modifierDelimeter
    };
  };

  buildClassName(parentClass: string, config: string) {
    const {elementDelimeter, modifierDelimeter} = this.config;

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
      ({element, modifiers, _qaClassName} = config);
    }

    if (this.config.stripQaClasses) {
      _qaClassName = null;
    }

    if (element) {
      if (newParentClass) {
        newParentClass += `${elementDelimeter}${element}`;
      } else {
        newParentClass = element;
      }
    }

    if (modifiers) {
      modifiersClasses = _(modifiers)
        .chain()
        .map(function(isEnabled, modifier) {
          if (isEnabled) {
            return `${newParentClass}${modifierDelimeter}${modifier}`;
          }
        })
        .compact()
        .value()
        .join(' ');
    }

    return {
      parentClass: newParentClass,
      className: [
        config.className,
        element ? newParentClass : undefined,
        modifiersClasses,
        _qaClassName
      ]
        .filter(val => Boolean(val))
        .join(' ')
    };
  }

  traverseChild(child, parentClass) {
    if (React.isValidElement(child)) {
      let {className} = child.props;
      const props = {};

      if (className) {
        // generate new parentClass to pass it futher and new className
        ({parentClass, className} = this.buildClassName(
          parentClass,
          className
        ));
        props.className = className;
      }

      return React.cloneElement(
        child,
        props,
        Array.isArray(child.props.children)
          ? React.Children.map(child.props.children, child => {
              return this.traverseChild(child, parentClass);
            })
          : this.traverseChild(child.props.children, parentClass)
      );
    } else {
      return child;
    }
  }

  traverse = root => {
    return this.traverseChild(root, '');
  };

  setStrict(isStrict) {
    return (this.config.isStrict = isStrict);
  }
}

export default Compiler;
export function setDefaults(config) {
  return _.extend(defaultConfig, config);
}
