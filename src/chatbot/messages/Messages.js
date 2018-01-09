import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'
import { TransitionGroup } from 'react-transition-group'

import Animatable from './../Animatable'
import Message from './message/Message'

const Element = Scroll.Element
const Scroller = Scroll.scroller

class Messages extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.messages.length === prevProps.messages.length + 1 || this.props.isTyping !== prevProps.isTyping) {
      if (process.env.MESSAGE_SCROLL_DISABLED !== true) { // Is set in tests. `react-scroll` has an issue with execution when run in tests.
        Scroller.scrollTo('LastMessage', {
          duration: 500,
          smooth: true,
          containerId: 'Messages'
        })
      }
    }
  }

  render () {
    const messages = this.props.messages.map((message, i) => <Animatable classNames='Messages' key={i}><Message {...message} /></Animatable>)
    const lastMessage = <Element name='LastMessage' />
    return (
      <TransitionGroup component='ul' className='Messages' id='Messages'>
        {messages}
        {lastMessage}
      </TransitionGroup>
    )
  }
}

Messages.defaultProps = {
  messages: []
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Messages
