class ChatBotUtil {
  /**
   * Creates a text message object with `text` and `actions`. Use `ChatBotUtil` methods to create actions.
   *
   * @type Function(text: String, actions: [Objects]) -> Object
   */
  static textMessage (text, ...actions) {
    return {
      type: 'text',
      isInbound: false,
      content: {
        text: text
      },
      actions: actions
    }
  }

  /**
   * Creates a user's text message object with `text`.
   * Used internally in `ChatBot` to add user's reply to a chat.
   *
   * @type Function(text: String) -> Object
   */
  static userTextMessage (text) {
    return {
      type: 'text',
      isInbound: true,
      content: {
        text: text
      }
    }
  }

  /**
   * Creates a get started button with a text (title).
   *
   * @type Function(text: String) -> Object
   */
  static makeGetStartedButton (text) {
    return {
      title: text,
      type: 'get-started'
    }
  }

  /**
   * Creates a reply button with `text` and `callback` that is called when a user pressed the corresponding button.
   *
   * @type Function(text: String, callback: () -> [Object]) -> Object
   */
  static makeReplyButton (text, callback) {
    return {
      title: text,
      callback: callback,
      type: 'quick-reply'
    }
  }

  /**
   * Creates a text input field with `text` (submit button title), `placeholder` and `callback` that is called when user submits a result from a text field.
   *
   * @type Function(submit: String, placeholder: String, callback: () -> [Object]) -> Object
   */
  static makeTextInputField (submit, placeholder, callback) {
    return {
      submit: submit,
      placeholder: placeholder,
      callback: callback,
      type: 'text-input'
    }
  }
}

Array.prototype.any = function () {
  return this[Math.floor((Math.random() * this.length))]
}

export default ChatBotUtil
