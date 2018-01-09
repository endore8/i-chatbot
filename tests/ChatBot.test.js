import expect from 'expect'
import React from 'react'
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import ChatBot, { ChatBotUtil } from 'src/'
import MessageProcessor from 'src/chatbot/MessageProcessor'

process.env.MESSAGE_SCROLL_DISABLED = true

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

  it('Goes through conversation steps', (done) => {
    const input = (value) => {
      expect(value).toEqual('Test Case')
      done()
    }
    const reply = () => {
      return [
        ChatBotUtil.textMessage('Text input',
          ChatBotUtil.makeTextInputField('Send', 'Placeholder', input))
      ]
    }
    const getStarted = () => {
      return [
        ChatBotUtil.textMessage('Quick reply',
          ChatBotUtil.makeReplyButton('First', reply),
          ChatBotUtil.makeReplyButton('Second'))
      ]
    }

    const rendered = render(
      <ChatBot getStartedButton={ChatBotUtil.makeGetStartedButton('Start')}
        onGetStarted={getStarted} />, node)

    const firstStep = () => {
      const startButton = ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'GetStartedButton')
      expect(startButton).toExist()
      ReactTestUtils.Simulate.click(startButton)

      setTimeout(secondStep, MessageProcessor.typingSpeed('Quick reply') + 600)
    }

    const secondStep = () => {
      const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button')
      expect(buttons.length).toEqual(2)
      const firstButton = buttons[0]
      expect(firstButton).toExist()
      ReactTestUtils.Simulate.click(firstButton)

      setTimeout(thirdStep, MessageProcessor.typingSpeed('Text input') + 600)
    }

    const thirdStep = () => {
      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input')
      const nameInput = inputs[0]
      expect(nameInput).toExist()
      nameInput.value = 'Test Case'
      ReactTestUtils.Simulate.change(nameInput)
      const submit = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button')[0]
      expect(submit).toExist()
      ReactTestUtils.Simulate.click(submit)
    }

    firstStep()
  }).timeout(5000)
})
