import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { render } from 'react-dom'

import ChatBot from '../../src'

class Demo extends Component {

  constructor (props) {
    super(props)

    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
  }

  _onQuickReplyAction (postback) {
    if (postback === 'GET-STARTED') {
      return [
        ChatBot.textMessage('Hi!'),
        ChatBot.textMessage('How is life?', ChatBot.makeReplyButton('Awesome!', 'next'))
      ]
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
            <h1>i-chatbot demo</h1>
            <ChatBot onQuickReplyAction={this._onQuickReplyAction}
                     startButton={ChatBot.makeReplyButton('Get Started', 'GET-STARTED')} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
