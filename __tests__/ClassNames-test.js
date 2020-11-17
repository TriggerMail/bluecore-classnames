import React, {createElement} from 'react';
import {render} from '@testing-library/react';

import {Compiler, ClassNames} from '../index';

import {
  StrictTestComponent,
  ChildStrictTestComponent
} from '../examples/StrictTestComponent';
import {TestComponent, ChildTestComponent} from '../examples/TestComponent';
import {
  StatelessComponent,
  StatelessChildComponent
} from '../examples/StatelessComponent';

const classTree = {
  className: 'my-base-class',
  block: 'base',
  children: [
    {element: 'header'},
    {
      element: 'main',
      children: [
        {
          element: 'first',
          modifiers: ['hover', 'active']
        },
        {
          element: 'second',
          modifiers: ['active'],
          children: [
            {
              block: 'base-inner',
              children: [{element: 'inner'}]
            }
          ]
        }
      ]
    },
    {element: 'footer'}
  ]
};

const renderComponent = (Component, child) => {
  const {container} = render(<Component>{createElement(child)}</Component>);
  return container.firstChild;
};

const checkClasses = function(element, classConfig, parentClass, config = {}) {
  expect(element).toBeTruthy();

  const {modifiers, children} = classConfig;
  let expectedClass = '';
  const elementClass = element.className;

  if (classConfig.block) {
    parentClass = classConfig.block;
    expectedClass = parentClass;
  } else {
    expectedClass = `${parentClass}_${classConfig.element}`;
  }

  expect(elementClass).toContain(expectedClass);

  if (classConfig.className) {
    expect(elementClass).toContain(classConfig.className);
  }

  if (modifiers) {
    modifiers.forEach(modifier =>
      expect(elementClass).toContain(`${expectedClass}--${modifier}`)
    );
  }

  if (children) {
    children.forEach(function(child) {
      let newParentClass = expectedClass;
      let selector = `${expectedClass}_${child.element}`;

      if (child.block) {
        newParentClass = child.block;
        selector = child.block;
      }

      return checkClasses(
        element.querySelector(`.${selector}`),
        child,
        newParentClass,
        config
      );
    });
  }
};

describe('ClassNames', function() {
  it('should render strict component into DOM', function() {
    const component = renderComponent(
      ClassNames(StrictTestComponent),
      ClassNames(ChildStrictTestComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTree, '');
  });

  it('should render non-strict component into DOM', function() {
    Compiler.setDefaults({isStrict: false});
    const component = renderComponent(
      ClassNames(TestComponent),
      ClassNames(ChildTestComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTree, '');
  });

  it('should wrap component with config', function() {
    Compiler.setDefaults({isStrict: true});

    const component = renderComponent(
      ClassNames({isStrict: false})(TestComponent),
      ClassNames({isStrict: false})(ChildTestComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTree, '');
  });

  it('should wrap stateless component', function() {
    const component = renderComponent(
      ClassNames({isStrict: false})(StatelessComponent),
      ClassNames({isStrict: false})(StatelessChildComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTree, '');
  });
});
