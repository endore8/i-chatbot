import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

import MessageProcessor from './MessageProcessor'

import './ChatBot.css'

class ChatBot extends Component {

  constructor (props) {
    super(props)

    this.state = {
      actions: props.startButton ? [props.startButton] : [],
      messages: []
    }

    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
    this._onProcessed = this._onProcessed.bind(this)

    this._messageProcessor = new MessageProcessor()
    this._messageProcessor.isTypingEnabled = props.isTypingEnabled
    this._messageProcessor.onProcessed = this._onProcessed
  }

  simulate (text, action) {
    this._onQuickReplyAction(text, action)
  }

  _onQuickReplyAction (text, action) {
    this._addMessage({text: text}, true, null)

    let next = this.props.onQuickReplyAction(action)

    if (!next) return

    ((next instanceof Array) ? next : [next]).map((message) => this._messageProcessor.process(message))
  }

  _onProcessed (message) {
    this._addMessage(message.message, false, this._messageProcessor.isProcessing ? null : message.actions)
  }

  _addMessage (message, isInbound, actions) {
    this.setState((prevState, props) => ({
      messages: prevState.messages.concat(Object.assign({}, message, {isInbound: isInbound})),
      actions: actions
    }))
  }

  render () {
    let actions
    let actionBarType

    if (this.state.actions) {
      actions = this.state.actions
      actions = actions.map((action) => Object.assign({}, action, {onAction: this._onQuickReplyAction}))
      actionBarType = 'quick-reply'
    }

    return (
      <div className='ChatBot'>
        <Messages messages={this.state.messages}
                  isTyping={this.props.isTypingEnabled && this._messageProcessor.isProcessing} />
        <ActionBar actions={actions} type={actionBarType} />
      </div>
    )
  }

  static textMessage (text, ...actions) {
    return {
      message: {
        text: text
      },
      actions: actions
    }
  }

  static makeReplyButton (text, postback) {
    return {
      title: text,
      postback: postback
    }
  }
}

ChatBot.defaultProps = {
  isTypingEnabled: true
}

ChatBot.propTypes = {
  onQuickReplyAction: PropTypes.func.isRequired,
  startButton: PropTypes.object,
  isTypingEnabled: PropTypes.bool
}

export default ChatBot
