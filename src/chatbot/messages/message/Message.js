import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {
  render () {
    return (
      <li className={'Message ' + this.props.isInbound ? 'Message-Inbound' : 'Message-Outbound'}>
        <span>{this.props.message.text}</span>
      </li>
    );
  }
}

const Model = {
  text: PropTypes.string.isRequired,
  isInbound: PropTypes.bool.isRequired
}

Message.model = Model
Message.propTypes = Model

export default Message
