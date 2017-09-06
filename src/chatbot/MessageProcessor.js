class MessageProcessor {
  constructor (onProcessed, isTypingEnabled = true) {
    this.onProcessed = onProcessed
    this.isTypingEnabled = isTypingEnabled

    this._timeoutId = null
    this._queue = []

    this._processed = this._processed.bind(this)
  }

  get isProcessing () {
    return this._timeoutId !== null
  }

  process (object) {
    if (!object ||
      !(object instanceof Object) ||
      !(object.content instanceof Object) ||
      !(object.content.text instanceof String || typeof object.content.text === 'string'))
      return false

    this._queue.push(object)
    this._processNext()

    return true
  }

  reset () {
    clearTimeout(this._timeoutId)
    this._timeoutId = null
    this._queue = []
  }

  _processNext () {
    if (this.isProcessing || !this._queue.length) return
    if (!this.isTypingEnabled) return this._processed()

    this._timeoutId = setTimeout(this._processed, MessageProcessor.typingSpeed(this._queue[0].content.text))
  }

  _processed () {
    const message = this._queue.shift()

    clearTimeout(this._timeoutId)
    this._timeoutId = null
    this._processNext()
    this.onProcessed(message)
  }

  static get minTypingSpeed () {
    return 400
  }

  static get maxTypingSpeed () {
    return 2000
  }

  static typingSpeed (text) {
    if (!text || !(text instanceof String || typeof text === 'string')) return 0

    return Math.min(
      Math.max(
        text.length * MessageProcessor.minTypingSpeed / 10,
        MessageProcessor.minTypingSpeed
      ),
      MessageProcessor.maxTypingSpeed)
  }
}

export default MessageProcessor
