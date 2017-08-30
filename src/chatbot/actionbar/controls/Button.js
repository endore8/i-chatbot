import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  constructor (props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
    this.buttonClassName = ""
  }

  render () {
    return (
      <button className={this.buttonClassName} onClick={this._handleClick}>{this.props.title}</button>
    )
  }

  _handleClick (e) {
    e.preventDefault()

    this.props.onAction(this.props.title, this.props.callback)
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func,
  onAction: PropTypes.func.isRequired
}

export default Button
