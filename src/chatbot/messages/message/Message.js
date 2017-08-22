import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {
  render () {
    return (
      <li className={this.props.isInbound ? 'Message Message-Inbound' : 'Message Message-Outbound'}>
        <div className="Message-Content">
          <span>{this.props.text}</span>
        </div>
      </li>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isInbound: PropTypes.bool.isRequired
}

export default Message
