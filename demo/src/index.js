import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { render } from 'react-dom'

import ChatBot from '../../src'

class Demo extends Component {

  constructor (props) {
    super(props)

    this._onClick = this._onClick.bind(this)
    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
  }

  _onClick (e) {
    e.preventDefault()

    console.log(this)
    this.chatbot.simulate('Get Started', 'GET-STARTED')
  }

  _onQuickReplyAction (postback) {
    switch (postback) {
      case 'GET-STARTED':
        return [
          ChatBot.textMessage('Hi!'),
          ChatBot.textMessage('How is life?',
            ChatBot.makeReplyButton('Great!', 'INTRO'))
        ]

      case 'INTRO':
        return [
          ChatBot.textMessage('That\'s good to hear!'),
          ChatBot.textMessage('Want to know more about me?',
            ChatBot.makeReplyButton('Sure!', 'ABOUT'),
            ChatBot.makeReplyButton('Nope', 'END'))
        ]

      case 'ABOUT':
        return [
          ChatBot.textMessage('I\'m a chatbot! 🤖',
            ChatBot.makeReplyButton('Hah', 'END'))
        ]

      case 'END':
        return [
          ChatBot.textMessage('Ok, that\'s it for today'),
          ChatBot.textMessage('Come back later! 😉',
            ChatBot.makeReplyButton('Bye', 'BYE'))
        ]
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
            <h1>i-chatbot demo</h1>
            <ChatBot ref={(cb) => {this.chatbot = cb}}
                     onQuickReplyAction={this._onQuickReplyAction}
                     startButton={ChatBot.makeReplyButton('Get Started', 'GET-STARTED')} />
            <button onClick={this._onClick}>Simulate Get Started</button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
