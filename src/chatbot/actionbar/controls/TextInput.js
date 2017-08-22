import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  updateInputValue (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state.inputValue, this.props.postback)
  }

  render () {
    return (
      <div className="TextInput">
        <input className="Input"
               placeholder={this.props.placeholder}
               onChange={this.updateInputValue}
               onSubmit={this.handleSubmit} />
        <button className="Submit" onClick={this.handleSubmit}>{this.props.submit}</button>
      </div>
    )
  }
}

TextInput.propTypes = {
  submit: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  postback: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default TextInput
