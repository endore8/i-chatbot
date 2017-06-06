import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import ChatBot from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('DOM hierarchy', () => {
    render(<ChatBot />, node, () => {
      expect(node.children.length).toEqual(1)
      expect(node.firstChild.className).toEqual('ChatBot')
    })
  })
})
