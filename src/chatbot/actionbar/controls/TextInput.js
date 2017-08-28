import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(this.state.inputValue, this.props.callback)
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state.inputValue, this.props.callback)
  }

  updateInputValue (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  render () {
    return (
      <div className="TextInput">
        <input className="Input"
               placeholder={this.props.placeholder}
               onChange={this.updateInputValue}
               onSubmit={this.handleSubmit}
               onKeyPress={this.handleKeyPress} />
        <button className="Submit" onClick={this.handleSubmit}>{this.props.submit}</button>
      </div>
    )
  }
}

TextInput.propTypes = {
  submit: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TextInput
