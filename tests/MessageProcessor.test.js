import expect from 'expect'

import MessageProcessor from 'src/chatbot/MessageProcessor'

describe('MessageProcessor', () => {
  let processor

  beforeEach(() => {
    processor = new MessageProcessor()
  })

  it('Processes a message with delay', (done) => {
    processor.onProcessed = (message) => {
      expect(message).toEqual({message: {text: 'Hi!'}})
      done()
    }
    processor.process({message: {text: 'Hi!'}})
  })

  it('Processes message with empty text', () => {
    processor.onProcessed = () => {}
    processor.process({message: {text: null}})
  })
})
