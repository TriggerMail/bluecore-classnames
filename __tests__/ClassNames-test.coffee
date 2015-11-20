jest.autoMockOff()

{findDOMNode} = require 'react-dom'
{renderIntoDocument} = require 'react-addons-test-utils'
_ = require 'underscore'
TestComponent = require '../TestComponent.coffee'

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

component = null

describe 'ClassNames', ->
  it 'should render into DOM', ->
    component = findDOMNode renderIntoDocument TestComponent()
    expect(component).toBeTruthy()

  it 'should build classes', ->
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
        _.each children, (child, index) ->
          newParentClass = expectedClass
          selector = "#{expectedClass}_#{child.element}"

          if child.block
            newParentClass = child.block
            selector = child.block

          checkClasses element.querySelector(".#{selector}"), child,
            newParentClass

    checkClasses component, classTree, ''
