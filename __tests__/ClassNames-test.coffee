jest.autoMockOff()

jest = jest

{describe, it, expect} = global

{createFactory, createElement} = require 'react'
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

classTree =
  className: 'my-base-class'
  block: 'base'
  children: [
      element: 'header'
    ,
      element: 'main'
      children: [
          element: 'first'
          modifiers: ['hover', 'active']
        ,
          element: 'second'
          modifiers: ['active']
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

strictComponent = null
component = null

render = (Component, child) ->
  return findDOMNode(renderIntoDocument(createFactory(Component)({}, child)))

checkClasses = (element, classConfig, parentClass) ->
  expect(element).toBeTruthy()

  {modifiers, children} = classConfig
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

  if children
    _.each children, (child) ->
      newParentClass = expectedClass
      selector = "#{expectedClass}_#{child.element}"

      if child.block
        newParentClass = child.block
        selector = child.block

      checkClasses element.querySelector(".#{selector}"), child,
        newParentClass


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
