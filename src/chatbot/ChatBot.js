import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

import './ChatBot.css'

class ChatBot extends Component {

  constructor (props) {
    super(props)

    this.state = {
      actions: [props.startButton],
      messages: []
    }

    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
  }

  _onQuickReplyAction (text, action) {
    let reply = this.props.onQuickReplyAction(action)
    if (reply) {
      reply = (reply instanceof Array) ? reply : [reply]
    }

    let messages = [{
      text: text,
      isInbound: true
    }]

    let actions

    if (reply) {
      messages = messages.concat(reply.map((m, i) => Object.assign({}, m.message, {isInbound: false})))
      actions = reply.pop().actions
    }

    this.setState({
      messages: this.state.messages.concat(messages),
      actions: actions
    })
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
        <Messages messages={this.state.messages} />
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

ChatBot.propTypes = {
  onQuickReplyAction: PropTypes.func.isRequired,
  startButton: PropTypes.object.isRequired
}

export default ChatBot
