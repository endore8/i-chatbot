class MessageProcessor {

  constructor (onProcessed) {
    this.onProcessed = onProcessed

    this._timeoutId = null
    this._queue = []

    this._processed = this._processed.bind(this)
  }

  get isProcessing () {
    return this._timeoutId !== null
  }

  process (message) {
    this._queue.push(message)
    this._processNext()
  }

  _processNext () {
    if (this.isProcessing || !this._queue.length) return

    this._timeoutId = setTimeout(this._processed, MessageProcessor.typingSpeed(this._queue[0].message.text))
  }

  _processed () {
    const message = this._queue.shift()

    clearTimeout(this._timeoutId)
    this._timeoutId = null
    this._processNext()
    this.onProcessed(message)
  }

  static typingSpeed (text) {
    if (!text) return 0

    return Math.max(text.length / 10 * 400, 1000) // TODO: optimize range
  }

}

export default MessageProcessor
