import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Messages from './messages/Messages'

class ChatBot extends Component {

  addTextMessage(text) {
  }

  addTextMessageWithReplies(text, replies) {
  }

  render () {
    return (
      <div className='ChatBot'>
        <Messages messages={[]} />
      </div>
    )
  }
}

ChatBot.propTypes = {
  onPostbackAction: PropTypes.func.isRequired,
  startButtonText: PropTypes.string.isRequired
}

export default ChatBot
