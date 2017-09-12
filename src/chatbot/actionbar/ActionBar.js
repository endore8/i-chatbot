import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import GetStartedButton from './controls/GetStartedButton'
import ReplyButton from './controls/ReplyButton'
import TextInput from './controls/TextInput'

class ActionBar extends Component {
  render () {
    return (
      <CSSTransitionGroup component='ul'
                          className='ActionBar'
                          transitionName='ActionBar'
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={300}>
        {this.props.actions && this.props.actions.map((action, i) => {
          const li = (() => {
            switch (action.type) {
              case 'get-started':
                return <GetStartedButton {...action} />

              case 'quick-reply':
                return <ReplyButton {...action} />

              case 'text-input':
                return <TextInput {...action} />
            }
          })()

          return <li className='Action' key={i}>{li}</li>
        })}
      </CSSTransitionGroup>
    )
  }
}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object)
}

export default ActionBar
