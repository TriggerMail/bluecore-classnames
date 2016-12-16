jest.autoMockOff()

jest = jest

{describe, it, expect} = global

{createElement} = require 'react'
{findDOMNode} = require 'react-dom'
{renderIntoDocument} = require 'react-addons-test-utils'
_ = require 'underscore'

Compiler = require '../Compiler.coffee'
Decorator = require '../Decorator.coffee'
{
  StrictTestComponent,
  ChildStrictTestComponent
} = require '../examples/StrictTestComponent.coffee'
{
  TestComponent,
  ChildTestComponent
} = require '../examples/TestComponent.coffee'
{
  StatelessComponent,
  StatelessChildComponent
} = require '../examples/StatelessComponent.coffee'
{
  QaClassesComponent,
  ChildQaClassesComponent
} = require '../examples/QaClassesComponent.coffee'
{
  QaClassesStrictComponent,
  ChildQaClassesStrictComponent
} = require '../examples/QaClassesStrictComponent.coffee'

classTreeWithQaClasses =
  className: 'my-base-class'
  block: 'base'
  _qaClassName: 'test-base'
  children: [
      element: 'header'
    ,
      element: 'main'
      children: [
          element: 'first'
          modifiers: ['hover', 'active']
          _qaClassName: 'test-first'
        ,
          element: 'second'
          modifiers: ['active']
          _qaClassName: 'test-second'
          children: [
            block: 'base-inner',
            children: [
              element: 'inner'
            ]
          ]
      ]
    ,
      element: 'footer'
  ]

removeQaClasses = (tree) ->
  if tree.children
    children = tree.children.map (child) -> removeQaClasses child
  Object.assign {}, tree,
    _qaClassName: undefined
    children: children

classTree = removeQaClasses classTreeWithQaClasses

strictComponent = null
component = null


render = (Component, child) ->
  return findDOMNode(renderIntoDocument(createElement(Component, {}, child)))

checkClasses = (element, classConfig, parentClass, config={}) ->
  expect(element).toBeTruthy()

  {modifiers, _qaClassName, children} = classConfig
  expectedClass = ''
  elementClass = element.getAttribute 'class'

  if classConfig.block
    parentClass = classConfig.block
    expectedClass = parentClass
  else
    expectedClass = "#{parentClass}_#{classConfig.element}"

  expect(elementClass).toContain expectedClass

  if classConfig.className
    expect(elementClass).toContain classConfig.className

  if modifiers
    _.each modifiers, (modifier) ->
      expect(elementClass).toContain "#{expectedClass}--#{modifier}"

  if _qaClassName
    if config.stripQaClasses
      expect(elementClass).not.toContain _qaClassName
    else
      expect(elementClass).toContain _qaClassName

  if children
    _.each children, (child) ->
      newParentClass = expectedClass
      selector = "#{expectedClass}_#{child.element}"

      if child.block
        newParentClass = child.block
        selector = child.block

      checkClasses element.querySelector(".#{selector}"), child,
        newParentClass, config


describe 'ClassNames', ->
  it 'should render strict component into DOM', ->
    strictComponent = render(
      Decorator(StrictTestComponent),
      createElement(Decorator(ChildStrictTestComponent)))
    expect(strictComponent).toBeTruthy()

  it 'should build classes', ->
    checkClasses strictComponent, classTree, ''

  it 'should render component into DOM', ->
    Compiler.setDefaults(isStrict: false)
    component = render(
      Decorator(TestComponent),
      createElement(Decorator(ChildTestComponent)))
    expect(component).toBeTruthy()

  it 'should build classes in forgiving mode', ->
    checkClasses component, classTree, ''

  it 'should wrap component with config', ->
    Compiler.setDefaults(isStrict: true)

    component = render(
      Decorator(isStrict: false)(TestComponent),
      createElement(Decorator(isStrict: false)(ChildTestComponent))
    )
    expect(component).toBeTruthy()

  it 'should render wrapped component properly', ->
    checkClasses component, classTree, ''

  it 'should wrap stateless component', ->
    component = render(
      Decorator(isStrict: false)(StatelessComponent)
      createElement(Decorator(isStrict: false)(StatelessChildComponent))
    )

    expect(component).toBeDefined()
    checkClasses component, classTree, ''

  it 'should show qa classes', ->
    Compiler.setDefaults
      stripQaClasses: false
      isStrict: false

    component = render(
      Decorator(QaClassesComponent),
      createElement(Decorator(ChildQaClassesComponent))
    )
    expect(component).toBeTruthy()
    checkClasses component, classTreeWithQaClasses, '', stripQaClasses: false

  it 'should strip qa classes', ->
    Compiler.setDefaults
      stripQaClasses: true
      isStrict: false

    component = render(
      Decorator(QaClassesComponent),
      createElement(Decorator(ChildQaClassesComponent))
    )
    expect(component).toBeTruthy()
    checkClasses component, classTreeWithQaClasses, '', stripQaClasses: true

  it 'should show qa classes in strict mode', ->
    Compiler.setDefaults
      stripQaClasses: false
      isStrict: true

    component = render(
      Decorator(QaClassesStrictComponent),
      createElement(Decorator(ChildQaClassesStrictComponent))
    )
    expect(component).toBeTruthy()
    checkClasses component, classTreeWithQaClasses, '', stripQaClasses: false

  it 'should strip qa classes in strict mode', ->
    Compiler.setDefaults
      stripQaClasses: true
      isStrict: true

    component = render(
      Decorator(QaClassesStrictComponent),
      createElement(Decorator(ChildQaClassesStrictComponent))
    )
    expect(component).toBeTruthy()
    checkClasses component, classTreeWithQaClasses, '', stripQaClasses: true
