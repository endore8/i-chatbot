import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GetStartedButton from './controls/GetStartedButton'
import ReplyButton from './controls/ReplyButton'
import TextInput from './controls/TextInput'

class ActionBar extends Component {
  render () {
    return (
      <div className="ActionBar">
        <ul className="Items">
          {this.props.actions && this.props.actions.map((action, i) => {
            switch (action.type) {
              case 'get-started':
                return <li key={i}><GetStartedButton {...action} key={i} /></li>

              case 'quick-reply':
                return <li key={i}><ReplyButton {...action} key={i} /></li>

              case 'text-input':
                return <li key={i}><TextInput {...action} key={i} /></li>
            }
          })}
        </ul>
      </div>
    )
  }
}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object)
}

export default ActionBar
