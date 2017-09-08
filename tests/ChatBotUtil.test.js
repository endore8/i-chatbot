import expect from 'expect'

import { ChatBotUtil } from 'src/'

describe('ChatBotUtil', () => {
  it('Creates a text message', () => {
    const callback = () => {}
    expect(ChatBotUtil.textMessage('Hello')).toEqual({
      content: {text: 'Hello'},
      isInbound: false,
      type: 'text',
      actions: []
    })
    expect(ChatBotUtil.textMessage()).toEqual({content: {text: undefined}, isInbound: false, type: 'text', actions: []})
    expect(ChatBotUtil.textMessage('Hi', ChatBotUtil.makeReplyButton('Hello')))
      .toEqual({
        content: {text: 'Hi'},
        isInbound: false,
        type: 'text',
        actions: [{title: 'Hello', callback: undefined, type: 'quick-reply'}]
      })
    expect(ChatBotUtil.textMessage('Question?', ChatBotUtil.makeReplyButton('Yes'), ChatBotUtil.makeReplyButton('No', callback)))
      .toEqual({
        content: {text: 'Question?'},
        isInbound: false,
        type: 'text',
        actions: [
          {title: 'Yes', callback: undefined, type: 'quick-reply'},
          {title: 'No', callback: callback, type: 'quick-reply'}]
      })
  })

  it('Creates a user text message', () => {
    expect(ChatBotUtil.userTextMessage('Hello')).toEqual({content: {text: 'Hello'}, isInbound: true, type: 'text'})
    expect(ChatBotUtil.userTextMessage()).toEqual({content: {text: undefined}, isInbound: true, type: 'text'})
    expect(ChatBotUtil.userTextMessage('Hi', ChatBotUtil.makeReplyButton('Hello')))
      .toEqual({content: {text: 'Hi'}, isInbound: true, type: 'text'})
  })

  it('Creates a get started button', () => {
    expect(ChatBotUtil.makeGetStartedButton('Start!')).toEqual({title: 'Start!', type: 'get-started'})
    expect(ChatBotUtil.makeGetStartedButton('start')).toEqual({title: 'start', type: 'get-started'})
    expect(ChatBotUtil.makeGetStartedButton()).toEqual({title: undefined, type: 'get-started'})
  })

  it('Creates a reply button', () => {
    const callback = () => {}
    expect(ChatBotUtil.makeReplyButton('Yes')).toEqual({title: 'Yes', callback: undefined, type: 'quick-reply'})
    expect(ChatBotUtil.makeReplyButton('yes', callback)).toEqual({
      title: 'yes',
      callback: callback,
      type: 'quick-reply'
    })
    expect(ChatBotUtil.makeReplyButton()).toEqual({title: undefined, callback: undefined, type: 'quick-reply'})
  })

  it('Creates a text input', () => {
    const callback = () => {}
    expect(ChatBotUtil.makeTextInputField('Send', 'Enter your name', callback))
      .toEqual({submit: 'Send', placeholder: 'Enter your name', callback: callback, type: 'text-input'})
    expect(ChatBotUtil.makeTextInputField('send', 'enter your name', callback))
      .toEqual({submit: 'send', placeholder: 'enter your name', callback: callback, type: 'text-input'})
    expect(ChatBotUtil.makeTextInputField('Ok'))
      .toEqual({submit: 'Ok', placeholder: undefined, callback: undefined, type: 'text-input'})
    expect(ChatBotUtil.makeTextInputField(undefined, 'Enter email'))
      .toEqual({submit: undefined, placeholder: 'Enter email', callback: undefined, type: 'text-input'})
  })
})

describe('ChatBotUtil Array extension', () => {
  it('Returns random object from array', () => {
    expect(['a', 'b', 'c'].any()).toExist()
    expect(['a'].any()).toExist()
    expect([].any()).toNotExist()
  })
})