import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import Text from './content/Text'
import Typing from './content/Typing'

class Message extends Component {
  render () {
    let className = 'Message ' + (this.props.isInbound ? 'Inbound' : 'Outbound')
    let content = (() => {
      switch (this.props.type) {
        case 'text':
          return <Text key="text" {...this.props.content} />

        case 'typing':
          return <Typing key="typing" />
      }
    })()

    return (
      <li className={className}>
        <CSSTransitionGroup component="div"
                            className="Message-Content"
                            transitionName="Message-Content"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
          {content}
        </CSSTransitionGroup>
      </li>
    )
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['text', 'typing']).isRequired,
  content: PropTypes.object,
  isInbound: PropTypes.bool.isRequired
}

export default Message
