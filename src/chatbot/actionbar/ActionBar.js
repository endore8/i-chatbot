import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReplyButton from './controls/ReplyButton'
import TextInput from './controls/TextInput'

import './ActionBar.css'

class ActionBar extends Component {

  render () {
    return (
      <div className="ActionBar">
        {this.props.actions && this.props.actions.map((action, i) => {
          switch (action.type) {
            case 'quick-reply':
              return <ReplyButton {...action} key={i} />

            case 'text-input':
              return <TextInput {...action} key={i} />
          }
        })}
      </div>
    )
  }

}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object)
}

export default ActionBar
