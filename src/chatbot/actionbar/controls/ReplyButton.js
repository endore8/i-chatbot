import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ReplyButton.css'

class ReplyButton extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    this.props.onAction(this.props.title, this.props.postback)
  }

  render () {
    return (
      <button className="ReplyButton" onClick={this.handleClick}>{this.props.title}</button>
    )
  }
}

ReplyButton.propTypes = {
  title: PropTypes.string.isRequired,
  postback: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
}

export default ReplyButton
