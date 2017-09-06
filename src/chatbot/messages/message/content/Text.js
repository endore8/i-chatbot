import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Text extends Component {
  render () {
    return (
      <span>{this.props.text}</span>
    )
  }
}

Text.propTypes = {
  text: PropTypes.string.isRequired
}

export default Text
