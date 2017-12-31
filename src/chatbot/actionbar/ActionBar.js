import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'

import Animatable from './../Animatable'
import GetStartedButton from './controls/GetStartedButton'
import ReplyButton from './controls/ReplyButton'
import TextInput from './controls/TextInput'

class ActionBar extends Component {
  render () {
    const items = (() => {
      return this.props.actions && this.props.actions.map((action, i) => {
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
        return (
          <Animatable classNames='ActionBar' key={i}>
            <li className='Action'>
              {li}
            </li>
          </Animatable>
        )
      })
    })()
    return (
      <TransitionGroup component='ul' className='ActionBar'>
        {items}
      </TransitionGroup>
    )
  }
}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object)
}

export default ActionBar
