import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'

import Animatable from './../../Animatable'
import Text from './content/Text'
import Typing from './content/Typing'

class Message extends Component {
  render () {
    const className = `Message ${this.props.isInbound ? 'Inbound' : 'Outbound'}`
    const content = (() => {
      switch (this.props.type) {
        case 'text':
          return <Text {...this.props.content} />

        case 'typing':
          return <Typing />
      }
    })()

    return (
      <TransitionGroup component='li' className={className}>
        <Animatable classNames='Message-Content'>
          <div className='Message-Animatable-Container'>
            <div className='Message-Content'>
              {content}
            </div>
          </div>
        </Animatable>
      </TransitionGroup>
    )
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['text', 'typing']).isRequired,
  content: PropTypes.object,
  isInbound: PropTypes.bool.isRequired
}

export default Message
