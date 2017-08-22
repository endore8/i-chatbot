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
      postback: 'GET-STARTED',
      type: 'get-started'
    }
  }

  static makeReplyButton (text, postback) {
    return {
      title: text,
      postback: postback,
      type: 'quick-reply'
    }
  }

  static makeTextInputField (submit, placeholder, postback) {
    return {
      submit: submit,
      placeholder: placeholder,
      postback: postback,
      type: 'text-input'
    }
  }
}

Array.prototype.any = function () {
  return this[Math.floor((Math.random() * this.length))]
}

export default ChatBotUtil
