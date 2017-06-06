import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from './message/Message'
import Typing from './typing/Typing'

class Messages extends Component {
  render () {
    return (
      <ul className='Messages'>
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={i} />
        })}
        {this.props.isTyping && <Typing />}
      </ul>
    )
  }
}

Messages.defaultProps = {
  messages: [],
  isTyping: false
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(Message.model).isRequired,
  isTyping: PropTypes.bool
}

export default Messages
