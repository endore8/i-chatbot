import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import ChatBot, { ChatBotUtil } from 'src/'

describe('ChatBot', () => {
  let node

  const onGetStarted = () => {}

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Renders view', () => {
    render(
      <ChatBot getStartedButton={ChatBotUtil.makeGetStartedButton('Start')}
               onGetStarted={onGetStarted} />, node, () => {
        expect(node.children.length).toEqual(1)
        expect(node.firstChild.className).toEqual('I-ChatBot')
      }
    )
  })
})
