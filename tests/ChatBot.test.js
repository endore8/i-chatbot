import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

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
        expect(node.firstChild.className).toEqual('I-ChatBot Animated')
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

  it('Goes through conversation steps', () => {
    let ended = false
    const end = () => {
      ended = true
    }

    let inputValue = undefined
    const input = (value) => {
      inputValue = value

      return [
        ChatBotUtil.textMessage('Test text input',
          ChatBotUtil.makeTextInputField('', '', end))
      ]
    }
    const reply = () => {
      return [
        ChatBotUtil.textMessage('Test text input',
          ChatBotUtil.makeTextInputField('Send', 'Placeholder', input))
      ]
    }
    const getStarted = () => {
      return [
        ChatBotUtil.textMessage('Test quick reply',
          ChatBotUtil.makeReplyButton('First', reply),
          ChatBotUtil.makeReplyButton('Second'))
      ]
    }

    const rendered = render(
      <ChatBot getStartedButton={ChatBotUtil.makeGetStartedButton('Start')}
               onGetStarted={getStarted}
               isAnimated={false} />, node)

    const startButton = ReactTestUtils.findRenderedDOMComponentWithClass(rendered, 'GetStartedButton')
    expect(startButton).toExist()
    ReactTestUtils.Simulate.click(startButton)

    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button')
    const firstButton = buttons[0]
    expect(firstButton).toExist()
    ReactTestUtils.Simulate.click(firstButton)

    const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input')
    const nameInput = inputs[0]
    expect(nameInput).toExist()
    nameInput.value = 'Test Case'
    ReactTestUtils.Simulate.change(nameInput)
    const submit = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button')[0]
    expect(submit).toExist()
    ReactTestUtils.Simulate.click(submit)
    expect(inputValue).toEqual('Test Case')
  })

  it('Goes through conversation steps with delays', (done) => {
    let ended = false
    const end = () => {
      ended = true
    }

    const getStarted = () => {
      return [
        ChatBotUtil.textMessage('Yo',
          ChatBotUtil.makeReplyButton('Next', end))
      ]
    }

    let chat = null

    const rendered = render(
      <ChatBot onGetStarted={getStarted}
               ref={(c) => { chat = c }} />, node)

    chat.startOver()

    setTimeout(() => {
      const nextButton = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button')[0]
      expect(nextButton).toExist()
      ReactTestUtils.Simulate.click(nextButton)
    }, 400)

    setTimeout(() => {
      expect(ended).toEqual(true)
      done()
    }, 800)
  })
})
