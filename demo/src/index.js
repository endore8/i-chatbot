import React, { Component } from 'react'
import { render } from 'react-dom'

import ChatBot from '../../src'

class Demo extends Component {
  render () {
    return <div>
      <h1>Hi</h1>
      <ChatBot />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
