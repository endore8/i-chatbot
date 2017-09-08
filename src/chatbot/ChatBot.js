import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageProcessor from './MessageProcessor'
import ChatBotUtil from './ChatBotUtil'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

class ChatBot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      actions: props.getStartedButton ? [props.getStartedButton] : [],
      messages: []
    }

    this._onGetStarted = this._onGetStarted.bind(this)
    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
    this._onTextInputSubmit = this._onTextInputSubmit.bind(this)
    this._onProcessed = this._onProcessed.bind(this)

    this._messageProcessor = new MessageProcessor(this._onProcessed)
  }

  render () {
    const messages = this.state.messages.concat(this._messageProcessor.isProcessing ? [{
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
    this._messageProcessor.reset()
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
    if (value && value.length)
      this._addMessage(ChatBotUtil.userTextMessage(value))
    this._processNext(callback(value))
  }

  _processNext (next) {
    if (!next) return

    setTimeout(() => {
      ((next instanceof Array) ? next : [next]).map((message) => this._messageProcessor.process(message))
      this.forceUpdate()
    }, 500)
  }
}

ChatBot.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  getStartedButton: PropTypes.object
}

export default ChatBot
