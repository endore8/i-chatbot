class MessageProcessor {

  constructor (onProcessed) {
    this.onProcessed = onProcessed
  }

  get isProcessing () {
    return false
  }

  process (message) {
    this.onProcessed(message)
  }

}

export default MessageProcessor
