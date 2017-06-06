import React, { Component } from 'react'
import ChatBot from 'i-chatbot'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.onChatbotPostbackAction = this.onChatbotPostbackAction.bind(this)
  }

  onChatbotPostbackAction () {
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ChatBot onPostbackAction={this.onChatbotPostbackAction} startButtonText='Start' />
      </div>
    )
  }
}

export default App