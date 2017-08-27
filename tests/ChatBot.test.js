import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import ChatBot, { ChatBotUtil } from 'src/'

describe('ChatBot', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Renders view', () => {
    const onGetStarted = () => {}

    render(
      <ChatBot getStartedButton={ChatBotUtil.makeGetStartedButton('Start')}
               onGetStarted={onGetStarted} />, node, () => {
        expect(node.children.length).toEqual(1)
        expect(node.firstChild.className).toEqual('I-ChatBot')
      }
    )
  })

  it('Calls onGetStarted callback on startOver with no start button', () => {
    let isCalled = false
    let chat = null
    const onGetStarted = () => {
      isCalled = true
    }

    render(
      <ChatBot onGetStarted={onGetStarted}
               ref={(c) => { chat = c }} />, node, () => {
        chat.startOver()
        expect(isCalled).toEqual(true)
      }
    )
  })

  it('Does not call onGetStarted callback on startOver with start button', () => {
    let isCalled = false
    let chat = null
    const onGetStarted = () => {
      isCalled = true
    }

    render(
      <ChatBot getStartedButton={ChatBotUtil.makeGetStartedButton('Start')}
               onGetStarted={onGetStarted}
               ref={(c) => { chat = c }} />, node, () => {
        chat.startOver()
        expect(isCalled).toEqual(false)
      }
    )
  })
})
