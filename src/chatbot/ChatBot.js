import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionBar from './actionbar/ActionBar'
import Messages from './messages/Messages'

class ChatBot extends Component {

  addTextMessage (text) {
  }

  addTextMessageWithReplies (text, replies) {
  }

  render () {
    return (
      <div className='ChatBot'>
        <Messages messages={[]} />
        <ActionBar />
      </div>
    )
  }
}

ChatBot.propTypes = {
  onPostbackAction: PropTypes.func.isRequired,
  startButtonText: PropTypes.string.isRequired
}

export default ChatBot
