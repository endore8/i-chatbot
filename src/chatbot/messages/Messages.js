import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'
import { CSSTransitionGroup } from 'react-transition-group'

import Message from './message/Message'

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
      <CSSTransitionGroup component='ul'
                          className='Messages'
                          id='Messages'
                          transitionName='Messages'
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}>
        {this.props.messages.map((message, i) => <Message {...message} key={i} />)}
        <Element name='LastMessage' />
      </CSSTransitionGroup>
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
