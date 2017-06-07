import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReplyButton from './controls/ReplyButton'

class ActionBar extends Component {

  render () {
    return (
      <div className="ActionBar">
        {this.props.type === 'quick-reply' && (this.props.actions instanceof Array) &&
        this.props.actions.map((action, i) => <ReplyButton {...action} key={i} />)}
      </div>
    )
  }

}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.oneOf(['quick-reply'])
}

export default ActionBar
