import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

import MessageProcessor from './MessageProcessor'

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

    this._messageProcessor = new MessageProcessor(this._onProcessed, props.isTypingEnabled)
  }

  startOver () {
    this._messageProcessor.reset()
    this.setState((prevState, props) => ({
      actions: props.getStartedButton ? [props.getStartedButton] : [],
      messages: []
    }))

    if (!this.props.getStartedButton) {
      this._processNext(this.props.onGetStarted())
    }
  }

  _onGetStarted (text) {
    this._addMessage({text: text}, true, null)
    this._processNext(this.props.onGetStarted())
  }

  _onQuickReplyAction (text, postback) {
    this._addMessage({text: text}, true, null)
    this._processNext(this.props.onQuickReplyAction(postback))
  }

  _onTextInputSubmit (value, postback) {
    this._addMessage(value.length ? {text: value} : null, true, null)
    this._processNext(this.props.onTextInputSubmit(value, postback))
  }

  _processNext (next) {
    if (!next) return

    ((next instanceof Array) ? next : [next]).map((message) => this._messageProcessor.process(message))
  }

  _onProcessed (message) {
    this._addMessage(message.message, false, this._messageProcessor.isProcessing ? null : message.actions)
  }

  _addMessage (message, isInbound, actions) {
    this.setState((prevState, props) => ({
      actions: actions || [],
      messages: message ? prevState.messages.concat(Object.assign({}, message, {isInbound: isInbound})) : prevState.messages
    }))
  }

  render () {
    return (
      <div className='I-ChatBot'>
        <Messages
          messages={this.state.messages}
          isTyping={this.props.isTypingEnabled && this._messageProcessor.isProcessing} />
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
}

ChatBot.defaultProps = {
  isTypingEnabled: true
}

ChatBot.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  onQuickReplyAction: PropTypes.func,
  onTextInputSubmit: PropTypes.func,
  getStartedButton: PropTypes.object,
  isTypingEnabled: PropTypes.bool
}

export default ChatBot
