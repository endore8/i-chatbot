import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Typing  from 'src/chatbot/messages/typing/Typing'

describe('ChatBot', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Renders view', () => {
    render(
      <Typing />, node, () => {
        expect(node.children.length).toEqual(1)
        expect(node.firstChild.className).toEqual('Typing')
      }
    )
  })
})
