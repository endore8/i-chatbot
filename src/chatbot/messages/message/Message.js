import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Text from './content/Text'
import Typing from './content/Typing'

class Message extends Component {
  render () {
    let content = (() => {
      switch (this.props.type) {
        case 'text':
          return <Text {...this.props.content} />

        case 'typing':
          return <Typing />
      }
    })()

    return (
      <li className={this.props.isInbound ? 'Message Message-Inbound' : 'Message Message-Outbound'}>
        <div className="Message-Content">
          {content}
        </div>
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
