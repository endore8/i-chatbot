import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import ChatBot, { ChatBotUtil } from 'src/'

describe('ChatBot', () => {
  let node

  const onQuickReplyAction = () => {}

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Renders view', () => {
    render(<ChatBot startButton={ChatBotUtil.makeReplyButton('Start', 'START')}
                    onQuickReplyAction={onQuickReplyAction} />, node, () => {
      expect(node.children.length).toEqual(1)
      expect(node.firstChild.className).toEqual('I-ChatBot')
    })
  })
})
