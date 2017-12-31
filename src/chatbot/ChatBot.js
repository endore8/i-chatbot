import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageProcessor from './MessageProcessor'
import ChatBotUtil from './ChatBotUtil'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

/**
 * A `ChatBot` component builds a chat based on messages received from callbacks, handles user interactions and calls callbacks.
 *
 * <ChatBot onGetStarted={onGetStarted} getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')} />
 */
class ChatBot extends Component {
  constructor (props) {
    super(props)

    this._onGetStarted = this._onGetStarted.bind(this)
    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
    this._onTextInputSubmit = this._onTextInputSubmit.bind(this)
    this._onProcessed = this._onProcessed.bind(this)

    this.state = {
      actions: props.getStartedButton ? [props.getStartedButton] : [],
      messages: [],
      messageProcessor: new MessageProcessor(this._onProcessed)
    }
  }

  render () {
    const messages = this.state.messages.concat(this.state.messageProcessor.isProcessing ? [{
      type: 'typing',
      isInbound: false
    }] : [])

    return (
      <div className={'I-ChatBot'}>
        <Messages messages={messages} />
        <ActionBar
          actions={this.state.actions.map((action) => {
            switch (action.type) {
              case 'get-started':
                return Object.assign({}, action, {onAction: this._onGetStarted})

              case 'quick-reply':
                return Object.assign({}, action, {onAction: this._onQuickReplyAction})

              case 'text-input':
                return Object.assign({}, action, {onSubmit: this._onTextInputSubmit})
            }
          })} />
      </div>
    )
  }

  startOver (message = null) {
    this.state.messageProcessor.reset()
    this.setState((prevState, props) => ({
      actions: props.getStartedButton ? [props.getStartedButton] : [],
      messages: message && !this.props.getStartedButton ? [message] : []
    }))

    if (!this.props.getStartedButton) {
      this._processNext(this.props.onGetStarted())
    }
  }

  _addMessage (message) {
    this.setState((prevState, props) => ({
      actions: message.actions || [],
      messages: prevState.messages.concat(message)
    }))
  }

  _onGetStarted (text) {
    this._addMessage(ChatBotUtil.userTextMessage(text))
    this._processNext(this.props.onGetStarted())
  }

  _onProcessed (message) {
    this._addMessage(message)
  }

  _onQuickReplyAction (text, callback) {
    this._addMessage(ChatBotUtil.userTextMessage(text))
    if (callback)
      this._processNext(callback())
  }

  _onTextInputSubmit (value, callback) {
    this.setState((prevState, props) => ({
      actions: []
    }))

    const hasValue = value && value.length
    if (hasValue)
      this._addMessage(ChatBotUtil.userTextMessage(value))
    this._processNext(callback(value), hasValue)
  }

  _processNext (next, delay = true) {
    if (!next) return

    setTimeout(() => {
      ((Array.isArray(next)) ? next : [next]).map((message) => this.state.messageProcessor.process(message))
      this.forceUpdate()
    }, delay ? 500 : 0)
  }
}

ChatBot.propTypes = {
  /**
   * A `<ChatBot>` callback fired immediately on mounting if no get started button object passed during initialization, otherwise when `startOver` method is called.
   * Returns an array of chat message objects to display in a chat.
   *
   * @type Function() -> [Object]
   */
  onGetStarted: PropTypes.func.isRequired,

  /**
   * An optional object that describes get start button.
   * Use ChatBotUtil.makeGetStartedButton method for creating an object with button title.
   *
   * @type Object
   */
  getStartedButton: PropTypes.object
}

export default ChatBot
