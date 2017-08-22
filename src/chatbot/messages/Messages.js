import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'

import Message from './message/Message'
import Typing from './typing/Typing'

const Element = Scroll.Element
const Scroller = Scroll.scroller

class Messages extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.messages.length === prevProps.messages.length + 1 || this.props.isTyping !== prevProps.isTyping) {
      Scroller.scrollTo('LastMessage', {
        duration: 500,
        smooth: true,
        containerId: 'Messages'
      })
    }
  }

  render () {
    return (
      <ul className="Messages" id="Messages">
        {this.props.messages.map((message, i) => <Message {...message} key={i} />)}
        {this.props.isTyping && <Typing />}
        <Element name="LastMessage" />
      </ul>
    )
  }
}

Messages.defaultProps = {
  messages: [],
  isTyping: false
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  isTyping: PropTypes.bool
}

export default Messages
