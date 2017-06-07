import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {
  render () {
    return (
      <li className={'Message ' + this.props.isInbound ? 'Message-Inbound' : 'Message-Outbound'}>
        <span>{this.props.text}</span>
      </li>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isInbound: PropTypes.bool.isRequired
}

export default Message
