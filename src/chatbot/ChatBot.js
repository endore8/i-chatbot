import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MessageProcessor from './MessageProcessor'

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

    this._messageProcessor = new MessageProcessor(this._onProcessed, props.isAnimated)
  }

  render () {
    const messages = this.state.messages.concat(this._messageProcessor.isProcessing ? [{type: 'typing'}] : [])

    return (
      <div className={'I-ChatBot' + (this.props.isAnimated ? ' Animated' : '')}>
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

  _addMessage (content, type, isInbound, actions) {
    this.setState((prevState, props) => ({
      actions: actions || [],
      messages: (content && type) ? prevState.messages.concat(Object.assign({}, {
        content: content,
        type: type
      }, {isInbound: isInbound})) : prevState.messages
    }))
  }

  _addTextMessage (text, isInbound, actions) {
    this._addMessage({text: text}, 'text', isInbound, actions)
  }

  _onGetStarted (text) {
    this._addTextMessage(text, true, null)
    this._processNext(this.props.onGetStarted())
  }

  _onProcessed (message) {
    this._addMessage(message.content, message.type, false, this._messageProcessor.isProcessing ? null : message.actions)
  }

  _onQuickReplyAction (text, callback) {
    this._addTextMessage(text, true, null)
    if (callback) this._processNext(callback())
  }

  _onTextInputSubmit (value, callback) {
    this._addTextMessage(value.length ? value : null, true, null)
    this._processNext(callback(value))
  }

  _processNext (next) {
    if (!next) return

    ((next instanceof Array) ? next : [next]).map((message) => this._messageProcessor.process(message))
  }
}

ChatBot.defaultProps = {
  isAnimated: true
}

ChatBot.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  getStartedButton: PropTypes.object,
  isAnimated: PropTypes.bool
}

export default ChatBot
