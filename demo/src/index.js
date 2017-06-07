import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { render } from 'react-dom'

import ChatBot from '../../src'

class Demo extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
            <h1>Hi</h1>
            <ChatBot />
          </Col>
        </Row>
      </Grid>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
