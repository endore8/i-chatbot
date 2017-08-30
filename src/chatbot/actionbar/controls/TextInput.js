import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this._handleKeyPress = this._handleKeyPress.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._updateInputValue = this._updateInputValue.bind(this)
  }

  render () {
    return (
      <div className="TextInput">
        <input className="Input"
               placeholder={this.props.placeholder}
               onChange={this._updateInputValue}
               onSubmit={this._handleSubmit}
               onKeyPress={this._handleKeyPress} />
        <button className="Submit" onClick={this._handleSubmit}>{this.props.submit}</button>
      </div>
    )
  }

  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(this.state.inputValue, this.props.callback)
    }
  }

  _handleSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state.inputValue, this.props.callback)
  }

  _updateInputValue (e) {
    this.setState({
      inputValue: e.target.value
    })
  }
}

TextInput.propTypes = {
  submit: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TextInput
