import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { render } from 'react-dom'

import ChatBot, { ChatBotUtil } from '../../src'

import './index.css'

class Demo extends Component {

  constructor (props) {
    super(props)

    this._onClick = this._onClick.bind(this)
    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
  }

  _onClick (e) {
    e.preventDefault()

    this.chatbot.simulate('Get Started', 'GET-STARTED')
  }

  _onQuickReplyAction (postback) {
    switch (postback) {
      case 'GET-STARTED':
        return [
          ChatBotUtil.textMessage(['Hi!', 'A'].any()),
          ChatBotUtil.textMessage('How is life?',
            ChatBotUtil.makeReplyButton('Great!', 'INTRO'))
        ]

      case 'INTRO':
        return [
          ChatBotUtil.textMessage('That\'s good to hear!'),
          ChatBotUtil.textMessage('Want to know more about me?',
            ChatBotUtil.makeReplyButton('Sure!', 'ABOUT'),
            ChatBotUtil.makeReplyButton('Nope', 'END'))
        ]

      case 'ABOUT':
        return [
          ChatBotUtil.textMessage('I\'m a chatbot! 🤖',
            ChatBotUtil.makeReplyButton('Hah', 'END'))
        ]

      case 'END':
        return [
          ChatBotUtil.textMessage('Ok, that\'s it for today'),
          ChatBotUtil.textMessage('Come back later! 😉',
            ChatBotUtil.makeReplyButton('Bye', 'BYE'))
        ]
    }
  }

  render () {
    return (
      <Grid className="Demo">
        <Row>
          <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
            <h1>i-chatbot demo</h1>
            <ChatBot ref={(cb) => {this.chatbot = cb}}
                     onQuickReplyAction={this._onQuickReplyAction}
                     startButton={ChatBotUtil.makeReplyButton('Get Started', 'GET-STARTED')} />
            <div className="Actions">
              <button onClick={this._onClick}>Simulate Get Started</button>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
