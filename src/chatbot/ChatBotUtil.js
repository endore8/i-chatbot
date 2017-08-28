class ChatBotUtil {
  static textMessage (text, ...actions) {
    return {
      message: {
        text: text
      },
      actions: actions
    }
  }

  static makeGetStartedButton (text) {
    return {
      title: text,
      type: 'get-started'
    }
  }

  static makeReplyButton (text, callback) {
    return {
      title: text,
      callback: callback,
      type: 'quick-reply'
    }
  }

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
