import React, { Component } from 'react'
import { render } from 'react-dom'

import ChatBot, { ChatBotUtil } from '../../src'
import Logic from './Logic'

import './index.css'

class Demo extends Component {
  constructor (props) {
    super(props)

    this._onStartOver = this._onStartOver.bind(this)
  }

  render () {
    return (
      <div className='Demo Container'>
        <div className='Content'>
          <h1>i-chatbot demo</h1>
          <ChatBot ref={(cb) => {this.chatbot = cb}}
                   onGetStarted={Logic.getStarted}
                   getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')} />
          <div className='Extra-Actions'>
            <button onClick={this._onStartOver}>Start Over</button>
          </div>
        </div>
      </div>
    )
  }

  _onStartOver (e) {
    e.preventDefault()

    this.chatbot.startOver()
  }
}

render(<Demo />, document.querySelector('#demo'))
