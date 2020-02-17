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
import {
  QaClassesComponent,
  ChildQaClassesComponent
} from '../examples/QaClassesComponent';
import {
  QaClassesStrictComponent,
  ChildQaClassesStrictComponent
} from '../examples/QaClassesStrictComponent';

const classTreeWithQaClasses = {
  className: 'my-base-class',
  block: 'base',
  _qaClassName: 'test-base',
  children: [
    {element: 'header'},
    {
      element: 'main',
      children: [
        {
          element: 'first',
          modifiers: ['hover', 'active'],
          _qaClassName: 'test-first'
        },
        {
          element: 'second',
          modifiers: ['active'],
          _qaClassName: 'test-second',
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

const removeQaClasses = function(tree) {
  let children;
  if (tree.children) {
    children = tree.children.map(child => removeQaClasses(child));
  }
  return Object.assign({}, tree, {
    _qaClassName: undefined,
    children
  });
};

const classTree = removeQaClasses(classTreeWithQaClasses);

const renderComponent = (Component, child) => {
  const {container} =  render(<Component>{createElement(child)}</Component>);
  return container.firstChild;
};

const checkClasses = function(element, classConfig, parentClass, config = {}) {
  expect(element).toBeTruthy();

  const {modifiers, _qaClassName, children} = classConfig;
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

  if (_qaClassName) {
    if (config.stripQaClasses) {
      expect(elementClass).not.toContain(_qaClassName);
    } else {
      expect(elementClass).toContain(_qaClassName);
    }
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

  it('should show qa classes', function() {
    Compiler.setDefaults({
      stripQaClasses: false,
      isStrict: false
    });

    const component = renderComponent(
      ClassNames(QaClassesComponent),
      ClassNames(ChildQaClassesComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTreeWithQaClasses, '', {
      stripQaClasses: false
    });
  });

  it('should strip qa classes', function() {
    Compiler.setDefaults({
      stripQaClasses: true,
      isStrict: false
    });

    const component = renderComponent(
      ClassNames(QaClassesComponent),
      ClassNames(ChildQaClassesComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTreeWithQaClasses, '', {
      stripQaClasses: true
    });
  });

  it('should show qa classes in strict mode', function() {
    Compiler.setDefaults({
      stripQaClasses: false,
      isStrict: true
    });

    const component = renderComponent(
      ClassNames(QaClassesStrictComponent),
      ClassNames(ChildQaClassesStrictComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTreeWithQaClasses, '', {
      stripQaClasses: false
    });
  });

  it('should strip qa classes in strict mode', function() {
    Compiler.setDefaults({
      stripQaClasses: true,
      isStrict: true
    });

    const component = renderComponent(
      ClassNames(QaClassesStrictComponent),
      ClassNames(ChildQaClassesStrictComponent)
    );
    expect(component).toBeTruthy();

    checkClasses(component, classTreeWithQaClasses, '', {
      stripQaClasses: true
    });
  });
});
